var express = require('express');
var router = express.Router();
var ciCOntroller =require('../controllers/ciValidController');

router.post('/validCI', ciCOntroller.postValidCi);

module.exports=router;