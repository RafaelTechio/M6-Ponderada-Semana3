const { query, insert, selectRow } = require("../database");

class JogoDTO {
    static criar(dinheiro, dia, comida) {
        return insert(`
            INSERT INTO jogo (dinheiro, dia, comida)
            VALUES (?, ?, ?)
        `, [dinheiro, dia, comida])
    }

    static set(id, dinheiro, dia, comida) {
        return query(`
            UPDATE jogo 
            SET dinheiro = ?, dia = ?, comida = ?
            WHERE jogo.id = ?
        `, [dinheiro, dia, comida, id])
    }

    static deletar(id) {
        return query(`
            DELETE from jogo
            WHERE jogo.id = ?
        `, [id])
    }

    static obterPorId(id) {
        return selectRow(`
            SELECT *
            FROM jogo
            WHERE jogo.id = ?
        `, [id]);
    }

    static listar() {
        return query(`
            SELECT *
            FROM jogo
        `);
    }
}

module.exports = JogoDTO;