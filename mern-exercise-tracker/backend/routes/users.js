const router = require('express').Router(); //this sets up express router
let User = require('../models/user.model'); //require the model for user->mongoose model

//route -> 1st endpoint that handles get.http requests on /users url path
router.route('/').get((req, res) => { // /users/ ->hits this endpoint 
    User.find() //find() mongoose method -> returns in json, promised based
        .then(users=> res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

//post request, which adds new users
router.route('/add').post((req, res) => {
    const username = req.body.username;

    const newUser = new User ({username});

    newUser.save()
        .then(() => res.json('User Added!'))
        .catch(err => res.status(400).json('Error: '+ err));
});

module.exports = router;