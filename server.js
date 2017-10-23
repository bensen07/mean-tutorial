const express = require('express');
const bodyparser = require('body-parser');
const http = require('http');
const path = require('path');
const app = express();

// Api for Mongo DB
const api = require('./server/routes/api');

// parsers
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: false
}));

// Dist Folder setup
app.use(express.static(path.join(__dirname, 'dist')));

//Mongo DB Api location
app.use('/api', api);

// Send all requests to Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Set port
const port = process.env.PORT || '3000';
app.set('port', port);

//server
const server = http.createServer(app);
server.listen(port, () => console.log('Running on localhost:${port}'));
