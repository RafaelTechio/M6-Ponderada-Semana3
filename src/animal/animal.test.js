const Animal = require("./animal")

describe('JOGO', () => {
    it('has to create a animal', async () => {
        expect(await Animal.criar(1, 1, 100, 0, 1)).toBeInstanceOf(Animal);
    })
})