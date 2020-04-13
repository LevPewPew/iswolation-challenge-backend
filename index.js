const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 5009;
const DB_URL = process.env.DB_URL;
const dbConfig = { useNewUrlParser: true, useUnifiedTopology: true };
const whitelist = ['http://localhost:3000', 'https://FRONT-END-URL-PLACEHOLDER']; // REPLACE
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

mongoose.connect(DB_URL, dbConfig, (err) => {
  if(err) {
    console.log("MongooseDB Connection Error");
  } else {
    console.log("Connected to MongooseDB");
  }
});

app.use(morgan('dev'));
app.use(express.json());
app.use(cors(corsOptions));
app.use(require('./routes/index'));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
