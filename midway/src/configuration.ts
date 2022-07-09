import { Configuration, App } from '@midwayjs/decorator';
import { IMidwayContainer } from '@midwayjs/core';

import * as express from '@midwayjs/express';
import * as validate from '@midwayjs/validate';
import * as orm from '@midwayjs/orm';
import * as jwt from '@midwayjs/jwt';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

import { join } from 'path';

@Configuration({
    imports: [express, orm, validate, jwt],
    importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle {
    @App()
    app: express.Application;

    async onReady(applicationContext: IMidwayContainer): Promise<void> {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(
            cors({
                origin: '*',
            })
        );
    }
}
