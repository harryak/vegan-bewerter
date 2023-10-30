<template>
  <div id="interactive" class="viewport scanner">
    <video />
    <canvas class="drawingBuffer" />
  </div>
</template>

<script lang="ts" setup>
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import adapter from "webrtc-adapter";
import Quagga, { QuaggaJSResultObject } from "@ericblade/quagga2";
import { onMounted } from "vue";

const emit = defineEmits(["codeDetected"]);

const onProcessed = (result: QuaggaJSResultObject) => {
  if (result && !(result instanceof Array)) {
    const drawingCtx = Quagga.canvas.ctx.overlay;
    const drawingCanvas = Quagga.canvas.dom.overlay;

    drawingCtx.clearRect(
      0,
      0,
      parseInt(drawingCanvas.getAttribute("width") ?? "0"),
      parseInt(drawingCanvas.getAttribute("height") ?? "0")
    );

    if (result.codeResult && result.codeResult.code) {
      Quagga.ImageDebug.drawPath(result.line, { x: "x", y: "y" }, drawingCtx, {
        color: "#348c1e",
        lineWidth: 8,
      });
    }
  }
};

const onDetected = (result: QuaggaJSResultObject) => {
  if (result.codeResult && result.codeResult.code) {
    emit("codeDetected", result.codeResult.code);
  }

  // Quagga.offProcessed(onProcessed);
  // Quagga.offDetected(onDetected);

  // Quagga.stop();
};

onMounted(() => {
  const streamElementBounds = document
    .getElementById("interactive")
    ?.getBoundingClientRect();

  Quagga.init(
    {
      inputStream: {
        type: "LiveStream",
        constraints: {
          height: streamElementBounds?.height ?? 480,
          width: streamElementBounds?.width ?? 480,
        },
      },
      locator: {
        patchSize: "medium",
        halfSample: true,
      },
      numOfWorkers: 2,
      frequency: 10,
      decoder: {
        readers: ["ean_reader"],
      },
      locate: true,
    },
    (error) => {
      if (error) {
        console.log("Scanner error:", error);
      } else {
        Quagga.start();
      }
    }
  );
  Quagga.onProcessed(onProcessed);
  Quagga.onDetected(onDetected);
});
</script>

<style lang="scss" scoped>
#interactive {
  background-color: darkslategray;

  position: fixed;
  top: 0;
  left: 0;

  height: 100vh;
  width: 100vw;

  &.viewport > canvas,
  &.viewport > video {
    margin-top: -25%;

    position: absolute;
    top: 50%;
    left: 1rem;

    width: calc(100% - 2rem);
  }
}
</style>
