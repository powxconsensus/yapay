module.exports = function(api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "@babel/plugin-transform-flow-strip-types",
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-transform-runtime",
      "@babel/plugin-transform-private-methods", // Add this line
    ],
  };
};
