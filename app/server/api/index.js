var express = require('express');

const router = express.Router(); 

var code	= require('./resources/code');

router.use('/code', code); 

module.exports = router;