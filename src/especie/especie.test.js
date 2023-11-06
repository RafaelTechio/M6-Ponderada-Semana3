const Especie = require("./especie")

describe('ESPECIE', () => {
    it('has to return without error', async () => {
        expect(Array.isArray(await Especie.listar())).toBe(true);
    })
})