const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  let filePath = '.' + req.url;

  // Map URLs to corresponding file paths
  const pages = {
    '/': '/index.html',
    '/about': '/about.html',
    '/contact-me': '/contact-me.html',
  };

  // Check if the requested URL is in the pages object
  filePath = pages[req.url] ? `.${pages[req.url]}` : `.${req.url}`;

  // Determine the content type based on the file extension
  const extname = path.extname(filePath);
  let contentType = 'text/html';

  switch (extname) {
    case '.html':
      contentType = 'text/html';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    // Add more cases for other file types as needed (e.g., JavaScript, images)
    default:
      contentType = 'text/plain';
  }

  // Read the requested file or serve the 404 page
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('404 Not Found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});