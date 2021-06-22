const express = require('express');
const router = express.Router();
const pool = require('../database');
const controller = require('../controllers/');


router.get('/',  controller.index);

router.post('/', controller.in);

router.get('/second', controller.second);


module.exports = router;