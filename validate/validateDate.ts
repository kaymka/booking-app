export type Result = {
    isValid: boolean,
    error?: string
}

export function validateDate(
    strDate: string, 
    currentDate: Date = new Date()  // Внедрение зависимости
): Result {
    if (!strDate || strDate.trim() === '') {
        return {
            isValid: false,
            error: 'Дата не может быть пустой'
        };
    }

    const regex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/;

    if (!regex.test(strDate)) {
        if (/[a-zA-Zа-яА-Я]/.test(strDate)) {
            return {
                isValid: false,
                error: `Дата содержит буквы. Используйте формат ДД.ММ.ГГГГ`
            };
        }
        if (/[^0-9.]/.test(strDate)) {
            return {
                isValid: false,
                error: `Дата содержит недопустимые символы. Используйте только цифры и точки`
            };
        }
        return {
            isValid: false,
            error: `Дата не соответствует формату ДД.ММ.ГГГГ`
        };
    }

    const [day, month, year] = strDate.split('.').map(Number);
    const inputDate = new Date(year, month - 1, day);
    
    // Проверка существования даты
    if (inputDate.getDate() !== day || 
        inputDate.getMonth() !== month - 1 || 
        inputDate.getFullYear() !== year) {
        return {
            isValid: false,
            error: `Дата "${strDate}" не существует`
        };
    }
    
    const today = new Date(currentDate);
    today.setHours(0, 0, 0, 0);

    if (inputDate < today) {
        return {
            isValid: false,
            error: `Дата не может быть раньше текущей`
        };
    }

    return { isValid: true };
}