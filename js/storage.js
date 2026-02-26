const KEY = "bancoDB";

export function initDB() {
    if (!localStorage.getItem(KEY)) {
        const data = {
            clientes: [],
            cuentas: []
        };
        localStorage.setItem(KEY, JSON.stringify(data));
    }
}

export function getDB() {
    return JSON.parse(localStorage.getItem(KEY));
}

export function saveDB(data) {
    localStorage.setItem(KEY, JSON.stringify(data));
}
