// Ожидаем загрузку DOM
document.addEventListener('DOMContentLoaded', function () {

    // Получаем элементы
    const quantityInput = document.getElementById('service-quantity');
    const serviceRadios = document.querySelectorAll('input[name="service-type"]');
    const optionsSection = document.getElementById('options-section');
    const propertiesSection = document.getElementById('properties-section');
    const serviceOptions = document.getElementById('service-options');
    const serviceProperty = document.getElementById('service-property');
    const totalPrice = document.getElementById('total-price');

    // Цены услуг
    const servicePrices = {
        'basic': 1000,
        'premium': 2000,
        'vip': 3000
    };

    // Функция получения выбранного типа услуги
    function getSelectedService() {
        for (let radio of serviceRadios) {
            if (radio.checked) {
                return radio.value;
            }
        }
        return 'basic';
    }

    // Функция показа/скрытия дополнительных полей
    function toggleAdditionalFields(serviceType) {
        // Тип 1: ничего не показываем
        // Тип 2: показываем только опции
        // Тип 3: показываем только свойства

        if (serviceType === 'basic') {
            optionsSection.style.display = 'none';
            propertiesSection.style.display = 'none';
        } else if (serviceType === 'premium') {
            optionsSection.style.display = 'block';
            propertiesSection.style.display = 'none';
        } else if (serviceType === 'vip') {
            optionsSection.style.display = 'none';
            propertiesSection.style.display = 'block';
        }
    }

    // Функция расчета общей стоимости
    function calculateTotal() {
        const serviceType = getSelectedService();
        const quantity = parseInt(quantityInput.value) || 1;
        const basePrice = servicePrices[serviceType];

        let additionalCost = 0;

        // Добавляем стоимость опций для premium услуги
        if (serviceType === 'premium') {
            additionalCost += parseInt(serviceOptions.value) || 0;
        }

        // Добавляем стоимость свойства для vip услуги
        if (serviceType === 'vip' && serviceProperty.checked) {
            additionalCost += parseInt(serviceProperty.value) || 0;
        }

        // Рассчитываем общую стоимость
        const total = (basePrice + additionalCost) * quantity;

        // Обновляем отображение цены
        totalPrice.textContent = total + ' ₽';
    }

    // Обработчики событий

    // При изменении количества
    quantityInput.addEventListener('input', calculateTotal);

    // При изменении типа услуги
    serviceRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            toggleAdditionalFields(this.value);
            calculateTotal();
        });
    });

    // При изменении опций
    serviceOptions.addEventListener('change', calculateTotal);

    // При изменении свойства
    serviceProperty.addEventListener('change', calculateTotal);

    // Инициализация при загрузке
    toggleAdditionalFields(getSelectedService());
});