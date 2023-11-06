const EspecieDTO = require("./especieDTO");

class Especie {
    constructor(id, nome, consumoDiario, atratividade, maximoPorRecinto, custoRecinto) {
        this.id = id;
        this.nome = nome;
        this.consumoDiario = consumoDiario;
        this.atratividade = atratividade;
        this.maximoPorRecinto = maximoPorRecinto;
        this.custoRecinto = custoRecinto;
    }

    static _setEspeciePorObj(info) {
        return new Especie(info.id, info.nome, info.consumo_diario, info.atratividade, info.max_por_recinto, info.custo_recinto);
    }

    static async obterEspecie(id) {
        const info = await EspecieDTO.obterPorId(id);
        return this._setEspeciePorObj(info);
    }

    static async listar() {
        const especiesInfo = await EspecieDTO.listar();
        return especiesInfo.map(especie => this._setEspeciePorObj(especie));
    }
}

module.exports = Especie;