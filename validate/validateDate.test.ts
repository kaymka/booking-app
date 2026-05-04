import { validateDate } from './validateDate';
import type { Result } from './validateDate';

describe('validateDate', () => {
    describe('валидация формата даты', () => {
        it('должен пропускать корректную дату в формате ДД.ММ.ГГГГ', () => {
            // Используем будущую дату, чтобы пройти проверку с текущей датой
            const futureDate = '31.12.2030';
            const result = validateDate(futureDate);
            
            expect(result.isValid).toBe(true);
            expect(result.error).toBeUndefined();
        });

        it('не должен пропускать дату с буквами', () => {
            const result = validateDate('дд.мм.гггг');
            
            expect(result.isValid).toBe(false);
            expect(result.error).toContain('буквы');
        });

        it('не должен пропускать дату с буквами в латинице', () => {
            const result = validateDate('aa.bb.cccc');
            
            expect(result.isValid).toBe(false);
            expect(result.error).toContain('буквы');
        });

        it('не должен пропускать дату со спецсимволами', () => {
            const result = validateDate('15/05/2025');
            
            expect(result.isValid).toBe(false);
            expect(result.error).toContain('недопустимые символы');
        });

        it('не должен пропускать дату с дефисами вместо точек', () => {
            const result = validateDate('15-05-2025');
            
            expect(result.isValid).toBe(false);
            expect(result.error).toContain('недопустимые символы');
        });

        it('не должен пропускать неправильное количество цифр', () => {
            const result = validateDate('1.1.25');
            
            expect(result.isValid).toBe(false);
            expect(result.error).toContain('формату');
        });

        it('не должен пропускать дату без точек', () => {
            const result = validateDate('15052025');
            
            expect(result.isValid).toBe(false);
            expect(result.error).toContain('формату');
        });

        it('не должен пропускать дату с лишними точками', () => {
            const result = validateDate('15..05.2025');
            
            expect(result.isValid).toBe(false);
            expect(result.error).toContain('формату');
        });

        it('не должен пропускать дату с неверным количеством точек', () => {
            const result = validateDate('15.05.2025.');
            
            expect(result.isValid).toBe(false);
            expect(result.error).toContain('формату');
        });
    });

    describe('валидация существования даты', () => {
        it('не должен пропускать 31.04.2025 (в апреле 30 дней)', () => {
            const result = validateDate('31.04.2025');
            
            expect(result.isValid).toBe(false);
            expect(result.error).toContain('формату');
        });

        it('не должен пропускать 31.06.2025 (в июне 30 дней)', () => {
            const result = validateDate('31.06.2025');
            
            expect(result.isValid).toBe(false);
            expect(result.error).toContain('формату');
        });

        it('не должен пропускать 31.09.2025 (в сентябре 30 дней)', () => {
            const result = validateDate('31.09.2025');
            
            expect(result.isValid).toBe(false);
            expect(result.error).toContain('формату');
        });

        it('не должен пропускать 31.11.2025 (в ноябре 30 дней)', () => {
            const result = validateDate('31.11.2025');
            
            expect(result.isValid).toBe(false);
            expect(result.error).toContain('формату');
        });

        it('должен пропускать 31.01.2025 (в январе 31 день)', () => {
            const result = validateDate('31.01.2025');
            
            expect(result.isValid).toBe(true);
            expect(result.error).toBeUndefined();
        });

        it('должен пропускать 31.03.2025 (в марте 31 день)', () => {
            const result = validateDate('31.03.2025');
            
            expect(result.isValid).toBe(true);
            expect(result.error).toBeUndefined();
        });

        it('должен пропускать 31.05.2025 (в мае 31 день)', () => {
            const result = validateDate('31.05.2025');
            
            expect(result.isValid).toBe(true);
            expect(result.error).toBeUndefined();
        });

        it('должен пропускать 31.07.2025 (в июле 31 день)', () => {
            const result = validateDate('31.07.2025');
            
            expect(result.isValid).toBe(true);
            expect(result.error).toBeUndefined();
        });

        it('должен пропускать 31.08.2025 (в августе 31 день)', () => {
            const result = validateDate('31.08.2025');
            
            expect(result.isValid).toBe(true);
            expect(result.error).toBeUndefined();
        });

        it('должен пропускать 31.10.2025 (в октябре 31 день)', () => {
            const result = validateDate('31.10.2025');
            
            expect(result.isValid).toBe(true);
            expect(result.error).toBeUndefined();
        });

        it('должен пропускать 31.12.2025 (в декабре 31 день)', () => {
            const result = validateDate('31.12.2025');
            
            expect(result.isValid).toBe(true);
            expect(result.error).toBeUndefined();
        });

        it('должен пропускать 29.02.2024 (високосный год)', () => {
            const result = validateDate('29.02.2024');
            
            expect(result.isValid).toBe(true);
            expect(result.error).toBeUndefined();
        });

        it('не должен пропускать 29.02.2023 (невисокосный год)', () => {
            const result = validateDate('29.02.2023');
            
            expect(result.isValid).toBe(false);
            expect(result.error).toContain('формату');
        });

        it('должен пропускать 28.02.2023 (февраль невисокосного года)', () => {
            const result = validateDate('28.02.2023');
            
            expect(result.isValid).toBe(true);
            expect(result.error).toBeUndefined();
        });

        it('не должен пропускать 30.02.2024 (несуществующая дата)', () => {
            const result = validateDate('30.02.2024');
            
            expect(result.isValid).toBe(false);
            expect(result.error).toContain('формату');
        });
    });

    describe('валидация пустых значений', () => {
        it('не должен пропускать пустую строку', () => {
            const result = validateDate('');
            
            expect(result.isValid).toBe(false);
            expect(result.error).toContain('пустой');
        });

        it('не должен пропускать строку с пробелами', () => {
            const result = validateDate('   ');
            
            expect(result.isValid).toBe(false);
            expect(result.error).toContain('пустой');
        });

        it('не должен пропускать строку с пробелами до и после даты', () => {
            const result = validateDate(' 15.05.2025 ');
            
            expect(result.isValid).toBe(false);
            expect(result.error).toContain('формату');
        });
    });

    describe('валидация относительно текущей даты', () => {
        // Примечание: Эти тесты могут быть нестабильными из-за использования реальной текущей даты
        // Для стабильных тестов рекомендуется модифицировать функцию validateDate,
        // чтобы она принимала текущую дату как параметр

        it('должен выдавать предупреждение, если дата раньше текущей', () => {
            // Берем заведомо прошлую дату
            const pastDate = '01.01.2000';
            const result = validateDate(pastDate);
            
            expect(result.isValid).toBe(false);
            expect(result.error).toContain('раньше текущей');
        });

        it('должен пропускать дату, равную текущей', () => {
            // Получаем текущую дату в формате ДД.ММ.ГГГГ
            const today = new Date();
            const day = String(today.getDate()).padStart(2, '0');
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const year = today.getFullYear();
            const todayFormatted = `${day}.${month}.${year}`;
            
            const result = validateDate(todayFormatted);
            
            expect(result.isValid).toBe(true);
            expect(result.error).toBeUndefined();
        });

        it('должен пропускать дату позже текущей', () => {
            // Используем заведомо будущую дату
            const futureDate = '31.12.2030';
            const result = validateDate(futureDate);
            
            expect(result.isValid).toBe(true);
            expect(result.error).toBeUndefined();
        });
    });

    describe('пограничные случаи', () => {
        it('должен корректно обрабатывать дату 01.01.2024', () => {
            const result = validateDate('01.01.2024');
            
            expect(result.isValid).toBe(true);
            expect(result.error).toBeUndefined();
        });

        it('должен корректно обрабатывать дату 31.12.2024', () => {
            const result = validateDate('31.12.2024');
            
            expect(result.isValid).toBe(true);
            expect(result.error).toBeUndefined();
        });

        it('не должен пропускать 00.01.2025', () => {
            const result = validateDate('00.01.2025');
            
            expect(result.isValid).toBe(false);
            expect(result.error).toContain('формату');
        });

        it('не должен пропускать 01.00.2025', () => {
            const result = validateDate('01.00.2025');
            
            expect(result.isValid).toBe(false);
            expect(result.error).toContain('формату');
        });

        it('не должен пропускать 01.13.2025', () => {
            const result = validateDate('01.13.2025');
            
            expect(result.isValid).toBe(false);
            expect(result.error).toContain('формату');
        });
    });
});