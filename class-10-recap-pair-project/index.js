var pg  = require('pg'); //this will allow us to work with pg the way we work with webDB
var express  = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
 //process.env.PORT = way for me to get access from node on my controller to an environment on a different machine where I can use it

// app.get('/api/users', function (request, response) {
//   client.query(
//     'SELECT * from users;', function (err, result) {
//       if (err) return console.error('error running query', err);
//     }
//     response.send(result);
//     client.end();
//
// response.redirect('/');
// })



 app.get('/api/users/add', function(request, response) {
    var conString = process.env.ELEPHANTSQL_URL || NULL
    var client = new pg.Client(conString);

 client.connect(function(err) {
   if(err) {
     return console.error('could not connect to postgress', err);
   }
   client.query(
     'INSERT INTO users(name, city, email) VALUES($1, $2, $3)',
     [request.query.name, request.query.city, request.query.email],
     function(err, result) {
       if(err) {
         return console.error('error running query', err);
       }
       client.end();
     })
   })
   response.redirect('/');
});

 app.get('/', function(request, response) {
   var conString = process.env.ELEPHANTSQL_URL || NULL;
   var client = new pg.Client(conString);

   client.connect(function(err) {
     if(err) {
       return console.error('could not connect to postgress', err);
     }
     client.query(
       'CREATE TABLE IF NOT EXISTS users( id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL);',
       function(err, result) {
         if(err) {
           return console.error('error running query', err);
         }
         client.end();
       })

     })
     response.sendFile(__dirname + '/public/index.html');
 })

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/public/index.html');
})

app.use(express.static(__dirname + "/public"));

app.listen (PORT, function() {
  console.log('Listening on port: ' + PORT);
})
