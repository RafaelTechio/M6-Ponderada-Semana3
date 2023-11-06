const express = require('express');
const database = require('./database');
const Jogo = require('./jogo/jogo');
const Recinto = require('./recinto/recinto');
const Animal = require('./animal/animal');
const Especie = require('./especie/especie');

const app = express();

app.use(express.json());

app.post('/jogo', async (req, res) => {
    const jogo = await Jogo.criar(100, 1, 100);

    res.json(jogo)
})

app.get('/especies', async (req, res) => {
    const especies = await Especie.listar();
    res.json(especies);
})

app.get('/jogo/:jogoId', async(req, res) => {
    res.json(await Jogo.obterPorId(req.params.jogoId));
})

app.post('/jogo/:jogoId/recinto', async (req, res) => {
    const {especieId, nome} = req.body;
    const jogo = await Jogo.obterPorId(req.params.jogoId);
    const especie = await Especie.obterPorId(req.body.especieId);
    if(!especieId || !nome || !jogo || !especie) {
        return res.json({erro: 'Informação mal formatada'})
    }

    if(jogo.dinheiro < especie.custoRecinto){
        return res.json({erro: 'Sem dinheiro'})
    }

    const recinto = await Recinto.criar(nome, 'OK', especieId, req.params.jogoId);

    jogo.descontar(especie.custoRecinto);
    jogo.salvar();

    res.json(recinto);
})

app.get('/jogo/:jogoId/recinto', async(req, res) => {
    res.json(await Recinto.obterPorJogo(req.params.jogoId));
})

app.put('/jogo/:jogoId/recinto/:recintoId/cuidar', async (req, res) => {
    const recinto = await Recinto.obterPorId(req.params.recintoId);

    if(!recinto) {
        return res.json({erro: 'Informação mal formatada'})
    }

    recinto.cuidar();
    recinto.salvar();

    res.json(await Recinto.obterPorId(req.params.recintoId));
})

app.post('/jogo/:jogoId/recinto/:recintoId/animal', async (req, res) => {
    const recinto = await Recinto.obterPorId(req.params.recintoId);
    if(!recinto) {
        return res.json({erro: 'Informação mal formatada'})
    }

    const animal = await Animal.criar(recinto.especie.id, recinto.id, 100, 0, req.params.jogoId);

    res.json(animal);
})

app.get('/jogo/:jogoId/recinto/:recintoId/animal', async(req, res) => {
    res.json(await Animal.obterPorJogo(req.params.jogoId));
})

app.put('/jogo/:jogoId/recinto/:recintoId/animal/:animalId/alimentar', async (req, res) => {
    const animal = await Animal.obterPorId(req.params.animalId);
    const jogo = await Jogo.obterPorId(req.params.jogoId);
    if(!animal) {
        return res.json({erro: 'Informação mal formatada'})
    }

    animal.alimentar(jogo.comida);
    animal.salvar();

    res.json(await Animal.obterPorId(req.params.animalId));
})

app.put('jogo/:jogoId/amanhecer', async (req, res) => {
    const { jogoId } = req.params;

    const jogo = await Jogo.obterPorId(jogoId);
    const animais = await Animal.obterPorJogo(jogoId);

    let visitantes = animais.reduce((total, element) => {
        return total + element.calcularVisitantes();
    }, 0);

    const recintos = await Recinto.obterPorJogo(jogoId);

    await Promise.all(animais.map(async animal => {
        await animal.amanhecer();
    }))

    await Promise.all(recintos.map(async recinto => {
        await recinto.amanhecer();
    }))

    jogo.converterVisitantes(visitantes);
    jogo.amanhecer();
})

app.listen(3000, () => {
    console.log(`Connected`)
})