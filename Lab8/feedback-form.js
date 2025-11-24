// feedback-form.js - Форма обратной связи

document.addEventListener('DOMContentLoaded', function () {
    initFeedbackForm();
});

function initFeedbackForm() {
    const form = document.getElementById('feedbackForm');
    const modal = document.getElementById('feedbackModal');
    const formMessage = document.getElementById('formMessage');

    // Загрузка сохраненных данных
    loadFormData();

    // Обработчик отправки формы
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        submitForm();
    });

    // Автосохранение при вводе
    form.addEventListener('input', function () {
        saveFormData();
    });

    // Обработчик кнопки "Назад" в браузере
    window.addEventListener('popstate', function (e) {
        if (location.hash !== '#feedback') {
            closeFeedbackForm();
        }
    });
}

// Открытие формы
function openFeedbackForm() {
    const modal = document.getElementById('feedbackModal');
    modal.style.display = 'flex';

    // Изменение URL через History API
    history.pushState({ formOpen: true }, '', '#feedback');

    // Фокус на первое поле
    document.getElementById('fullName').focus();
}

// Закрытие формы
function closeFeedbackForm() {
    const modal = document.getElementById('feedbackModal');
    modal.style.display = 'none';

    // Возврат к исходному URL
    if (location.hash === '#feedback') {
        history.back();
    }
}

// Сохранение данных в LocalStorage
function saveFormData() {
    const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        organization: document.getElementById('organization').value,
        message: document.getElementById('message').value,
        agreement: document.getElementById('agreement').checked
    };

    localStorage.setItem('feedbackFormData', JSON.stringify(formData));
}

// Загрузка данных из LocalStorage
function loadFormData() {
    const savedData = localStorage.getItem('feedbackFormData');

    if (savedData) {
        const formData = JSON.parse(savedData);

        document.getElementById('fullName').value = formData.fullName || '';
        document.getElementById('email').value = formData.email || '';
        document.getElementById('phone').value = formData.phone || '';
        document.getElementById('organization').value = formData.organization || '';
        document.getElementById('message').value = formData.message || '';
        document.getElementById('agreement').checked = formData.agreement || false;
    }
}

// Очистка данных формы
function clearFormData() {
    localStorage.removeItem('feedbackFormData');
    document.getElementById('feedbackForm').reset();
}

// Отправка формы
function submitForm() {
    const form = document.getElementById('feedbackForm');
    const formMessage = document.getElementById('formMessage');
    const submitBtn = form.querySelector('button[type="submit"]');

    // Валидация
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    // Данные формы
    const formData = new FormData(form);
    const data = {
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        organization: formData.get('organization'),
        message: formData.get('message'),
        agreement: formData.get('agreement')
    };

    // Блокировка кнопки
    submitBtn.disabled = true;
    submitBtn.textContent = 'Отправка...';

    // Отправка на Formspree (бесплатный сервис)
    fetch('https://formspree.io/f/mldkrovl', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.ok) {
                showMessage('Сообщение успешно отправлено!', 'success');
                clearFormData();
                setTimeout(closeFeedbackForm, 2000);
            } else {
                throw new Error('Ошибка отправки');
            }
        })
        .catch(error => {
            showMessage('Ошибка отправки. Попробуйте еще раз.', 'error');
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Отправить';
        });
}

// Показать сообщение
function showMessage(text, type) {
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = text;
    formMessage.className = `form-message ${type}`;

    // Автоскрытие сообщения
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// Закрытие по клику вне формы
document.addEventListener('click', function (e) {
    const modal = document.getElementById('feedbackModal');
    if (e.target === modal) {
        closeFeedbackForm();
    }
});

// Закрытие по ESC
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeFeedbackForm();
    }
});