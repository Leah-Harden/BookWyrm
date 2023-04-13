
const router = require('express').Router();
const fetch = require('node-fetch');
const withAuth = require('../utils/auth');
const { User } = require('../models');

//Should eventually include withAuth here so that it automatically reroutes to login page if not logged in.
router.get('/', async (req, res) => {
    try {
        // so that user does not exist to will go to the catch
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
        if (bookProgress = true) {

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
});



router.get('/account', async (req, res) => {
    res.render('accountpage', {
        logged_in: req.session.logged_in
    });
});

router.get('/book', async (req, res) => {
    res.render('choose', {
        logged_in: req.session.logged_in
    });
});


router.get('/choose', async (req, res) => {
    res.render('choose', {
        logged_in: req.session.logged_in
    });
});

router.get('/signup', async (req, res) => {
    res.render('signup', {
        logged_in: req.session.logged_in
    });
});


module.exports = router;