import { initDB, getDB, saveDB } from "./storage.js";
import { renderTable, renderForm } from "./ui.js";

const content = document.getElementById("content");
const modal = new bootstrap.Modal(document.getElementById("formModal"));

let currentPage = "clientes";

initDB();
renderPage(currentPage);

function renderPage(page) {
    currentPage = page;
    setActiveMenu(page);

    const db = getDB();
    content.innerHTML = renderTable(
        page.toUpperCase(),
        db[page],
        Object.keys(db[page][0] || {}).filter(k => k !== "id"),
        page
    );
}

function setActiveMenu(page) {
    document.querySelectorAll(".menu-item").forEach(item => {
        item.classList.remove("active");
        if (item.dataset.page === page) {
            item.classList.add("active");
        }
    });
}

document.querySelectorAll(".menu-item").forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        renderPage(link.dataset.page);
    });
});

document.addEventListener("click", e => {

    if (e.target.id === "addBtn") {
        openForm(e.target.dataset.entity);
    }

    if (e.target.classList.contains("edit-btn")) {
        openForm(e.target.dataset.entity, e.target.dataset.id);
    }

    if (e.target.classList.contains("delete-btn")) {
        deleteItem(e.target.dataset.entity, e.target.dataset.id);
    }

    if (e.target.id === "saveBtn") {
        saveItem();
    }

});

function openForm(entity, id=null) {

    const db = getDB();
    let item = null;

    if (id) {
        item = db[entity].find(i => i.id == id);
    }

    document.getElementById("modalTitle").textContent = id ? "Editar" : "Nuevo";
    document.getElementById("modalBody").innerHTML = renderForm(entity, item);

    modal.show();
}

function saveItem() {

    const db = getDB();
    const id = document.getElementById("id").value;

    let item;

    if (currentPage === "clientes") {
        item = {
            id: id || Date.now(),
            nombre: document.getElementById("nombre").value,
            email: document.getElementById("email").value
        };
    }

    if (currentPage === "cuentas") {
        item = {
            id: id || Date.now(),
            numero: document.getElementById("numero").value,
            tipo: document.getElementById("tipo").value,
            saldo: document.getElementById("saldo").value
        };
    }

    if (id) {
        db[currentPage] = db[currentPage].map(i => i.id == id ? item : i);
    } else {
        db[currentPage].push(item);
    }

    saveDB(db);
    modal.hide();
    renderPage(currentPage);
}

function deleteItem(entity, id) {

    if (!confirm("¿Seguro que desea eliminar?")) return;

    const db = getDB();
    db[entity] = db[entity].filter(i => i.id != id);

    saveDB(db);
    renderPage(entity);
}
