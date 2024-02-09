const router = require('express').Router();

router.use('/users', require('./userRoutes'));
router.use('blogposts', require('./blogRoutes'));

module.exports = router;