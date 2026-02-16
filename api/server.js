const jsonServer = require('json-server');
const fs = require('fs');
const path = require('path');

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

// Load the database from db.json into memory
// This avoids writing to the read-only filesystem on Vercel
const db = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8'));
const router = jsonServer.router(db);

server.use(middlewares);

// Re-route /api/* requests to the router
server.use(jsonServer.rewriter({
    '/api/*': '/$1'
}));

server.use(router);

module.exports = server;
