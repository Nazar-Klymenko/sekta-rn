const fs = require("fs");
const path = require("path");

function visualizeRoutes(dir, prefix = "") {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let routes = [];

  for (let entry of entries) {
    if (entry.isDirectory()) {
      const nestedPrefix = prefix + "/" + entry.name;
      routes = routes.concat(
        visualizeRoutes(path.join(dir, entry.name), nestedPrefix),
      );
    } else if (
      (entry.isFile() && entry.name.endsWith(".tsx")) ||
      entry.name.endsWith(".ts")
    ) {
      let routeName = entry.name.replace(/\.(tsx|ts)$/, "");
      if (routeName === "index") routeName = "";
      routes.push(prefix + "/" + routeName);
    }
  }

  return routes;
}

const appDir = path.join(__dirname, "app");
const routes = visualizeRoutes(appDir);

console.log("Expo Router Structure:");
routes.forEach((route) => console.log(route));
