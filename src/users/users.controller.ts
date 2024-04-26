import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Request, Response } from 'express'
import { JwtAuthGuard } from "src/auth/auth.guard";

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get()
    // Use the JwtAuthGuard to protect specific routes in this controller
    @UseGuards(JwtAuthGuard)
    async getAllUsers(@Req() request: Request, @Res() response: Response): Promise<any> {
        try {
            const result = await this.usersService.getAllUser();
            return response.status(200).json({
                status: 'Ok!',
                message: 'Successfully fetch data!',
                result: result
            })
        } catch (err) {
            return response.status(500).json({
                status: 'Ok!',
                message: 'Internal Server Error!'
            })
        }
    }
}