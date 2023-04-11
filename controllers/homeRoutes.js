
const router = require('express').Router();
const fetch = require('node-fetch');
const withAuth = require('../utils/auth');
const { User } = require('../models');


router.get('/', async (req, res) => {
    try {
    const userData = await User.findAll({
        include: [
            {
                model: User,
                username: ['username'],
                bookProgress: []
            },
        ],
    });
    //this see if the user is already reading a book 
    if(bookProgress = true) {
        
        const users = userData.map((user) => user.get({ plain: true }));
        res.render('book', { 
            logged_in: req.session.logged_in 
        });
    } else {
            //this see if the user has no book on file so they can choose a new one
        const users = userData.map((user) => user.get({ plain: true }));
        res.render('choose', { 
            logged_in: req.session.logged_in 
        });
    }
} catch (err) {
    res.render('login', { 
        logged_in: req.session.logged_in 
    });
    }
})



module.exports = router;