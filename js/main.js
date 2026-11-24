// Скрипт выполняется после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Логика бургер-меню ---
    const navToggle = document.querySelector('.site-nav__toggle');
    const siteNav = document.getElementById('site-navigation');

    if (navToggle && siteNav) {
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            siteNav.classList.toggle('site-nav--open');
        });
    }

    // --- 2. Логика модального окна (только для index.html) ---
    const orderDialog = document.getElementById('order-dialog');
    const orderButtons = document.querySelectorAll('.product-card__button');
    const closeDialogButton = document.getElementById('close-order-dialog');
    const selectedProductInput = document.getElementById('selected-product');

    // Проверяем, есть ли модальное окно на странице
    if (orderDialog && orderButtons.length > 0) {
        orderButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const productName = button.dataset.product;
                if (selectedProductInput) {
                    selectedProductInput.value = productName;
                }
                orderDialog.showModal();
            });
        });
    }

    if (closeDialogButton && orderDialog) {
        closeDialogButton.addEventListener('click', () => {
            orderDialog.close();
        });
    }

    // --- 3. Логика формы (только для index.html) ---
    const orderForm = document.getElementById('order-form');
    const successMessage = document.getElementById('success-message');

    if (orderForm && successMessage && orderDialog) {
        orderForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const formElements = Array.from(orderForm.elements);
            formElements.forEach((element) => {
                if (element.willValidate) {
                    element.removeAttribute('aria-invalid');
                }
            });

            if (!orderForm.checkValidity()) {
                formElements.forEach((element) => {
                    if (element.willValidate && !element.checkValidity()) {
                        element.setAttribute('aria-invalid', 'true');
                    }
                });
                orderForm.reportValidity();
                return;
            }

            successMessage.hidden = false;
            orderForm.reset();
            orderDialog.close();
        });
    }
});