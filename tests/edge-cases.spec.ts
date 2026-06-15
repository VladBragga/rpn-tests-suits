import { evaluateRequest } from './request';

describe('Edge cases & known bugs', () => {
    it('BUG: division by zero "5 0 /" returns 200 with result null', async () => {
        const res = await evaluateRequest('5 0 /');
        expect(res.status).toBe(200);
        expect(res.body.result).toBeNull();
    });

    it('BUG: too few operands "2 +" returns 200 with result null', async () => {
        const res = await evaluateRequest('2 +');
        expect(res.status).toBe(200);
        expect(res.body.result).toBeNull();
    });

    it('BUG: lone operator "+" returns 200 with result null', async () => {
        const res = await evaluateRequest('+');
        expect(res.status).toBe(200);
        expect(res.body.result).toBeNull();
    });

    it('BUG: too many operands "2 3" returns 200 with result 2', async () => {
        const res = await evaluateRequest('2 3');
        expect(res.status).toBe(200);
        expect(res.body.result).toBe(2);
    });

    it('BUG: unknown operator "2 3 %" is ignored, returns 200 with result 2', async () => {
        const res = await evaluateRequest('2 3 %');
        expect(res.status).toBe(200);
        expect(res.body.result).toBe(2);
    });

    it('BUG: non-numeric tokens "a b +" returns 200 with result null', async () => {
        const res = await evaluateRequest('a b +');
        expect(res.status).toBe(200);
        expect(res.body.result).toBeNull();
    });

    it('BUG: empty string returns 200 with no "result" key', async () => {
        const res = await evaluateRequest('');
        expect(res.status).toBe(200);
        expect(res.body).not.toHaveProperty('result');
    });

    it('BUG: whitespace-only "   " returns 200 with no "result" key', async () => {
        const res = await evaluateRequest('   ');
        expect(res.status).toBe(200);
        expect(res.body).not.toHaveProperty('result');
    });
});
