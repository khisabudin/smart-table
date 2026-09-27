import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes)                                    // Получаем ключи из объекта
      .forEach((elementName) => {                        // Перебираем по именам
        elements[elementName].append(                    // в каждый элемент добавляем опции
            ...Object.values(indexes[elementName])        // формируем массив имён, значений опций
                      .map(name => {                        // используйте name как значение и текстовое содержимое
                          const option = document.createElement('option');
                          option.value = name;
                          option.textContent = name;
                          return option;
                      })
        )
     });

    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if (action && action.name === 'clear') {
            // Находим input внутри того же родительского контейнера, где находится кнопка
            const input = action.parentElement.querySelector('input');
            if (input) {
                input.value = ''; // Сбрасываем текст на экране
            }

            // Узнаем имя поля из дата-атрибута кнопки и очищаем его в объекте state
            const fieldName = action.dataset.field;
            if (fieldName in state) {
                state[fieldName] = '';
            }
        }
        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(row => compare(row, state));
    }
}