const express = require('express');
const bodyparser = require('body-parser');
const mongodb = require('./data/database.js');
/* const e = require('express'); */
const app = express();

const port = process.env.PORT || 3000;

app.use(bodyparser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Header',
    'Origin, X-Requested-With, Content-Type, Accept, Z-key'
    );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

/* app.use(express.json()); */

app.use('/', require('./routes'));


mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  }
  else {
    app.listen(port, () => {console.log(`Databse is listening and node Running on port ${port}`);});
    }
});
