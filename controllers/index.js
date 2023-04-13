const router = require('express').Router();

const homeRoutes = require('./homeRoutes.js');
//do not change!!! this still works!!!!!
const apiRoutes = require('./apis/apiRoutes.js');


router.use('/', homeRoutes);
router.use('/api', apiRoutes);


module.exports = router;
