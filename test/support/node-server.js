var express = require("express");
var path = require("path");
var app = express();

app.listen(3000);
console.log(__dirname);
app.use("/", express.static(__dirname));
app.use("/", express.static(path.join(process.env.HOME, "node_modules/expect")));
app.use("/", express.static(path.join(process.env.HOME, "node_modules/mocha")));
app.use("/", express.static(path.join(__dirname, "../..")));

console.log("browser-test url: http://localhost:3000/browser-test.html");
