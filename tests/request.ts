import request from 'supertest';
import app from '../rpn';

const ENDPOINT = '/api/v1/evaluate';

export function evaluateRequest(expression: unknown): request.Test {
    return request(app).post(ENDPOINT).send({ expression });
}

// Raw body + Content-Type, for malformed-payload and framing tests.
export function postRaw(rawBody: string, contentType = 'application/json'): request.Test {
    return request(app).post(ENDPOINT).set('Content-Type', contentType).send(rawBody);
}
