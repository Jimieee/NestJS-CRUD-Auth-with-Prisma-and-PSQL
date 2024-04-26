import { Body, ConflictException, Controller, Post, Req, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request, Response } from "express";
import { LoginDto } from "./dto/login-user.dto";
import { RegisterUserDto } from "./dto/register-user.dto";
import { LoginSchema, RegisterSchema } from "src/schemas/auth/auth.schema";


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/login')
    async login(@Req() request: Request, @Res() response: Response, @Body() loginDto: LoginDto): Promise<any> {
        try {
            LoginSchema.parse(loginDto);

            const user = await this.authService.Login(loginDto);
            return response.status(200).json({
                status: 'OK!',
                message: 'User logged in successfully',
                result: user
            });
        } catch (error) {
            let errorMessages = [];

            if (error.errors && error.errors.length > 0) {
                errorMessages = error.errors.map((err: any) => {
                    return {
                        field: err.path.join('.'),
                        message: err.message
                    };
                });
            }

            return response.status(500).json({
                status: 'Error',
                message: errorMessages.length > 0 ? errorMessages : "Internal Server Error"
            });
        }
    }

    @Post('/register')
    async register(@Req() request: Request, @Res() response: Response, @Body() registerDto: RegisterUserDto): Promise<any> {
        try {
            RegisterSchema.parse(registerDto);

            const user = await this.authService.Register(registerDto);
            return response.status(200).json({
                status: 'OK!',
                message: 'User registered successfully',
                result: user
            });
        } catch (error) {
            let errorMessages = [];

            if (error.errors && error.errors.length > 0) {
                errorMessages = error.errors.map((err: any) => {
                    return {
                        field: err.path.join('.'),
                        message: err.message
                    };
                });
            }

            if (error instanceof ConflictException) {
                return response.status(409).json({
                    status: 'Error',
                    message: error.message
                });
            } else {
                return response.status(500).json({
                    status: 'Error',
                    message: errorMessages.length > 0 ? errorMessages : "Internal Server Error"
                });
            }
        }
    }
}