const router = require('express').Router(); //this sets up express router
let Exercise = require('../models/exercise.model'); //require the model for user->mongoose model

//route -> 1st endpoint that handles get.http requests on /users url path
router.route('/').get((req, res) => { // /users/ ->hits this endpoint 
    Exercise.find() //find() mongoose method -> returns in json, promised based
        .then(excercises=> res.json(excercises))
        .catch(err => res.status(400).json('Error: ' + err));
});

//post request, which adds new users
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    });

    newExercise.save()
        .then(() => res.json('Exercise Added!'))
        .catch(err => res.status(400).json('Error: '+ err));
});

module.exports = router;