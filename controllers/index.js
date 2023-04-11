const router = require('express').Router();

const homeRoutes = require('./homeRoutes.js');
//do not change!!! this still works!!!!!
const apiHomeRoutes = require('./apiHomeRoutes.js');


router.use('/', homeRoutes);
router.use('/api', apiHomeRoutes);


module.exports = router;
