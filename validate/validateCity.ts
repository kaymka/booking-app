import type {Result} from './validateDate.js'

export function validateCity(strCity: string): Result {
    const trimmedCity = strCity?.trim() || '';

    // Проверка на пустоту
    if(trimmedCity.length === 0) {
        return {
            isValid: false,
            error: 'Введите название города или страны'
        };
    }

    // Проверка на экранирование
    if (trimmedCity.includes("\\") || trimmedCity.includes('\n') || trimmedCity.includes('\t')) {
        return {
            isValid: false,
            error: 'Название не должно содержать управляющие символы или экранирование'
        };
    }

     // Разрешаем:
    // - любые буквы (включая Unicode)
    // - цифры
    // - пробелы
    // - знаки препинания: ! - ' . ,
    // Запрещаем только явно опасные символы
    const dangerousChars = /[<>{}[\]()=+*&^%$#@~`|]/;
    
    if (dangerousChars.test(trimmedCity)) {
        return {
            isValid: false,
            error: 'Название содержит недопустимые спецсимволы'
        };
    }

    // Проверка на допустимые символы (опционально, если нужна более строгая проверка)
    const allowedPattern = /^[\p{L}\p{N}\s!\-'.]+$/u;

    if(!allowedPattern.test(trimmedCity)) {
        return {
            isValid: false,
            error: 'Название содержит недопустимые символы'
        };
    }

    return {
        isValid: true
    };
}