const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true }
});

const InvoiceSchema = new Schema({
    invoiceNumber: { type: String, required: true },
    invoiceDate: { type: Date, required: true },
    billedTo: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    items: [ItemSchema],
    accountName: { type: String, required: true },
    accountNumber: { type: String, required: true },
    paymentDue: { type: Date, required: true },
    bankAddress: { type: String, required: true }
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
    