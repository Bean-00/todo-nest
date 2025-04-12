import { Transform } from "class-transformer";
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export const userRole = {"SYSADMIN": 0, "ADMIN": 2, "USER": 4} as const;

type UserRoleKeyType = keyof typeof userRole;
type UserRoleValueType = (typeof userRole) [UserRoleKeyType];

export const userStatus = {
    "ACTIVATE": 0,
    "DEACTIVATE": 1
} as const;

type UserStatusKeyType = keyof typeof userStatus;
type UserStatusValueType = (typeof userStatus) [UserStatusKeyType];

export class UserDomain {
    id?: number;
    email: string;
    name: string;
    password?: string;
    role?: UserRoleKeyType;
    status?: UserStatusKeyType;
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
