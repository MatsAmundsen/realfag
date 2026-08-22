const { JSDOM } = require("jsdom");
const fs = require("fs");

const html = fs.readFileSync("Indeks.html", "utf-8");
const dom = new JSDOM(html, { runScripts: "dangerously", resources: "usable", url: "http://localhost/" });

dom.window.onerror = function(message, source, lineno, colno, error) {
    console.error("PAGE ERROR:", message, "at line", lineno, error);
};

const dataScript = fs.readFileSync("data.js", "utf-8");
dom.window.eval(dataScript);

const appScript = fs.readFileSync("app.js", "utf-8");
dom.window.eval(appScript);

setTimeout(() => {
    console.log("DOM fully loaded");
}, 1000);
