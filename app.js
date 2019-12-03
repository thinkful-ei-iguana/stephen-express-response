const express = require('express');
const morgan = require('morgan');

const playstore = require('./playstore');

const app = express();

app.use(morgan('dev'));

app.get('/apps', (req, res) => {

});

app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});