
const router = require('express').Router();
const fetch = require('node-fetch');
const withAuth = require('../utils/auth');
const { User } = require('../models');

//Should eventually include withAuth here so that it automatically reroutes to login page if not logged in.
router.get('/', withAuth, async (req, res) => {
    try {
        // so that user does not exist to will go to the catch
        const userData = await User.findByPk(req.session.user_id);
        const user = userData.get({plain: true});
        console.log(user);
        //this see if the user is already reading a book 
        if (user.bookProgress === true) {

            res.render('book', {
                logged_in: req.session.logged_in
            });
        } else {
            //this see if the user has no book on file so they can choose a new one
            res.render('choose', {
                logged_in: req.session.logged_in
            });
        }
    } catch (err) {
        console.log(err);
        res.render('login', {
            logged_in: req.session.logged_in
        });
    }
});

// add withAuth to these three before the end!

router.get('/account',  async (req, res) => {
    res.render('accountpage', {
        logged_in: req.session.logged_in
    });
});

router.get('/book',async (req, res) => {
    res.render('choose', {
        logged_in: req.session.logged_in
    });
});


router.get('/choose', async (req, res) => {
    res.render('choose', {
        logged_in: req.session.logged_in
    });
});

router.get('/login', async (req, res) => {
    if(req.session.logged_in){
        res.redirect('/account');
    }
    res.render('login', {
        logged_in: req.session.logged_in
    });
});


router.post('/', async (req, res) => {
    const userData = await User.findByPk(req.session.user_id);

});




module.exports = router;