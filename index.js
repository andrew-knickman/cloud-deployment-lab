// Here we specify external JavaScript modules that we want to be loaded
const express = require('express');
const axios = require('axios');
const logger = require('morgan');

/*
  Create a new express app. This handles just about all the boilerplate for
  setting up a server to be able to listen for and respond to requests over HTTP.
*/
const app = express();

// Sets up the logger module that we pulled in to run as middleware in our app
app.use(logger('dev'));

/*
  Sets the applicationn port equal to the value of the PORT environment variable,
  or to 5000 if that variable is not specified.

  For example, we could start the app on port 6000 by running `PORT=6000 npm start`
*/
app.set('port', (process.env.PORT || 5000/greeting));

app.get('/', (request, response) => {
  response.send('Hello world!')
});

app.get('/greeting', (request, response) => {
  // FIXME: If a name is not given, the app says 'Hello undefined'
  const nm = request.query.name;
  if(nm != null)
  {
    const message = `Hello ${request.query.name}`;
  }
  else
  {
    const message = `Hello`;
  }
  response.status(200).send(message);
});

app.get('/todo', async (request, response), number => {
  try {
    const todo = await axios.get('https://jsonplaceholder.typicode.com/todos/' + number)
      .then(res => res.data);
    response.json(todo);
  } catch (e) {
    console.log(e);
  }
});

app.listen(app.get('port'), () => {
  console.log("Node app is running at localhost:" + app.get('port'));
});
