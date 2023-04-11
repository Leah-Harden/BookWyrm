
const router = require('express').Router();
const fetch = require('node-fetch');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
    try {
    const userData = await Project.findAll({
        include: [
            {
                model: User,
                username: ['username'],
            },
        ],
    });
    res.render('book', { 
        projects, 
        logged_in: req.session.logged_in 
    });
} catch (err) {
    res.render('login', { 
        projects, 
        logged_in: req.session.logged_in 
    });
    }
})


module.exports = router;