const RecintoDTO = require("./recintoDTO");

class Recinto {
    constructor(id, nome, status, especie, jogo) {
        this.id = id;
        this.nome = nome;
        this.status = status;
        this.especie = especie;
        this.jogo = jogo;
    }

    static _setRecintoPorObj(info, especie, jogo) {
        return new Recinto(info.id, info.nome, info.status, especie, jogo);
    }

    static async criar(nome, status, especieId, jogoId) {
        const id = await RecintoDTO.criar(especieId, nome, status, jogoId);
        return this.obterPorId(id);
    }

    static async obterPorId(id) {
        const info = await RecintoDTO.obterPorId(id);
        return this._setRecintoPorObj(info);
    }

    static async listar() {
        const recintosInfo = await RecintoDTO.listar();
        return recintosInfo.map(recinto => this._setRecintoPorObj(recinto));
    }

    async deletarRecinto() {
        RecintoDTO.deletar(this.id);
    }

    async salvar() {
        RecintoDTO.set(this.id, this.especie.id, this.nome, this.status, this.jogo.id);
    }

    cuidar() {
        this.status = 'OK';
    }

    amanhecer() {
        this.status = 'NOT_OK';
        this.salvar();
    }
}

module.exports = Recinto;