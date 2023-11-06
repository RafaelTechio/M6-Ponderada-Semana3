const Recinto = require("./recinto")

describe('JOGO', () => {
    it('has to create a recinto', async () => {
        expect(await Recinto.criar('teste', 'OK', 1, 1)).toBeInstanceOf(Recinto);
    })
})