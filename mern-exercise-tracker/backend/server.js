const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); 

require('dotenv').config();

//this creates express server
const app = express();
const port = process.env.PORT || 5000;


//middle ware
app.use(cors()); 
app.use(express.json()); //allows us to parse json
//

const uri = process.env.ATLAS_URI; //we get this from mongodb, this will connect us to the mongodb db
mongoose.connect(uri,{useNewUrlParser: true, useCreateIndex: true }
);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongDB database connection established sucessfully");
});

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

//this users these files, these are not url routes->so if you go to these pages, it will load everything you see there
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log("SERVER IS RUNNING ON PORT: "+port);
});