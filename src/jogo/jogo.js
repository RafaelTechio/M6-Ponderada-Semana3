const JogoDTO = require("./jogoDTO");

class Jogo {
    constructor(id, dinheiro, dia, comida) {
        this.id = id;
        this.dinheiro = dinheiro;
        this.dia = dia;
        this.comida = comida;
    }

    static _setJogoPorObj(info) {
        return new Jogo(info.id, info.dinheiro, info.dia, info.comida);
    }

    static async criar(dinheiro, dia, comida) {
        const id = await JogoDTO.criar(dinheiro, dia, comida);
        return new Jogo(id, dinheiro, dia, comida);
    }

    static async obterJogo(id) {
        const info = await JogoDTO.obterPorId(id);
        return this._setJogoPorObj(info);
    }
}

module.exports = Jogo;