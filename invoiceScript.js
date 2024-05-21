let invoice;

document.addEventListener('DOMContentLoaded', function() {
    invoice = JSON.parse(localStorage.getItem('invoice'));

    if (!invoice) {
        alert('No invoice data found.');
        return;
    }

    document.getElementById('invoiceNumberDate').innerText = `Invoice No. ${invoice.invoiceNumber}\n${invoice.invoiceDate}`;
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
        <p>Subtotal: $${subtotal.toFixed(2)}</p>
        <p>Tax (0%): $0.00</p>
        <p class="total-amount">Total: $${subtotal.toFixed(2)}</p>
    `;

    document.getElementById('paymentInfo').innerHTML = `
        <strong>PAYMENT INFORMATION</strong>
        <p>${invoice.accountName}<br>Account No.: ${invoice.accountNumber}<br>Pay by: ${invoice.paymentDue}</p>
        <p>${invoice.bankAddress}</p>
    `;
});

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const invoiceElement = document.getElementById('invoice');

    html2canvas(invoiceElement).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('invoice.pdf');
    });
}
