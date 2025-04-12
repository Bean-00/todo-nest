import { UnauthorizedException } from "@nestjs/common";
import { Transform } from "class-transformer";
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Entity } from "typeorm";

export const userRole = {"SYSADMIN": 0, "ADMIN": 2, "USER": 4} as const;

export type UserRoleKeyType = keyof typeof userRole;
export type UserRoleValueType = (typeof userRole) [UserRoleKeyType];

export const getUserRole =(id: number): UserRoleKeyType => {
    for (let role in userRole) {
        if (userRole[role] === id) {
            return role as UserRoleKeyType;
        }
    }

    throw new UnauthorizedException("잘못된 역할을 가진 계정입니다."); 
}

export const userStatus = {
    "ACTIVATE": 0,
    "DEACTIVATE": 1
} as const;

export const getUserStatus = (id: number): UserStatusKeyType => {
    for (let status in userStatus) {
        if (userStatus[status] === id) {
            return status as UserStatusKeyType;
        }
    }

    throw new UnauthorizedException("잘못된 상태을 가진 계정입니다."); 
}

type UserStatusKeyType = keyof typeof userStatus;
type UserStatusValueType = (typeof userStatus) [UserStatusKeyType];

export class UserDomain {
    id?: number;
    email: string;
    name: string;
    password?: string;
    role: UserRoleKeyType;
    status: UserStatusKeyType;
}

export class UserRequest {
    @Transform(params => params.value.trim())
    @IsString()
    @MinLength(3)
    @MaxLength(10)
    readonly name: string;

    @IsEmail()
    readonly email: string;

    @Matches(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])(?=(?:.*[a-zA-Z]){4})(?=(?:.*[0-9]){3}).{8,}$/, {
        message: '비밀번호는 영문 4자 이상, 숫자 3자 이상, 특수문자 1자 이상을 포함해야 합니다.'
    })
    readonly password: string;
}

export class LoginRequest {
    @IsEmail()
    readonly email: string;

    @IsString()
    readonly password: string;
}

export class LoginToken {
    atk: string;
    rtk: string;
}

export class UserResponse {
    id: number;
    email: string;
    name: string;
    role: UserRoleKeyType;
    status: UserStatusKeyType;
    isSysAdmin: boolean;
}