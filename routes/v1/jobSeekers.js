const express = require('express');
const router = express.Router();
const jobSeekers = require('../../controllers/jobSeekers/test')

router.get('/test', jobSeekers.testApi);

module.exports = router;
