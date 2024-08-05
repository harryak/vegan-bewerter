export const presets = [
    [
        "@babel/preset-env",
        {
            targets: {
                node: "current",
            },
        },
    ],
];
export const env = {
    development: {
        plugins: ["dynamic-import-node"],
    },
};
