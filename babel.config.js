module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
  ],
  env: {
    development: {
      plugins: ["dynamic-import-node"],
    },
  },
};
