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

app.post('/jogo/:jogoId/recinto', async (req, res) => {
    const {especieId, nome} = req.body;
    if(!especieId || !nome) {
        return res.json({erro: 'Informação mal formatada'})
    }

    const id = await Recinto.criar(nome, 'OK', especieId, req.params.jogoId)

    res.json(await Recinto.obterPorId(id));
})

app.post('/jogo/:jogoId/recinto/:recintoId/animal', async (req, res) => {
    
})

app.listen(3000, () => {
    console.log(`Connected`)
})