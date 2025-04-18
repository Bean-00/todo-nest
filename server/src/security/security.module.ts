import { Module } from '@nestjs/common';
import { SecurityController } from './security.controller';
import { SecurityService } from './security.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { ResetPasswordEmailEntity } from 'src/email/entity/email.entity';
import { EmailModule } from 'src/email/email.module';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, ResetPasswordEmailEntity]), EmailModule],
    controllers: [SecurityController],
    providers: [SecurityService]
})
export class SecurityModule {}
