const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');

// Ruta para la página principal
router.get('/', invoiceController.renderIndex);

module.exports = router;
