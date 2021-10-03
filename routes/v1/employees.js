const express = require('express');
const router = express.Router();
const commonTest = require('../../controllers/employees/test')

router.get('/test', employees.testApi);

module.exports = router;
