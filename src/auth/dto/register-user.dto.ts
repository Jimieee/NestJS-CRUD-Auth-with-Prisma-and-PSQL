import { IsString, Length } from "class-validator";


export class RegisterUserDto{
    @IsString()
    @Length(5, 50)
    username: string;

    @IsString()
    @Length(6, 250)
    password: string;

    @IsString()
    @Length(5, 250)
    email: string;

    @IsString()
    @Length(5, 250)
    name: string;
}