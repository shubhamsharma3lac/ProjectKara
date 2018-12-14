const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('./models/config');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');

var app = express();

mongoose.connect("mongodb+srv://shubhams:echoecho_12@cluster0-p6esy.mongodb.net/kara?retryWrites=true/", { useNewUrlParser: true });

if (app.get('env') === 'development') { var dev = true; }

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

if (dev) { app.use(logger('dev')) };


// ********************************************
// Routes
// ********************************************
app.use(userRouter);

// handle 404
app.use(function(req, res, next){
    res.status(404).send('Not Found');
    next();
})

// handle errors
app.use(function(err, req, res, next){
    console.log(err);
    res.status(err.status || 500).send(err.message);
    next();
})

app.listen(config.port, () => console.log(`server listening on ${config.port}`));