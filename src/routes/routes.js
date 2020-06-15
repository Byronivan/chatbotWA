var express = require('express');
var router = express.Router();
var ciCOntroller =require('../controllers/ciValidController');

router.post('/validCI', ciCOntroller.postValidCi);
router.get('/hello', ciCOntroller.getHello);

module.exports=router;