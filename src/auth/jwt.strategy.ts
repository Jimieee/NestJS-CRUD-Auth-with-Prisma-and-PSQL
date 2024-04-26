import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";

/**
 * JWT Strategy class for authentication using JSON Web Tokens.
 */
@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
    /**
     * Creates an instance of JWTStrategy.
     * @param prismaService - The Prisma service for interacting with the database.
     */
    constructor(private readonly prismaService: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    /**
     * Validates the JWT payload and returns the user.
     * @param payload - The JWT payload containing the username.
     * @returns The user object.
     */
    async validate(payload: { username: string }) {
        const users = await this.prismaService.user.findUnique({
            where: { 
                username: payload.username 
            },
        });
        return users;
    }
}