module.exports = api => {
  api.cache(true);
  return {
    presets: [
      [
        "@babel/preset-env",
        {
          useBuiltIns: "entry"
        }
      ],
      "@babel/preset-react"
    ],
    plugins: [
      "@babel/plugin-transform-runtime",
      "@babel/plugin-syntax-dynamic-import",
      "@babel/plugin-syntax-import-meta",
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-proposal-optional-chaining"
    ]
  };
};
