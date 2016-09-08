const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = 1337;

app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log('server is up');
});