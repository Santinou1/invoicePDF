const path = require('path');
const Invoice = require('../models/Invoice');

// Controlador para renderizar la página principal
exports.renderIndex = (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
};

// Controlador para renderizar la página de factura
exports.renderInvoice = (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'invoice.html'));
};

// Controlador para manejar la generación de facturas
exports.generateInvoice = async (req, res) => {
    try {
        const invoiceData = req.body;

        const invoice = new Invoice({
            invoiceNumber: invoiceData.invoiceNumber,
            invoiceDate: new Date(invoiceData.invoiceDate),
            billedTo: invoiceData.billedTo,
            phone: invoiceData.phone,
            address: invoiceData.address,
            items: invoiceData.items,
            accountName: invoiceData.accountName,
            accountNumber: invoiceData.accountNumber,
            paymentDue: new Date(invoiceData.paymentDue),
            bankAddress: invoiceData.bankAddress
        });

        await invoice.save();

        res.json({ message: 'Invoice generated successfully', invoiceData: invoice });
    } catch (err) {
        console.error('Error generating invoice:', err);
        res.status(500).json({ message: 'Error generating invoice', error: err });
    }
};
