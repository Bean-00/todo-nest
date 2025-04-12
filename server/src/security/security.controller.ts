import { Body, Controller, HttpCode, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { UserRequest } from './dto/user.dto';
import { UserDomain } from './dto/user.dto';
import { SecurityService } from './security.service';

@Controller('/api/security')
export class SecurityController {
    constructor(private readonly securityService: SecurityService) {

    }

    @Post('/join/user')
    async joinUser(@Body(ValidationPipe) dto: UserRequest): Promise<void> {
        const {name, email, password} = dto;

        await this.securityService.joinUserByEmail({
            name,
            email,
            password
        });
    }

    @HttpCode(200)
    @Post('/email/reset-password')
    async sendPasswordResetEmail(@Body('email') email: string): Promise<void> {
            await this.securityService.sendPasswordResetEmail(email);
    }
    
}
