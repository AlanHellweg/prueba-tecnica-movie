const { override, addWebpackAlias } = require("customize-cra");
const path = require("path");

module.exports = override(
  addWebpackAlias({
    "@public": path.resolve(__dirname, "src/public"),
  })
);
