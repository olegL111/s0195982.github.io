document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('calculator-form');
    const productSelect = document.getElementById('product');
    const quantityInput = document.getElementById('quantity');
    const quantityError = document.getElementById('quantity-error');
    const resultDiv = document.getElementById('result');
    const resultText = document.getElementById('result-text');

    const numberRegex = /^\d+$/;

    function validateQuantity(value) {
        return numberRegex.test(value) && parseInt(value) > 0;
    }

    function showError(show) {
        if (show) {
            quantityInput.classList.add('is-invalid');
            quantityError.style.display = 'block';
        } else {
            quantityInput.classList.remove('is-invalid');
            quantityError.style.display = 'none';
        }
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const price = productSelect.value;
        const quantity = quantityInput.value.trim();

        if (!price) {
            alert('Выберите товар');
            return;
        }

        if (!validateQuantity(quantity)) {
            showError(true);
            return;
        }

        showError(false);

        const total = parseInt(price) * parseInt(quantity);

        const productName = productSelect.options[productSelect.selectedIndex].text.split(' - ')[0];

        resultText.textContent = `${productName}: ${quantity} шт. × ${price} руб. = ${total} руб.`;
        resultDiv.style.display = 'block';
    });

    quantityInput.addEventListener('input', function () {
        showError(false);
    });
});