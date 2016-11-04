var express = require('express');
var router = express.Router();

var searchController = require('../controllers/search.js');

router.route('/')
  .post(searchController.nearby);

module.exports = router;
