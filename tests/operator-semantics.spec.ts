import { evaluateRequest } from './request';

describe('Operator semantics', () => {
    it('subtraction is left-to-right: "10 4 -" -> 6', async () => {
        const res = await evaluateRequest('10 4 -');
        expect(res.body.result).toBe(6);
    });

    it('division is left-to-right: "20 4 /" -> 5', async () => {
        const res = await evaluateRequest('20 4 /');
        expect(res.body.result).toBe(5);
    });

    it('supports non-integer division: "7 2 /" -> 3.5', async () => {
        const res = await evaluateRequest('7 2 /');
        expect(res.body.result).toBe(3.5);
    });

    it('treats a leading-minus token as a negative literal: "-3 2 +" -> -1', async () => {
        const res = await evaluateRequest('-3 2 +');
        expect(res.body.result).toBe(-1);
    });

    it('handles decimals: "1.5 2.5 +" -> 4', async () => {
        const res = await evaluateRequest('1.5 2.5 +');
        expect(res.body.result).toBe(4);
    });

    it('exposes floating-point imprecision: "0.1 0.2 +" -> 0.30000000000000004', async () => {
        const res = await evaluateRequest('0.1 0.2 +');
        expect(res.body.result).toBeCloseTo(0.3);
        expect(res.body.result).not.toBe(0.3);
    });
});
