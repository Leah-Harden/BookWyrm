const router = require('express').Router();

const homeRoutes = require('./homeRoutes.js');
const apiUserRoutes = require('./apiUserRoutes.js')
//do not change!!! this still works!!!!!
const apiHomeRoutes = require('./apiHomeRoutes.js');


router.use('/', homeRoutes);
router.use('/api', apiHomeRoutes);
router.use('/user', apiUserRoutes);


module.exports = router;
