const next = require('next');
const cors = require('cors');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  // Create a custom server
  const express = require('express');
  const server = express();

  // Apply CORS middleware
  server.use(cors());

  // Handle all Next.js requests
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // Start the server
  server.listen(process.env.PORT || 300, (err) => {
    if (err) throw err;
    console.log('Server started on http://localhost:3000');
  });
});
