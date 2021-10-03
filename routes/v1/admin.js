const express = require('express');
const router = express.Router();
const adminTest = require('../../controllers/admin/test')

router.get('/test', adminTest.testApi);

module.exports = router;
