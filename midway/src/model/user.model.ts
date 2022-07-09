import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';

@Provide()
export class UserModel {
    @InjectEntityModel(UserEntity)
    userRepo: Repository<UserEntity>;

    /**
     * 根据用户名和密码获取用户信息
     * @param username {String} 用户名
     * @param password {String} 用户密码
     */
    async getUserByUsernameAndPassword(username, password): Promise<UserEntity> {
        try {
            const userInfo = await this.userRepo.findOne({
                where: { username, password }
            });
            return Promise.resolve(userInfo);
        } catch (error) {
            return Promise.reject()
        }
    }

    /**
     * 新增用户
     * @param username {String} 用户名
     * @param password {String} 用户密码
     */
    async createUser(username, password): Promise<Number> {
        try {
            const user = new UserEntity();
            user.username = username;
            user.password = password;
            const userInfo = await this.userRepo.save(user);
            return Promise.resolve(userInfo.id);
        } catch (error) {
            return Promise.reject(error)
        }
    }
}
