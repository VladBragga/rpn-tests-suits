import { evaluateRequest } from './request';

describe('Happy path - larger expressions', () => {
    it('evaluates "(1 + 2) * 4" as "1 2 + 4 *" -> 12', async () => {
        const res = await evaluateRequest('1 2 + 4 *');
        expect(res.body.result).toBe(12);
    });

    it('evaluates a deep chain: "2 3 4 5 6 + + + +" -> 20', async () => {
        const res = await evaluateRequest('2 3 4 5 6 + + + +');
        expect(res.body.result).toBe(20);
    });

    it('mixes all four operators: "100 5 / 3 * 4 - 2 +" -> 58', async () => {
        const res = await evaluateRequest('100 5 / 3 * 4 - 2 +');
        expect(res.body.result).toBe(58);
    });

    it('tolerates multiple spaces between tokens: "2   3   +" -> 5', async () => {
        const res = await evaluateRequest('2   3   +');
        expect(res.body.result).toBe(5);
    });
});
