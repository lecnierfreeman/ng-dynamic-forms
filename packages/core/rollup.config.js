const path  = require("path"),
      utils = require(path.join(__dirname, "../../build/utils")),
      pkg   = require(path.join(__dirname, "package.json"));

const format  = utils.getRollupFormat(process.argv),
      minify  = utils.hasMinifyFlag(process.argv),
      globals = {
          "@angular/core": "ng.core",
          "@angular/forms": "ng.forms",
          "rxjs/Observable": "Rx.Observable",
          "rxjs/Subject": "Rx.Subject",
          "rxjs/Subscription": "Rx.Subscription",
          "rxjs/add/observable/of": "rxjs/add/observable/of",
          "rxjs/add/operator/map": "rxjs/add/operator/map"
      };

export default {
    input: "./dist/@ng-dynamic-forms/core/public_api.js",
    output: {
        file: `./dist/@ng-dynamic-forms/core/bundles/core.${format}.${minify ? "min." : ""}js`,
        format: format
    },
    banner: utils.getBanner(pkg),
    context: "this",
    exports: "named",
    external: Object.keys(globals),
    globals: globals,
    name: "ngDF.core",
    plugins: utils.getRollupPlugins(minify),
    sourcemap: true
};