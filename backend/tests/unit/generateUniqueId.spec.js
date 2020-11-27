const generateUniqueId = require('../../src/utils/generateUniqueId')

describe('generateUniqueId', () => {
    it('should generate an unique id', () => {
        const id = generateUniqueId();

        expect(id).toHaveLength(8);
    });
});