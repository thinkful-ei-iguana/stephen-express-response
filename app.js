/* eslint-disable quotes */
const express = require('express');
const morgan = require('morgan');

const apps = require('./playstore');

const app = express();

app.use(morgan('dev'));

app.get('/apps', (req, res) => {
  const {sort, genres} = req.query;

  let results = apps;

  const validSortValues = ['rating', 'app'];

  if (sort) {
    if (!validSortValues.includes(sort)) {
      return res
        .status(400)
        .json({
          message: "Sort must be one of rating or app"
        });
    }
    results.sort((a, b) => {
      a[sort] < b[sort] ? -1 : 1; 
    });
  }

  const validGenres = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'];

  if (genres) {
    if (!validGenres.includes(genres)) {
      return res
        .status(400)
        .json({
          message: "Genre must be one of action, strategy, puzzle, casual, arcade, or card"
        });
    }

    results = results.filter(result => {
      result.genre.toLowerCase().includes(genres.toLowerCase());
    });
  }
  

  res.json(results);
});

app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});