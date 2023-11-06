const { query, insert, selectRow } = require("../database");

class RecintoDTO {
    static criar(especieId, nome, status, jogoId) {
        return insert(`
            INSERT INTO recinto (especie_id, nome, status, jogo_id)
            VALUES (?, ?, ?, ?)
        `, [especieId, nome, status, jogoId])
    }

    static set(id, especieId, nome, status, jogoId) {
        return query(`
            UPDATE recinto 
            SET especie_id = ?, nome = ?, status = ?, jogo_id = ?
            WHERE recinto.id = ?
        `, [especieId, nome, status, jogoId, id])
    }

    static deletar(id) {
        return query(`
            DELETE from recinto
            WHERE recinto.id = ?
        `, [id])
    }

    static obterPorId(id) {
        return selectRow(`
            SELECT *
            FROM recinto
            WHERE recinto.id = ?
        `, [id]);
    }

    static obterPorJogo(id) {
        return query(`
            SELECT *
            FROM recinto
            WHERE recinto.jogo_id = ?
        `, [id]);
    }

}

module.exports = RecintoDTO;