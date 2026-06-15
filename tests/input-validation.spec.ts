import { evaluateRequest, postRaw } from './request';

describe('Input validation (request shape)', () => {
    it('rejects a malformed JSON body with 400', async () => {
        const res = await postRaw('{##@');
        expect(res.status).toBe(400);
    });

    it('BUG: missing "expression" field returns 500 instead of 400', async () => {
        const res = await postRaw(JSON.stringify({}));
        expect(res.status).toBe(500);
    });

    it('BUG: "expression" as a number returns 500 instead of 400', async () => {
        const res = await evaluateRequest(42);
        expect(res.status).toBe(500);
    });

    it('BUG: "expression" as an array returns 500 instead of 400', async () => {
        const res = await evaluateRequest(['2', '3', '+']);
        expect(res.status).toBe(500);
    });

    it('BUG: "expression" as null returns 500 instead of 400', async () => {
        const res = await evaluateRequest(null);
        expect(res.status).toBe(500);
    });

    it('BUG: missing JSON Content-Type returns 500', async () => {
        const res = await postRaw('expression=2 3 +', 'text/plain');
        expect(res.status).toBe(500);
    });
});
