// Валидация города
function validateCity(city) {
    const trimmed = city?.trim();
    if (!trimmed) {
        return { isValid: false, error: 'Город не может быть пустым' };
    }
    if (trimmed.length < 2) {
        return { isValid: false, error: 'Название города слишком короткое' };
    }
    if (/[0-9]/.test(trimmed)) {
        return { isValid: false, error: 'Название города не должно содержать цифры' };
    }
    return { isValid: true, error: '' };
}

// Валидация даты
function validateDate(dateStr, fieldName) {
    const trimmed = dateStr?.trim();
    if (!trimmed) {
        return { isValid: false, error: `${fieldName} не может быть пустой` };
    }
    
    const regex = /^(\d{2})\.(\d{2})\.(\d{4})$/;
    if (!regex.test(trimmed)) {
        return { isValid: false, error: 'Используйте формат ДД.ММ.ГГГГ' };
    }
    
    const day = parseInt(trimmed.substring(0, 2), 10);
    const month = parseInt(trimmed.substring(3, 5), 10);
    const year = parseInt(trimmed.substring(6, 10), 10);
    
    if (month < 1 || month > 12) {
        return { isValid: false, error: 'Месяц должен быть от 01 до 12' };
    }
    
    const daysInMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > daysInMonth) {
        return { isValid: false, error: `В этом месяце только ${daysInMonth} дней` };
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const inputDate = new Date(year, month - 1, day);
    
    if (inputDate < today) {
        return { isValid: false, error: 'Дата не может быть раньше сегодняшней' };
    }
    
    return { isValid: true, error: '' };
}

// Получаем элементы после загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    const cityInput = document.getElementById('cityInput');
    const checkInDate = document.getElementById('checkInDate');
    const checkOutDate = document.getElementById('checkOutDate');
    const searchBtn = document.getElementById('searchButton');
    const cityError = document.getElementById('cityError');
    const checkInError = document.getElementById('checkInError');
    const checkOutError = document.getElementById('checkOutError');
    const resultsContainer = document.getElementById('resultsContainer');

    // Функция проверки формы
    function validateForm() {
        const cityValid = validateCity(cityInput.value);
        const checkInValid = validateDate(checkInDate.value, 'Дата заезда');
        const checkOutValid = validateDate(checkOutDate.value, 'Дата выезда');
        
        cityError.textContent = cityValid.error || '';
        checkInError.textContent = checkInValid.error || '';
        checkOutError.textContent = checkOutValid.error || '';
        
        // Проверка, что выезд позже заезда
        let isFormValid = cityValid.isValid && checkInValid.isValid && checkOutValid.isValid;
        
        if (isFormValid && checkInDate.value && checkOutDate.value) {
            const partsIn = checkInDate.value.split('.');
            const partsOut = checkOutDate.value.split('.');
            const inDate = new Date(partsIn[2], partsIn[1] - 1, partsIn[0]);
            const outDate = new Date(partsOut[2], partsOut[1] - 1, partsOut[0]);
            
            if (outDate <= inDate) {
                checkOutError.textContent = 'Дата выезда должна быть позже даты заезда';
                isFormValid = false;
            }
        }
        
        searchBtn.disabled = !isFormValid;
        return isFormValid;
    }

    // Маска для ввода даты
    function addDateMask(input) {
        input.addEventListener('input', function(e) {
            let value = this.value.replace(/[^\d]/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '.' + value.substring(2);
            }
            if (value.length >= 5) {
                value = value.substring(0, 5) + '.' + value.substring(5, 9);
            }
            this.value = value.substring(0, 10);
            validateForm();
        });
    }

    // Поиск отелей
    function searchHotels() {
        const city = cityInput.value.trim();
        const checkIn = checkInDate.value;
        const checkOut = checkOutDate.value;
        
        resultsContainer.innerHTML = `
            <div style="background: #d4edda; color: #155724; padding: 15px; border-radius: 8px; text-align: center;">
                <strong>✅ Найдены отели!</strong><br>
                🏙️ ${city}<br>
                📅 с ${checkIn} по ${checkOut}<br><br>
                🏨 Рекомендуем: Grand Hotel, City Inn, Plaza Residence
            </div>
        `;
    }

    // Навешиваем обработчики
    cityInput.addEventListener('input', validateForm);
    addDateMask(checkInDate);
    addDateMask(checkOutDate);
    searchBtn.addEventListener('click', searchHotels);
    
    // Первоначальная проверка
    validateForm();
    
    console.log('Приложение загружено и работает!');
});
