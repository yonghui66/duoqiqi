import { MidwayConfig } from '@midwayjs/core';

export default {
    // use for cookie sign key, should change to your own and keep security
    keys: '1657270986608_9610',
    express: {
        port: 7001,
    },
    jwt: {
        secret: 'xxxxxxxxxxxxxx',
        expiresIn: '2d',
    },
    orm: {
        type: 'sqlite',
        database: ':memory:',
        synchronize: true,
        logging: true,
    },
    bodyParser: {
        json: {
            enable: true,
            limit: '1mb',
            strict: true,
        },
        raw: {
            enable: false,
            limit: '1mb',
        },
        text: {
            enable: true,
            limit: '1mb',
        },
        urlencoded: {
            enable: true,
            extended: false,
            limit: '1mb',
            parameterLimit: 1000,
        },
    },
} as MidwayConfig;
