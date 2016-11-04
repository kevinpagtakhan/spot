var express = require('express');
var router = express.Router();
var accountController = require('../controllers/accounts.js');

router.route('/')
  .post(accountController.register);

router.route('/authenticate')
  .post(accountController.authenticate);

module.exports = router;
