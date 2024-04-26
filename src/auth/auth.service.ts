import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { UsersService } from "src/users/users.service";
import { LoginDto } from "./dto/login-user.dto";
import * as bcrypt from 'bcryptjs';
import { RegisterUserDto } from "./dto/register-user.dto";
import { Users } from "src/users/users.model";


@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private jwtService: JwtService,
        private readonly usersService: UsersService) { }

    async Login(login: LoginDto): Promise<any> {
        const { username, password } = login;

        const user = await this.prismaService.user.findUnique({
            where: {
                username
            }
        });

        if (!user) {
            return { message: 'User not found' };
        }

        const validatePassword = await bcrypt.compare(password, user.password);

        if (!validatePassword) {
            return { message: 'Invalid Password' };
        }

        return {
            token: this.jwtService.sign({ username: user.username }),
        }
    }

    async Register(createDto: RegisterUserDto): Promise<any> {
        const createUser = new Users();
        createUser.name = createDto.name;
        createUser.email = createDto.email;
        createUser.username = createDto.username;
        createUser.password = await bcrypt.hash(createDto.password, 10);

        const user = await this.usersService.createUser(createUser);

        return {
            token: this.jwtService.sign({ username: user.username }),
        };
    }
}