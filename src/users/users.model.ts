import { Prisma } from "@prisma/client";

export class Users implements Prisma.userCreateInput {
    name: string;
    password: string;
    username: string;
    email: string;
}