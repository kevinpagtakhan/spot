var express = require('express');
var router = express.Router();
var usersController = require('../controllers/users.js');

router.route('/')
  .get(usersController.loggedInUser)

router.route('/all')
  .get(usersController.index)

router.route('/:id')
  .get(usersController.show)
  .post(usersController.update)
  .delete(usersController.delete);

module.exports = router;
