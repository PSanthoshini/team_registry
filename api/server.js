const jsonServer = require('json-server');
const path = require('path');
const fs = require('fs');
const server = jsonServer.create();

// Load the database from the file into memory to avoid crashes on Vercel's read-only filesystem
const db = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf-8'));
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

server.use(middlewares);
// Re-route /api/* requests to the router
server.use(jsonServer.rewriter({
    '/api/*': '/$1'
}));
server.use(router);

module.exports = server;
