
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
            },
        ],
    });
    const users = userData.map((user) => user.get({ plain: true }));
    res.render('book', { 
        logged_in: req.session.logged_in 
    });
} catch (err) {
    res.render('login', { 
        logged_in: req.session.logged_in 
    });
    }
})







module.exports = router;