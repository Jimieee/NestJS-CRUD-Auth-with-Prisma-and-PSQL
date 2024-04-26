import { Injectable } from "@nestjs/common";
import { task } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class TaskService {
    constructor(private prismaService: PrismaService) {}

    async getAllTasks(): Promise<task[]> {
        return this.prismaService.task.findMany();
    }

    async getTaskById(id: number): Promise<task> {
        return this.prismaService.task.findUnique({
            where: {
                id,
            },
        });
    }

    async createTask(data: task): Promise<task> {
        return this.prismaService.task.create({
            data,
        });
    }

    async updateTask(id: number, data: task): Promise<task> {
        return this.prismaService.task.update({
            where: {
                id,
            },
            data,
        });
    }

    async deleteTask(id: number): Promise<task> {
        return this.prismaService.task.delete({
            where: {
                id,
            },
        });
    }
}   