const express = require('express');
const router = express.Router();


// Require the controllers WHICH WE DID NOT CREATE YET!!
const product_controller = require('../controllers/product.controller');

// a simple test url to check that all of our files are communicating correctly.
router.get('/notes', product_controller.findAll);

// Create a new Note
router.post('/notes', product_controller.create);

// Retrieve a single Note with noteId
router.get('/notes/:prodId', product_controller.findOne);

// Update a Note with noteId
router.put('/notes/:prodId', product_controller.update);

// Delete a Note with noteId
router.delete('/notes/:prodId', product_controller.delete);

module.exports = router;