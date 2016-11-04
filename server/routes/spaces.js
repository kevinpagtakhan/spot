var express = require('express');
var router = express.Router();
var spacesController = require('../controllers/spaces.js');
var reviewsController = require('../controllers/reviews.js');

router.route('/')
  .get(spacesController.index)
  .post(spacesController.create);

router.route('/:id/reviews')
  .get(reviewsController.index)
  .post(reviewsController.create);

router.route('/:id')
  .get(spacesController.show)
  .patch(spacesController.update)
  .delete(spacesController.delete);

module.exports = router;
