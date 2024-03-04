export const debounce = (func: (...args: unknown[]) => void, delay = 300) => {
    let timeoutId: ReturnType<typeof setTimeout>;

    return function (this: unknown, ...args: unknown[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
};
