import request from 'supertest';
import app from '../rpn';

describe('Routing / HTTP method', () => {
    it('returns 404 for GET on the evaluate route (POST only)', async () => {
        const res = await request(app).get('/api/v1/evaluate');
        expect(res.status).toBe(404);
    });

    it('returns 404 for an unknown route', async () => {
        const res = await request(app).post('/api/v1/nope');
        expect(res.status).toBe(404);
    });
});
