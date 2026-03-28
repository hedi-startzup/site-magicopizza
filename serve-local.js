const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const PORT = Number(process.env.PORT) || 3333;
const root = process.cwd();
const types = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".ico": "image/x-icon",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

const server = http.createServer((req, res) => {
  let pathname = url.parse(req.url).pathname;
  if (pathname === "/") pathname = "/index.html";

  const candidate = path.join(root, path.normalize(decodeURIComponent(pathname)));
  if (!candidate.startsWith(root)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(candidate, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    const ext = path.extname(candidate);
    res.setHeader("Content-Type", types[ext] || "application/octet-stream");
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Site: http://127.0.0.1:${PORT}/`);
});
