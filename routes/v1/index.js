const express = require('express');
const router = express.Router();
const common = require('./common')
const admin = require('./admin')
const jobSeekers = require('./jobSeekers')
const employers = require('./employers')


router.use('/', common);
router.use('/admin', admin);
router.use('/employers', employers);
router.use('/jobSeekers', jobSeekers);


module.exports = router;
