document.getElementById('invoiceForm').addEventListener('submit', function(event) {
    event.preventDefault();
    generateInvoice();
});

let itemIndex = 2;

function addItem() {
    const itemsDiv = document.getElementById('items');
    const newItemDiv = document.createElement('div');
    newItemDiv.className = 'item';

    newItemDiv.innerHTML = `
        <label for="itemDescription${itemIndex}">Description</label>
        <input type="text" id="itemDescription${itemIndex}" name="itemDescription${itemIndex}" required>
        <label for="itemQuantity${itemIndex}">Quantity</label>
        <input type="number" id="itemQuantity${itemIndex}" name="itemQuantity${itemIndex}" required>
        <label for="itemPrice${itemIndex}">Unit Price</label>
        <input type="number" id="itemPrice${itemIndex}" name="itemPrice${itemIndex}" required>
    `;

    itemsDiv.appendChild(newItemDiv);
    itemIndex++;
}

function generateInvoice() {
    const form = document.getElementById('invoiceForm');
    const data = new FormData(form);
    const invoice = {
        invoiceNumber: data.get('invoiceNumber'),
        invoiceDate: data.get('invoiceDate'),
        billedTo: data.get('billedTo'),
        phone: data.get('phone'),
        address: data.get('address'),
        items: [],
        accountName: data.get('accountName'),
        accountNumber: data.get('accountNumber'),
        paymentDue: data.get('paymentDue'),
        bankAddress: data.get('bankAddress')
    };

    for (let i = 1; i < itemIndex; i++) {
        if (data.get(`itemDescription${i}`)) {
            invoice.items.push({
                description: data.get(`itemDescription${i}`),
                quantity: parseInt(data.get(`itemQuantity${i}`)),
                unitPrice: parseFloat(data.get(`itemPrice${i}`)),
            });
        }
    }

    localStorage.setItem('invoice', JSON.stringify(invoice));
    window.location.href = 'invoice.html';
}
