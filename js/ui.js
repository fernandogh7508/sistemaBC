// ================= RENDER TABLE =================
export function renderTable(title, items, columns, entity) {

    let headers = columns.map(c => `<th>${c}</th>`).join("");

    let rows = items.map(item => `
        <tr>
            ${columns.map(c => `<td>${item[c]}</td>`).join("")}
            <td>
                <button class="btn btn-sm btn-warning edit-btn"
                    data-id="${item.id}"
                    data-entity="${entity}">
                    Editar
                </button>

                <button class="btn btn-sm btn-danger delete-btn"
                    data-id="${item.id}"
                    data-entity="${entity}">
                    Eliminar
                </button>
            </td>
        </tr>
    `).join("");

    return `
        <div class="d-flex justify-content-between mb-3">
            <h3>${title}</h3>
            <button class="btn btn-primary"
                id="addBtn"
                data-entity="${entity}">
                Nuevo
            </button>
        </div>

        <table class="table table-striped">
            <thead>
                <tr>${headers}<th>Acciones</th></tr>
            </thead>
            <tbody>${rows}</tbody>
        </table>
    `;
}


// ================= RENDER FORM =================
export function renderForm(entity, item = {}) {

    item = item || {};

    if (entity === "clientes") {
        return `
            <input type="hidden" id="id" value="${item.id || ""}">

            <div class="mb-3">
                <label>Nombre</label>
                <input class="form-control"
                    id="nombre"
                    value="${item.nombre || ""}">
            </div>

            <div class="mb-3">
                <label>Email</label>
                <input class="form-control"
                    id="email"
                    value="${item.email || ""}">
            </div>

            <button class="btn btn-success w-100" id="saveBtn">
                Guardar
            </button>
        `;
    }

    if (entity === "cuentas") {
        return `
            <input type="hidden" id="id" value="${item.id || ""}">

            <div class="mb-3">
                <label>Número</label>
                <input class="form-control"
                    id="numero"
                    value="${item.numero || ""}">
            </div>

            <div class="mb-3">
                <label>Tipo</label>
                <select class="form-control" id="tipo">
                    <option ${item.tipo==="Ahorro"?"selected":""}>
                        Ahorro
                    </option>
                    <option ${item.tipo==="Corriente"?"selected":""}>
                        Corriente
                    </option>
                </select>
            </div>

            <div class="mb-3">
                <label>Saldo</label>
                <input type="number"
                    class="form-control"
                    id="saldo"
                    value="${item.saldo || ""}">
            </div>

            <button class="btn btn-success w-100" id="saveBtn">
                Guardar
            </button>
        `;
    }
}