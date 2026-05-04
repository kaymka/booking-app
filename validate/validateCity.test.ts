import { validateCity } from './validateCity';
import type { Result } from './validateDate';

describe('validateCity', () => {
    describe('валидация пустых значений', () => {
        it('должен возвращать ошибку для пустой строки', () => {
            const result = validateCity('');
            
            expect(result.isValid).toBe(false);
            expect(result.error).toContain('Введите название');
        });

        it('должен возвращать ошибку для строки из пробелов', () => {
            const result = validateCity('   ');
            
            expect(result.isValid).toBe(false);
            expect(result.error).toContain('Введите название');
        });

        it('должен корректно обрабатывать строку с пробелами вокруг валидного названия', () => {
            const result = validateCity('  Moscow  ');
            
            expect(result.isValid).toBe(true);
            expect(result.error).toBeUndefined();
        });

        it('должен возвращать ошибку для null или undefined', () => {
            // @ts-ignore - проверяем поведение с некорректными входными данными
            const resultWithNull = validateCity(null);
            // @ts-ignore
            const resultWithUndefined = validateCity(undefined);
            
            expect(resultWithNull.isValid).toBe(false);
            expect(resultWithNull.error).toContain('Введите название');
            expect(resultWithUndefined.isValid).toBe(false);
            expect(resultWithUndefined.error).toContain('Введите название');
        });
    });

    describe('валидация экранирования и управляющих символов', () => {
        it('должен возвращать ошибку при наличии обратного слеша', () => {
            const result = validateCity('city\\name');
            
            expect(result.isValid).toBe(false);
            expect(result.error).toContain('экранирование');
        });

        it('должен возвращать ошибку при наличии символа новой строки', () => {
            const result = validateCity('city\nname');
            
            expect(result.isValid).toBe(false);
            expect(result.error).toContain('управляющие символы');
        });

        it('должен возвращать ошибку при наличии символа табуляции', () => {
            const result = validateCity('city\tname');
            
            expect(result.isValid).toBe(false);
            expect(result.error).toContain('управляющие символы');
        });

        it('должен возвращать ошибку при наличии комбинации управляющих символов', () => {
            const result = validateCity('city\\n\tname');
            
            expect(result.isValid).toBe(false);
            expect(result.error).toContain('управляющие символы');
        });
    });

    describe('валидация разрешенных спецсимволов (восклицательный знак и дефис)', () => {
        it('должен пропускать название с восклицательным знаком', () => {
            const result = validateCity('Ha! Ha!');
            
            expect(result.isValid).toBe(true);
            expect(result.error).toBeUndefined();
        });

        it('должен пропускать название с дефисом', () => {
            const result = validateCity('Saint-Louis');
            
            expect(result.isValid).toBe(true);
            expect(result.error).toBeUndefined();
        });

        it('должен пропускать название с комбинацией восклицательного знака и дефиса', () => {
            const result = validateCity('Saint-Louis-du-Ha! Ha!');
            
            expect(result.isValid).toBe(true);
            expect(result.error).toBeUndefined();
        });

        it('должен пропускать название с дефисом в начале', () => {
            const result = validateCity('-Saint-Louis');
            
            expect(result.isValid).toBe(true);
            expect(result.error).toBeUndefined();
        });

        it('должен пропускать название с дефисом в конце', () => {
            const result = validateCity('Saint-Louis-');
            
            expect(result.isValid).toBe(true);
            expect(result.error).toBeUndefined();
        });
    });

    describe('валидация Unicode и спецсимволов', () => {
        it('должен пропускать название с турецкими символами', () => {
            const result = validateCity('Ağrı');
            
            expect(result.isValid).toBe(true);
            expect(result.error).toBeUndefined();
        });

        it('должен пропускать название с немецкими умлаутами', () => {
            const result = validateCity('München');
            
            expect(result.isValid).toBe(true);
            expect(result.error).toBeUndefined();
        });

        it('должен пропускать название с французскими акцентами', () => {
            const result = validateCity('Montréal');
            
            expect(result.isValid).toBe(true);
            expect(result.error).toBeUndefined();
        });

        it('должен пропускать название с русскими буквами', () => {
            const result = validateCity('Москва');
            
            expect(result.isValid).toBe(true);
            expect(result.error).toBeUndefined();
        });

        it('должен пропускать название с японскими символами', () => {
            const result = validateCity('東京');
            
            expect(result.isValid).toBe(true);
            expect(result.error).toBeUndefined();
        });

        it('должен пропускать название со скандинавскими символами', () => {
            const result = validateCity('Ålesund');
            
            expect(result.isValid).toBe(true);
            expect(result.error).toBeUndefined();
        });
    });

    describe('валидация названия из одной буквы', () => {
        it('должен пропускать название из одной латинской буквы', () => {
            const result = validateCity('A');
            
            expect(result.isValid).toBe(true);
            expect(result.error).toBeUndefined();
        });

        it('должен пропускать название из одной русской буквы', () => {
            const result = validateCity('М');
            
            expect(result.isValid).toBe(true);
            expect(result.error).toBeUndefined();
        });

        it('должен пропускать название из одной цифры', () => {
            const result = validateCity('1');
            
            expect(result.isValid).toBe(true);
            expect(result.error).toBeUndefined();
        });
    });

    describe('валидация названий с разрешенными символами', () => {
        it('должен пропускать название с апострофом', () => {
            const result = validateCity("St. John's");
            
            expect(result.isValid).toBe(true);
            expect(result.error).toBeUndefined();
        });

        it('должен пропускать название с точкой', () => {
            const result = validateCity('St. Petersburg');
            
            expect(result.isValid).toBe(true);
            expect(result.error).toBeUndefined();
        });

        it('должен пропускать название с пробелами', () => {
            const result = validateCity('New York');
            
            expect(result.isValid).toBe(true);
            expect(result.error).toBeUndefined();
        });

        it('должен пропускать название с цифрами', () => {
            const result = validateCity('City 123');
            
            expect(result.isValid).toBe(true);
            expect(result.error).toBeUndefined();
        });

        it('должен пропускать название только из цифр', () => {
            const result = validateCity('12345');
            
            expect(result.isValid).toBe(true);
            expect(result.error).toBeUndefined();
        });
    });

    describe('валидация опасных символов', () => {
        it('должен отклонять название с угловыми скобками', () => {
            const result = validateCity('<script>');
            
            expect(result.isValid).toBe(false);
            expect(result.error).toContain('недопустимые спецсимволы');
        });

        it('должен отклонять название с фигурными скобками', () => {
            const result = validateCity('{city}');
            
            expect(result.isValid).toBe(false);
            expect(result.error).toContain('недопустимые спецсимволы');
        });

        it('должен отклонять название с квадратными скобками', () => {
            const result = validateCity('[city]');
            
            expect(result.isValid).toBe(false);
            expect(result.error).toContain('недопустимые спецсимволы');
        });

        it('должен отклонять название с круглыми скобками', () => {
            const result = validateCity('(city)');
            
            expect(result.isValid).toBe(false);
            expect(result.error).toContain('недопустимые спецсимволы');
        });

        it('должен отклонять название со знаком равенства', () => {
            const result = validateCity('city=name');
            
            expect(result.isValid).toBe(false);
            expect(result.error).toContain('недопустимые спецсимволы');
        });

        it('должен отклонять название со знаком плюс', () => {
            const result = validateCity('city+name');
            
            expect(result.isValid).toBe(false);
            expect(result.error).toContain('недопустимые спецсимволы');
        });

        it('должен отклонять название со звездочкой', () => {
            const result = validateCity('city*name');
            
            expect(result.isValid).toBe(false);
            expect(result.error).toContain('недопустимые спецсимволы');
        });

        it('должен отклонять название с амперсандом', () => {
            const result = validateCity('city&name');
            
            expect(result.isValid).toBe(false);
            expect(result.error).toContain('недопустимые спецсимволы');
        });

        it('должен отклонять название с символом процента', () => {
            const result = validateCity('city%name');
            
            expect(result.isValid).toBe(false);
            expect(result.error).toContain('недопустимые спецсимволы');
        });

        it('должен отклонять название с символом доллара', () => {
            const result = validateCity('$city');
            
            expect(result.isValid).toBe(false);
            expect(result.error).toContain('недопустимые спецсимволы');
        });

        it('должен отклонять название с символом решетки', () => {
            const result = validateCity('city#name');
            
            expect(result.isValid).toBe(false);
            expect(result.error).toContain('недопустимые спецсимволы');
        });

        it('должен отклонять название с символом @', () => {
            const result = validateCity('city@name');
            
            expect(result.isValid).toBe(false);
            expect(result.error).toContain('недопустимые спецсимволы');
        });

        it('должен отклонять название с тильдой', () => {
            const result = validateCity('city~name');
            
            expect(result.isValid).toBe(false);
            expect(result.error).toContain('недопустимые спецсимволы');
        });

        it('должен отклонять название с обратным апострофом', () => {
            const result = validateCity('city`name');
            
            expect(result.isValid).toBe(false);
            expect(result.error).toContain('недопустимые спецсимволы');
        });

        it('должен отклонять название с вертикальной чертой', () => {
            const result = validateCity('city|name');
            
            expect(result.isValid).toBe(false);
            expect(result.error).toContain('недопустимые спецсимволы');
        });

        it('должен отклонять название с несколькими опасными символами', () => {
            const result = validateCity('<script>alert(1)</script>');
            
            expect(result.isValid).toBe(false);
            expect(result.error).toContain('недопустимые спецсимволы');
        });
    });

    describe('граничные случаи', () => {
        it('должен корректно обрабатывать очень длинное название', () => {
            const longName = 'A'.repeat(1000);
            const result = validateCity(longName);
            
            expect(result.isValid).toBe(true);
            expect(result.error).toBeUndefined();
        });

        it('должен корректно обрабатывать название со смешанными разрешенными и опасными символами', () => {
            const result = validateCity('Saint-Louis <script>');
            
            expect(result.isValid).toBe(false);
            expect(result.error).toContain('недопустимые спецсимволы');
        });

        it('должен пропускать название только из пробелов после обрезки', () => {
            // Название, которое после trim становится пустой строкой
            const result = validateCity('     ');
            
            expect(result.isValid).toBe(false);
            expect(result.error).toContain('Введите название');
        });

        it('должен корректно обрабатывать название с апострофом и дефисом одновременно', () => {
            const result = validateCity("St. John's-Louis");
            
            expect(result.isValid).toBe(true);
            expect(result.error).toBeUndefined();
        });
    });
});