const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
} = require("customize-cra");
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, ".", dir);
}
module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { "@primary-color": "#1890ff" },
  }),
  addWebpackAlias({
    "@": path.resolve(__dirname, "./src"),
    react: path.resolve("./node_modules/react"),
  })
);
