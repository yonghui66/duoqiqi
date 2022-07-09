import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/express';

describe('test/controller/user.test.ts', () => {
    let app;

    beforeAll(async () => {
        app = await createApp<Framework>();
    });

    afterAll(async () => {
        await close(app);
    });

    it('注册用户 POST /api/user/register', async () => {
        const result = await createHttpRequest(app).post('/api/user/register').send({ username: '123', password: '123' });
        expect(result.body.code).toBe(200);
    });

    it('登录用户 超时 POST /api/user/login', async () => {
        const starTime = Date.now()
        await createHttpRequest(app).post('/api/user/login').send({
            user: {
                username: '123', password: '123'
            }
        });
        const diff = (Date.now() - starTime) / 1000
        expect(diff > 1).toBeFalsy();
    });

    it('登录用户 正确登陆 POST /api/user/login', async () => {
        const result = await createHttpRequest(app).post('/api/user/login').send({
            user: {
                username: '123', password: '123'
            }
        });
        expect(result.body.code).toBe(200);
        expect(result.body).toHaveProperty('data');
        expect(result.body.data).toHaveProperty('token');
    });
});
