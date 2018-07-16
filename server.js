const express = require('express');
const db = require('./api/db');
const path = require('path');
const logging = require('morgan');
const bodyParser = require('body-parser');
const blogRouter = require('./api/blogRouter');
const recipeRouter = require('./api/recipeRouter')

const port = process.env.PORT || 5000;

const app = express();

app.use(logging('dev'));
app.use(bodyParser.json());

/*
app.use(express.static(path.resolve(__dirname, 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
})
*/

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api/blog', blogRouter);

app.use('/api/recipes', recipeRouter);

app.listen(port, ()=> {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
