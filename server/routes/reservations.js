var express = require('express');
var router = express.Router();
var reservationsController = require('../controllers/reservations.js');
var messagesController = require('../controllers/messages.js');

router.route('/')
  .get(reservationsController.index)
  .post(reservationsController.create);

router.route('/:id/messages')
  .get(messagesController.index)
  .post(messagesController.create);

router.route('/:id')
  .get(reservationsController.show)
  .post(reservationsController.update)
  .delete(reservationsController.delete);

module.exports = router;
