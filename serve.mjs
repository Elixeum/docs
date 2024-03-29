// NOTE(martin.pernica): Simple web server to server static docs for development, in production use Docker and Nginx!
// By-design this web server does not use any external packages so it can be run as-is without installing any dependencies.
// Yet it is very dumb and insecure, so use it wisely!

import http from "node:http";
import fs from "node:fs";
import path, { dirname } from "node:path";
import crypto from "node:crypto";
import process from "node:process";

const __dirname = dirname(new URL(import.meta.url).pathname);

const args = process.argv.slice(2);
const nodeMajorVersion = process.version.match(/^v(\d+)/)[1]; // Omit minor, patch version from version string

// At least `crypto` package requires Node 15+
if (nodeMajorVersion < 15) {
  console.error("This server requires Node.js v15 or higher. Please upgrade your Node.js installation.");
  process.exit(1);
}

// Map file extension to content type
function extensionToContentType(extension) {
  switch (extension) {
    case ".html":
      return "text/html";
    case ".css":
      return "text/css";
    case ".js":
      return "text/javascript";
    case ".json":
      return "application/json";
    case ".png":
      return "image/png";
    case ".jpg":
      return "image/jpg";
    case ".gif":
      return "image/gif";
    case ".svg":
      return "image/svg+xml";
    case ".md":
      return "text/markdown";
    default:
      return "text/plain";
  }
}

let httpProtocol = "http";
let httpPort = 8080;
let httpHostname = "localhost";
let isVerbose = false;
let serveRoot = __dirname + path.sep + "docs";

// Map for file aliases, especially to support empty request to map it to index.html
const aliases = {
  "/": "/index.html",
};

// List of possible insecure paths, which are not allowed to be accessed
const insecurePaths = [".."];

// Trivial argument parsing
// --port <port>
// --verbose
// --hostname <hostname>
for (let i = 0; i < args.length; i++) {
  switch (args[i]) {
    case "--port":
      httpPort = parseInt(args[i + 1]);
      break;
    case "--verbose":
      isVerbose = true;
      break;
    case "--hostname":
      httpHostname = args[i + 1];
      break;
  }
}

// Startup info
const title = "Elixeum Simple Web Server";
console.log(title + "\n" + "=".repeat(title.length));

console.log(`Starting server on port ${httpPort}`);
console.log(`Serving from ${serveRoot}`);
console.log(`Verbose mode: ${isVerbose}`);
console.log(`Open web browser at ${httpProtocol}://${httpHostname}:${httpPort}`);

// Very basic - **insecure** - http server to serve static files
http
  .createServer((req, res) => {
    let file = serveRoot + req.url;
    let requestId = crypto.randomBytes(3 * 4).toString("base64"); // ID for logging to distinguish requests from each other
    let timeNow = new Date();

    let timeMarker = `[${timeNow.getHours()}:${timeNow.getMinutes()}:${timeNow.getSeconds()}]`;
    let requestMarker = `[${requestId}]`;
    let outputMarker = `${timeMarker} ${requestMarker}`;

    if (isVerbose) {
      console.log(`${outputMarker} HTTP ${req.method} ${req.url}`);
    }

    if (aliases[req.url]) {
      if (isVerbose) {
        console.log(`${outputMarker} Request matches aliased path ${req.url} => ${aliases[req.url]}`);
      }

      file = serveRoot + aliases[req.url];
    }

    for (const insecurePath of insecurePaths) {
      if (file.indexOf(insecurePath) !== -1) {
        console.warn(`${outputMarker} Request matches insecure path!`);

        res.writeHead(403, { "Content-Type": "text/plain" });
        res.end("403 Forbidden");
        return;
      }
    }

    fs.readFile(file, (err, data) => {
      if (isVerbose) {
        console.log(`${outputMarker} IO read to ${file}`);
      }

      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");

        return;
      }

      res.writeHead(200, { "Content-Type": extensionToContentType(path.extname(file)) });
      res.end(data);
    });
  })
  .listen(httpPort);
