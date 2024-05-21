let invoice;

document.addEventListener('DOMContentLoaded', function() {
    invoice = JSON.parse(localStorage.getItem('invoice'));

    if (!invoice) {
        alert('No invoice data found.');
        return;
    }

    document.getElementById('invoiceNumberDate').innerText = `Presupuesto N°. ${invoice.invoiceNumber}\n${invoice.invoiceDate}`;
    document.getElementById('billedToInfo').innerText = `${invoice.billedTo}\n${invoice.phone}\n${invoice.address}`;

    const itemsTableBody = document.querySelector('#invoiceItemsTable tbody');
    let subtotal = 0;

    invoice.items.forEach(item => {
        const row = document.createElement('tr');
        const total = item.quantity * item.unitPrice;
        subtotal += total;

        row.innerHTML = `
            <td>${item.description}</td>
            <td>${item.quantity}</td>
            <td>$${item.unitPrice.toFixed(2)}</td>
            <td>$${total.toFixed(2)}</td>
        `;
        itemsTableBody.appendChild(row);
    });

    document.getElementById('invoiceTotal').innerHTML = `
        <p class="total-amount">Total: $${subtotal.toFixed(2)}</p>
    `;

    document.getElementById('paymentInfo').innerHTML = `
        <strong>PAYMENT INFORMATION</strong>
        <p>${invoice.accountName}<br>DNI.: ${invoice.accountNumber}<br>Fecha: ${invoice.paymentDue}</p>
        <p>${invoice.bankAddress}</p>
    `;
});

function printInvoice() {
    window.print();
}
