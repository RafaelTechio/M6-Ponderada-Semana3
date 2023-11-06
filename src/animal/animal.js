const Especie = require("../especie/especie");
const Jogo = require("../jogo/jogo");
const Recinto = require("../recinto/recinto");
const AnimalDTO = require("./animalDTO");

class Animal {
    constructor(id, especie, recinto, felicidade, fome, jogo) {
        this.id = id;
        this.especie = especie;
        this.recinto = recinto;
        this.felicidade = felicidade;
        this.fome = fome;
        this.jogo = jogo;
    }

    static _setAnimalPorObj(info, especie, recinto, jogo) {
        return new Animal(info.id, especie, recinto, info.felicidade, info.fome, jogo);
    }

    static async criar(especieId, recintoId, felicidade, fome, jogoId) {
        const id = await AnimalDTO.criar(especieId, recintoId, felicidade, fome, jogoId);
        return Animal.obterPorId(id);
    }

    async salvar() {
        await AnimalDTO.set(this.id, this.especie.id, this.recinto.id, this.felicidade, this.fome);
    }

    static async obterPorId(id) {
        const info = await AnimalDTO.obterPorId(id);
        const especie = await Especie.obterPorId(info.especie_id);
        const recinto = await Recinto.obterPorId(info.recinto_id);
        const jogo = await Jogo.obterPorId(info.jogo_id);

        return this._setAnimalPorObj(info, especie, recinto, jogo);
    }

    static async obterPorJogo(id) {
        const list = await AnimalDTO.obterPorJogo(id);
        
        return await Promise.all(list.map(async info => {
            return await Animal.obterPorId(info.id);
        }))
    }

    alimentar(totalComida = 0) {
        let restanteComida = 0;
        if(this.fome > totalComida) {
            this.fome = this.fome - totalComida;
        } else {
            restanteComida = totalComida = totalComida - this.fome;
            this.fome = 0;
        }

        return restanteComida;
    }

    calcularVisitantes() {
        return Math.ceil(this.especie.consumoDiario / 10);
    }

    _calcularFelicidadeFome() {
        const felicidadeFome = 100 - this.fome;
        let ganhoFelicidadeFome = 0;

        if(felicidadeFome == 100) {
            ganhoFelicidadeFome = 25;
        } else if(felicidadeFome == 0) {
            ganhoFelicidadeFome = -50;
        } else if(felicidadeFome > 0 && felicidadeFome <= 25) {
            ganhoFelicidadeFome = -25;
        } else if(felicidadeFome > 25 && felicidadeFome <= 50) {
            ganhoFelicidadeFome = -10;
        } else if(felicidadeFome > 50 && felicidadeFome <= 75) {
            ganhoFelicidadeFome = -5;
        }

        return ganhoFelicidadeFome;
    }

    _calcularFelicidadeRecinto() {
        let ganhoFelicidadeRecinto = 0;
        const recintoCuidado = this.recinto.status == 'OK';

        if(recintoCuidado) {
            ganhoFelicidadeRecinto = 5;
        } else {
            ganhoFelicidadeRecinto = -10;
        }


        return ganhoFelicidadeRecinto;
    }

    calcularFelicidade() {
        const felicidade = this._calcularFelicidadeFome() + this._calcularFelicidadeRecinto();

        if(felicidade < 0) {
            felicidade = 0;
        } else if(felicidade > 100) {
            felicidade = 100;
        }

        return felicidade; 
    }

    async deletarAnimal() {
        AnimalDTO.deletar(this.id);
    }

    async amanhecer() {
        this.felicidade = this.calcularFelicidade();
        this.salvar();
    }

}

module.exports = Animal;