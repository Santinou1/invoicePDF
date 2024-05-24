const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');

// Ruta para la página de factura
router.get('/invoice', invoiceController.renderInvoice);

// Ruta para generar facturas
router.post('/generate-invoice', invoiceController.generateInvoice);

module.exports = router;
