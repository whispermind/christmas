const storage = localStorage;
export const getItem = localStorage.getItem.bind(storage);
export const setItem = localStorage.setItem.bind(storage);
export const removeItem = localStorage.removeItem.bind(storage);