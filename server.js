// Load Express
const express = require('express')
// Instantiate express so that we can use its functionality
const app = express();
// design a port to serve our app on
const PORT = process.env.PORT || 3000;

// define which directory we will serve files from
app.use(express.static('./public'));

app.get('/newblog.html', function(request, response){
  response.send('OMG message!');
})

app.get('/index.html', function(request, response){
  response.sendFile('index.html', {root: './public'});
})

// lets route everything to index.html
app.get('*', function(request, response) {
  console.log('New request:', request.url);
  response.sendFile('index.html', {root: './public'});
});

app.listen(PORT, function() {
  console.log('Aye Mane! The server is up and running on port 3000 and can be accessed at localhost:3000 in your browser');
})
