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

    static async obterPorId(id) {
        const info = await JogoDTO.obterPorId(id);
        return this._setJogoPorObj(info);
    }

    descontar(dinheiro) {
        this.dinheiro = this.dinheiro - dinheiro;
    }

    converterVisitantes(visitantes) {
        this.dinheiro = this.dinheiro + (visitantes * 2)
    }

    comprarComida(quantidade) {
        if(quantidade <= this.dinheiro) {
            this.dinheiro = this.dinheiro - quantidade;
            this.comida = this.comida + quantidade;
        } else {
            this.comida = this.comida + this.dinheiro;
            this.dinheiro = 0;
        }
    }

    amanhecer() {
        this.dia = this.dia + 1;
        this.salvar();
    }

    async salvar() {
        await JogoDTO.set(this.id, this.dinheiro, this.dia, this.comida);
    }
}

module.exports = Jogo;