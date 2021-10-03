const express = require('express');
const router = express.Router();
const commonTest = require('../../controllers/common/test')

router.get('/test', commonTest.testApi);

module.exports = router;
