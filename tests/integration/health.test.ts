import  app  from '../../src/app'
import request from "supertest";

describe(
    'Health',
    () => {
        it(
        'should return a 200 status code',
        async () => {
            const response = await request(app).get('/api/v1/health')
            expect(response.status).toBe(200)
            expect(response.body.message).toBe('Boddha biaggin tik tak,tui ham gor')
        }
        )
    })