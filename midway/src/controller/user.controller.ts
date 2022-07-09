import { Inject, Controller, Post, Body } from '@midwayjs/decorator';
import { Context } from '@midwayjs/express';
import { Validate } from '@midwayjs/validate';
import { JwtService } from '@midwayjs/jwt';

import { UserModel } from '../model/user.model';
import { UserLoginDTO } from '../dto/user.dto';


@Controller('/api/user')
export class APIController {
    @Inject()
    ctx: Context;

    @Inject()
    jwtService: JwtService;

    @Inject()
    userModel: UserModel;

    @Post('/login')
    @Validate()
    async handleUserLogin(@Body('user') user: UserLoginDTO) {
        try {
            const userContent = await this.userModel.getUserByUsernameAndPassword(user.username, user.password);
            return {
                code: 200,
                result: "success",
                message: "登录成功",
                data: {
                    token: this.jwtService.signSync({ payload: userContent })
                }
            };
        } catch (error) {
            return {
                code: 400,
                result: "error",
                message: "账号或密码不正确",
                data: null
            }
        }
    }

    @Post('/register')
    @Validate()
    async handleCreateUser(@Body('username') username, @Body('password') password) {
        try {
            const userId = await this.userModel.createUser(username, password);
            return {
                code: 200,
                result: "success",
                message: "创建成功",
                data: {
                    token: this.jwtService.signSync({ payload: userId })
                }
            };
        } catch (error) {
            return {
                code: 5000,
                result: "error",
                message: error.message,
                data: null
            }
        }
    }
}
