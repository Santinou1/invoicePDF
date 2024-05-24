document.getElementById('invoiceForm').addEventListener('submit', function(event) {
    event.preventDefault();
    generateInvoice();
});

let itemIndex = 2;

const products = {
    "001": { description: "Arena", unitPrice: 10000 },
    "002": { description: "Cemento", unitPrice: 12000 },
    // Agrega más productos aquí
};

function addItem() {
    const itemsDiv = document.getElementById('items');
    const newItemDiv = document.createElement('div');
    newItemDiv.className = 'item';

    newItemDiv.innerHTML = `
        <label for="itemCode${itemIndex}">Código del Producto</label>
        <input type="text" id="itemCode${itemIndex}" name="itemCode${itemIndex}" oninput="autocompleteProduct(${itemIndex})" required>
        <label for="itemDescription${itemIndex}">Producto</label>
        <input type="text" id="itemDescription${itemIndex}" name="itemDescription${itemIndex}" required>
        <label for="itemQuantity${itemIndex}">Cantidad</label>
        <input type="number" id="itemQuantity${itemIndex}" name="itemQuantity${itemIndex}" required>
        <label for="itemPrice${itemIndex}">Precio</label>
        <input type="number" id="itemPrice${itemIndex}" name="itemPrice${itemIndex}" required>
    `;

    itemsDiv.appendChild(newItemDiv);
    itemIndex++;
}

function autocompleteProduct(index) {
    const codeInput = document.getElementById(`itemCode${index}`);
    const descriptionInput = document.getElementById(`itemDescription${index}`);
    const priceInput = document.getElementById(`itemPrice${index}`);

    const product = products[codeInput.value];

    if (product) {
        descriptionInput.value = product.description;
        priceInput.value = product.unitPrice;
    } else {
        descriptionInput.value = '';
        priceInput.value = '';
    }
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

    fetch('/generate-invoice', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(invoice)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Invoice generated:', data);
        localStorage.setItem('invoice', JSON.stringify(data.invoiceData));
        window.location.href = 'invoice.html';
    })
    .catch(error => {
        console.error('Error generating invoice:', error);
    });
}
