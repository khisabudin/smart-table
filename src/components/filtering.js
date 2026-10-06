export function initFiltering(elements) {
    const updateIndexes = (elements, indexes) => {
    Object.keys(indexes).forEach((elementName) => {
        elements[elementName].append(...Object.values(indexes[elementName]).map(name => {                        // используйте name как значение и текстовое содержимое
                          const el = document.createElement('option');
                          el.value = name;
                          el.textContent = name;
                          return el;
                      }))
     });
    }
    const applyFiltering = (query, state, action) => {
        if (action && action.name === 'clear') {
            const input = action.parentElement.querySelector('input');
            if (input) {
                input.value = '';
            }
            const fieldName = action.dataset.field;
            if (fieldName in state) {
                state[fieldName] = '';
            }
        }
        const filter = {};
        Object.keys(elements).forEach(key => {
            if (elements[key]) {
                if (['INPUT', 'SELECT'].includes(elements[key].tagName) && elements[key].value) {
                    filter[`filter[${elements[key].name}]`] = elements[key].value;
                }
            }
        })
        return Object.keys(filter).length ? Object.assign({}, query, filter) : query;
    }
    return {
        updateIndexes,
        applyFiltering
    }
}