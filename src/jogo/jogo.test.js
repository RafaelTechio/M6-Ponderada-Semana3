const Jogo = require("./jogo")

describe('JOGO', () => {
    it('has to create a game', async () => {
        expect(await Jogo.criar(1000, 1, 1000)).toBeInstanceOf(Jogo);
    })
})