const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');

// usage for file upload
const routefile = require('./routes/fileServer.js');

//config dot env
require('dotenv').config();

//initialise the express app
const app = express();

//Enable All CORS Requests
app.use(cors());

//MONGOOSE DB CONFIG
const uri = process.env.UPLOAD_URI;

// connect to mongo using mongoose
mongoose
  .connect(uri, {useNewUrlParser: true})
  .then(() => console.log('MongoDB is connected via mongoose...'))
  .catch((err) => console.log(err));

// Body-parser middleware usage for req.body
app.use(express.json({limit: '50mb'}));

//Express session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 60 * 60 * 1000},
  }),
);

// <-- usage for file upload /download --> //
app.use('/files', routefile);

app.get('/', (req, res) => {
  res.send('Welcome');
});

const PORT = process.env.PORT || 1337;

app.listen(PORT, () => {
  console.log(`Server stared on port ${PORT}`);
});
