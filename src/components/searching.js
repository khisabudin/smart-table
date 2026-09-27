import {rules, createComparison} from "../lib/compare.js";

export function initSearching(searchField) {
    // Оставляем базовый компаратор для совместимости структуры проекта
    const compare = createComparison(
        [rules.skipEmptyTargetValues],
        [rules.searchMultipleFields(searchField, ['date', 'customer', 'seller'], true)] 
    );

    return (data, state, action) => {
        const query = state[searchField];

        // 1. Если в поле поиска ничего нет или только пробелы — возвращаем все данные
        if (!query || query.trim() === '') {
            return data;
        }

        // 2. Очищаем поисковый запрос: убираем пробелы по краям и переводим в нижний регистр
        const cleanQuery = query.trim().toLowerCase();

        // 3. Фильтруем массив вручную на чистом JS для 100% надежности поиска по фамилиям
        return data.filter(row => {
            // Приводим проверяемые поля к нижнему регистру для независимости от регистра букв
            const customer = String(row.customer ?? '').toLowerCase();
            const seller = String(row.seller ?? '').toLowerCase();
            const date = String(row.date ?? '').toLowerCase();

            // Проверяем, содержит ли хотя бы одно поле поисковый запрос
            return customer.includes(cleanQuery) || 
                   seller.includes(cleanQuery) || 
                   date.includes(cleanQuery);
        });
    };
}
