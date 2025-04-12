import { Inject, Injectable, NotFoundException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getSha512Hash } from 'src/crpto/crpto.util';
import { Repository } from 'typeorm';
import { getUserRole, getUserStatus, LoginToken, UserDomain, userRole, userStatus } from './dto/user.dto';
import { UserEntity } from './entity/user.entity';
import { ResetPasswordEmailEntity } from 'src/email/entity/email.entity';
import * as uuid from 'uuid' 
import { EmailService } from 'src/email/email.service';
import { SecurityConfig } from 'src/config/register.config';
import { ConfigType } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class SecurityService {
    
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
                @InjectRepository(ResetPasswordEmailEntity) private readonly resetUserPasswordEmail: Repository<ResetPasswordEmailEntity>,
                @Inject(SecurityConfig.KEY) private readonly config: ConfigType<typeof SecurityConfig>,
                private readonly emailService: EmailService) {}

    async joinUserByEmail(user: UserDomain): Promise<UserEntity> {
        
        const duplicatedUser = await this.findUserByEmail(user.email);

        if (duplicatedUser) {
            throw new UnprocessableEntityException("이미 가입된 회원정보가 있습니다.")
        }

        return await this.saveUser(user);
    }

    async saveUser(user: UserDomain): Promise<UserEntity> {

        const userEntity = new UserEntity();

        userEntity.name = user.name;
        userEntity.email = user.email;
        userEntity.password = getSha512Hash(user.password);
        userEntity.auth = userRole[user.role];
        userEntity.status = userStatus[user.status];

        return await this.userRepository.save(userEntity);
    }


    async findUserByEmail(email: string): Promise<UserEntity | null> {
        return this.userRepository.findOne({
            where: {email}
        });
    }

    async sendPasswordResetEmail(email: string): Promise<void>{
        const user = this.findUserByEmail(email);
        if (!user) {
            throw new NotFoundException('존재하지 않는 이메일입니다.');
        }

        const entity = await this.saveUniqueIdForResetPassword(email);
       
        const html = `
        <div>비밀번호를 변경하시려면 아래 버튼을 눌러주세요.</div>
        <form action="${this.config.redirectClientUrl}/reset-password?uuid=${entity.uuid}" method="POST">
            <button style="display: flex;
                            height: 50px;
                            padding: 0px var(--padding-8, 24px);
                            justify-content: center;
                            align-items: center;
                            gap: var(--gap-3, 8px);
                            align-self: stretch;
                            border-radius: var(--radius-4, 8px);
                            background: var(--color-button-primary-fill, #FC5E03);
                            color: white;
                            border: none;
                            ">
                            비밀번호 변경
                            </button>
        </form>`


        this.emailService.sendEmail({
            to: email,
            subject: '[TODO] 비밀번호 변경',
            html
        });
    }

    async saveUniqueIdForResetPassword(email: string): Promise<ResetPasswordEmailEntity>{
        const entity = new ResetPasswordEmailEntity();

        entity.email = email;
        entity.uuid = uuid.v1();
        entity.expiredDt = new Date(Date.now() + 3 * 60 * 1000);
    
        return await this.resetUserPasswordEmail.save(entity);
    }

    async login(email: string, password: string): Promise<LoginToken> {
        const existEmail= await this.userRepository.findOne({
            select: {email: true},
            where: {email}
        });

        if (!existEmail)
            throw new UnauthorizedException('가입되지 않은 이메일입니다.');

        const loginUser = await this.userRepository.findOne({
            select: {id: true},
            where: {email, password: getSha512Hash(password)}
        });

        if (!loginUser)
            throw new UnauthorizedException('비밀번호가 일치하지 않습니다');

        const payload = {id: loginUser.id};

        const atk = this.createJwt(payload, '30m');

        //TODO user id, rtk, expired dt -> DB insert
        const rtk = this.createJwt(payload, '7d');

        return {
            atk,
            rtk
        }
        
    }

    createJwt(payload: any, expiresIn): string {
        return jwt.sign(payload, this.config.jwtSecretKey, {
            algorithm: "HS512",
            expiresIn,
            audience: "todo.net",
            issuer: "todo.net" 
        }) 
    }

    async getLoginUser(token: any): Promise<UserDomain> {        

        const payload = this.verifyJwt(token);
        const entity = await this.findUserById(payload?.id || 0);

        if (!entity)
            throw new UnauthorizedException("해당 유저가 존재하지 않습니다.");

        return {
            id: entity.id,
            email: entity.email,
            name: entity.name,
            status: getUserStatus(entity.status),
            role: getUserRole(entity.auth)
        }

    }

    async findUserById(id: number): Promise<UserEntity | null> {
        return await this.userRepository.findOne({
            select: {id: true, name: true, email: true, status: true, auth: true},
            where: {id}
        })
    }

    verifyJwt(token): any {
        try {
           const payload = jwt.verify(token, this.config.jwtSecretKey) as (jwt.JwtPayload | string);
           return payload;
        } catch (err) {
            throw new UnauthorizedException("유효하지 않은 JWT입니다.")
        }
    }
    
}
