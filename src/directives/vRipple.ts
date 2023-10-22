import { DirectiveBinding, ObjectDirective } from "vue";

export const vRipple: ObjectDirective = {
  beforeMount: (
    targetElement: HTMLElement,
    binding: DirectiveBinding<string | Record<string, string | number>>
  ) => {
    // Default values.
    const props = {
      transition: 500,
      backgroundColor: "var(--color-shadow)",
      zIndex: "100",
    };

    const bindingArguments = binding.value;
    if (typeof bindingArguments === "object") {
      for (const [propKey, propValue] of Object.entries(bindingArguments)) {
        if (propKey in props) {
          props[propKey] =
            typeof props[propKey] === "number" && typeof propValue !== "number"
              ? parseInt(propValue)
              : propValue;
        }
      }
    } else if (bindingArguments) {
      props.backgroundColor = bindingArguments;
    }

    targetElement.addEventListener("mousedown", (event: MouseEvent) => {
      clickRippler(event, targetElement);
    });

    const clickRippler = (event: MouseEvent, targetElement: HTMLElement) => {
      const target = targetElement;
      // Get border to avoid offsetting on ripple container position
      const targetBorder = parseInt(
        getComputedStyle(target).borderWidth.replace("px", "")
      );

      // Get necessary constiables
      const boundingRectangle = target.getBoundingClientRect(),
        left = boundingRectangle.left,
        top = boundingRectangle.top,
        width = target.offsetWidth,
        height = target.offsetHeight,
        mouseOffsetX = event.clientX - left,
        mouseOffsetY = event.clientY - top,
        maxRippleWidth = Math.max(mouseOffsetX, width - mouseOffsetX),
        maxRippleHeight = Math.max(mouseOffsetY, height - mouseOffsetY),
        rippleRadius = Math.sqrt(
          maxRippleWidth * maxRippleWidth + maxRippleHeight * maxRippleHeight
        ),
        style = window.getComputedStyle(target),
        border = targetBorder > 0 ? targetBorder : 0;

      // Create the ripple and its container
      const ripple = document.createElement("div"),
        rippleContainer = document.createElement("div");
      rippleContainer.className = "ripple-container";
      ripple.className = "ripple";

      //Styles for ripple
      ripple.style.marginTop = "0px";
      ripple.style.marginLeft = "0px";
      ripple.style.width = "1px";
      ripple.style.height = "1px";
      ripple.style.transition =
        "all " + props.transition + "ms cubic-bezier(0.4, 0, 0.2, 1)";
      ripple.style.borderRadius = "50%";
      ripple.style.pointerEvents = "none";
      ripple.style.position = "relative";
      ripple.style.zIndex = props.zIndex;
      ripple.style.backgroundColor = props.backgroundColor;

      //Styles for rippleContainer
      rippleContainer.style.position = "absolute";
      rippleContainer.style.left = 0 - border + "px";
      rippleContainer.style.top = 0 - border + "px";
      rippleContainer.style.height = "0";
      rippleContainer.style.width = "0";
      rippleContainer.style.pointerEvents = "none";
      rippleContainer.style.overflow = "hidden";

      // Store target position to change it after
      const storedTargetPosition =
        target.style.position.length > 0
          ? target.style.position
          : getComputedStyle(target).position;
      // Change target position to relative to guarantee ripples correct positioning
      if (storedTargetPosition === "static") {
        target.style.position = "relative";
      }

      rippleContainer.appendChild(ripple);
      target.appendChild(rippleContainer);

      ripple.style.marginLeft = mouseOffsetX + "px";
      ripple.style.marginTop = mouseOffsetY + "px";

      // No need to set positioning because ripple should be child of target and to it's relative position.
      // rippleContainer.style.left    = left + (((window.pageXOffset || document.scrollLeft) - (document.clientLeft || 0)) || 0) + "px";
      // rippleContainer.style.top     = top + (((window.pageYOffset || document.scrollTop) - (document.clientTop || 0)) || 0) + "px";
      rippleContainer.style.width = width + "px";
      rippleContainer.style.height = height + "px";
      rippleContainer.style.borderTopLeftRadius = style.borderTopLeftRadius;
      rippleContainer.style.borderTopRightRadius = style.borderTopRightRadius;
      rippleContainer.style.borderBottomLeftRadius =
        style.borderBottomLeftRadius;
      rippleContainer.style.borderBottomRightRadius =
        style.borderBottomRightRadius;

      rippleContainer.style.direction = "ltr";

      setTimeout(() => {
        ripple.style.width = rippleRadius * 2 + "px";
        ripple.style.height = rippleRadius * 2 + "px";
        ripple.style.marginLeft = mouseOffsetX - rippleRadius + "px";
        ripple.style.marginTop = mouseOffsetY - rippleRadius + "px";
      }, 0);

      const clearRipple = () => {
        setTimeout(() => {
          ripple.style.backgroundColor = "rgba(0, 0, 0, 0)";
        }, 250);

        // Timeout set to get a smooth removal of the ripple
        setTimeout(() => {
          rippleContainer.parentNode?.removeChild(rippleContainer);
        }, 850);

        targetElement.removeEventListener("mouseup", clearRipple, false);
        targetElement.removeEventListener("mouseleave", clearRipple, false);

        // After removing event set position to target to it's original one
        // Timeout it's needed to avoid jerky effect of ripple jumping out parent target
        setTimeout(() => {
          let clearPosition = true;
          for (let i = 0; i < target.children.length; i++) {
            if (target.children[i].className === "ripple-container") {
              clearPosition = false;
            }
          }

          if (clearPosition) {
            if (storedTargetPosition !== "static") {
              target.style.position = storedTargetPosition;
            } else {
              target.style.position = "";
            }
          }
        }, props.transition + 250);
      };

      if (event.type === "mousedown") {
        targetElement.addEventListener("mouseup", clearRipple, false);
        targetElement.addEventListener("mouseleave", clearRipple, false);
      } else {
        clearRipple();
      }
    };
  },
};
