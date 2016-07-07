var pg = require('pg');
var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;

app.get('/api/users', function(request, response) {
  var conString = process.env.ELEPHANTSQL_URL || null;
  var client = new pg.Client(conString);

  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    client.query(
      'SELECT * FROM users;',
      function(err, result) {
        if(err) {
          return console.error('error running query', err);
        }
        response.send(result);
        client.end();
    });
  });
  // response.redirect('/');
})

app.get('/api/users/add', function(request, response) {
  var conString = process.env.ELEPHANTSQL_URL || null;
  var client = new pg.Client(conString);

  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    client.query(
      'INSERT INTO users(name, city, email) VALUES($1, $2, $3)',
      [request.query.name, request.query.city, request.query.email],
      function(err, result) {
        if(err) {
          return console.error('error running query', err);
        }
        response.send(result);
      client.end();
    });
  });
  response.redirect('/');
})

app.get('/', function(request, response) {
  var conString = process.env.ELEPHANTSQL_URL || null;
  var client = new pg.Client(conString);

  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    client.query(
      'CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL, city VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL);',
      function(err, result) {
        if(err) {
          return console.error('error running query', err);
        }
      client.end();
    });
  });
  response.sendFile(__dirname + '/public/index.html');
})

app.use(express.static(__dirname + "/public"));

app.listen(PORT, function() {
  console.log('Listening on port: ' + PORT);
})
