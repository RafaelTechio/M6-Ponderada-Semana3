const { query, selectRow } = require("../database");

class EspecieDTO {
    static obterPorId(id) {
        return selectRow(`
            SELECT *
            FROM especie
            WHERE especie.id = ?
        `, [id]);
    }

    static listar() {
        return query(`
            SELECT *
            FROM especie
        `);
    }
}

module.exports = EspecieDTO;