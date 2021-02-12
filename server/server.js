const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Setup body parser - to translating request body into JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('server/public'));

// start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log('up and running on port', PORT);
});
