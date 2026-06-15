import { evaluateRequest } from './request';

describe('Happy path - single operator', () => {
    it('adds: "2 3 +" -> 5', async () => {
        const res = await evaluateRequest('2 3 +');
        expect(res.status).toBe(200);
        expect(res.body.result).toBe(5);
    });

    it('subtracts: "5 3 -" -> 2', async () => {
        const res = await evaluateRequest('5 3 -');
        expect(res.body.result).toBe(2);
    });

    it('multiplies: "5 3 *" -> 15', async () => {
        const res = await evaluateRequest('5 3 *');
        expect(res.body.result).toBe(15);
    });

    it('divides: "6 3 /" -> 2', async () => {
        const res = await evaluateRequest('6 3 /');
        expect(res.body.result).toBe(2);
    });
});
