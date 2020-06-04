const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 5009;
const DB_URL = process.env.DB_URL;
const dbConfig = { useNewUrlParser: true, useUnifiedTopology: true };
const whiteList = ['https://iswolationchallenge.netlify.app'];

mongoose.connect(DB_URL, dbConfig, (err) => {
  if(err) {
    console.log("MongooseDB Connection Error");
  } else {
    console.log("Connected to MongooseDB");
  }
});

app.use(morgan('dev'));
app.use(express.json());
app.use(cors({
  origin: function(origin, callback) {
    if (whiteList.indexOf(origin) === -1) {
      let msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
app.use(require('./routes/index'));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
