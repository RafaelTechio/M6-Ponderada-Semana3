const { query, insert, selectRow } = require("../database");

class AnimalDTO {
    static criar(especieId, recintoId, felicidade, fome, jogoId) {
        return insert(`
            INSERT INTO animal (especie_id, recinto_id, felicidade, fome, jogo_id)
            VALUES (?, ?, ?, ?, ?)
        `, [especieId, recintoId, felicidade, fome, jogoId])
    }

    static set(id, especieId, recintoId, felicidade, fome, jogoId) {
        return query(`
            UPDATE animal 
            SET especie_id = ?, recinto_id = ?, felicidade = ?, fome = ?, jogo_id = ?
            WHERE animal.id = ?
        `, [especieId, recintoId, felicidade, fome, jogoId, id])
    }

    static deletar(id) {
        return query(`
            DELETE from animal
            WHERE animal.id = ?
        `, [id])
    }

    static obterPorId(id) {
        return selectRow(`
            SELECT *
            FROM animal
            WHERE animal.id = ?
        `, [id]);
    }

    static obterPorRecinto(id) {
        return query(`
            SELECT *
            FROM animal
            WHERE animal.recinto_id = ?
        `, [id]);
    }

    static obterPorJogo(id) {
        return query(`
            SELECT *
            FROM animal
            WHERE animal.jogo_id = ?
        `, [id]);
    }

}

module.exports = AnimalDTO;