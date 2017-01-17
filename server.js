'use strict'
const pg = require('pg');
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();
const conString = process.env.DATABASE_URL || 'postgres://localhost:5432';

// define which directory we will serve files from
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));
//
// app.get('/newblog.html', function(request, response){
//   response.sendFile('newblog.html', {root: './public'});
// });
//
// app.get('/', function(request, response){
//   response.sendFile('index.html', {root: './public'});
// });
// NOTE: Routes for requesting HTML resources
app.get('/', (request, response) => response.sendFile('index.html', {root: '.'}));

app.get('/newblog', (request, response) => response.sendFile('newblog.html', {root: '.'}));

app.get('/newproject', (request, response) => response.sendFile('newproject.html', {root: '.'}));

app.get('/admin', (request, response) => response.sendFile('admin.html', {root: '.'}));

app.get('/articles/all', (request, response) => {
  let client = new pg.Client(conString);

// lets route everything to index.html
app.get('*', function(request, response) {
  console.log('New request:', request.url);
  response.sendFile('index.html', {root: './public'});
});

app.listen(PORT, function() {
  console.log('Aye Mane! The server is up and running on port 3000 and can be accessed at localhost:3000 in your browser');
})
