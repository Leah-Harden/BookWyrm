const router = require('express').Router();

const homeRoutes = require('./homeRoutes.js');
const apiUserRoutes = require('./apiUserRoutes.js')
//do not change!!! this still works!!!!!
const apiRoutes = require('./apis/apiRoutes.js');


router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/user', apiUserRoutes);


module.exports = router;
