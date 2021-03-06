const express = require('express');
const path = require('path');
const logging = require('morgan');
const bodyParser = require('body-parser');
const blogRouter = require('./api/blogRouter');
const recipeRouter = require('./api/recipeRouter');
const featuredRouter = require('./api/featuredRouter');
const bugRouter = require('./api/bugRouter');
const fs = require('fs');
const db = require('./api/db');
require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express();

getDb()
.then(
  (d) => {
    db.data = d;
  }
)
.catch(
  (err) => console.log(err, err.stack)
)

app.use(logging('dev'));
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, 'build')));
app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
})

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api/blog', blogRouter);

app.use('/api/recipes', recipeRouter);

app.use('/api/featured', featuredRouter);

app.use('/api/bug', bugRouter);

app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.listen(port, ()=> {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
