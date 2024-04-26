import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { TaskService } from "./task.service";
import { task } from "@prisma/client";
import { IdParamSchema, PutTaskSchema, TaskSchema } from "src/schemas/task/task.schema";
import { JwtAuthGuard } from "src/auth/auth.guard";

@Controller('tasks')
// Use the JwtAuthGuard to protect all routes in this controller
@UseGuards(JwtAuthGuard)
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @Get()
    async getAllTasks() {
        return this.taskService.getAllTasks();
    }

    @Post()
    async createTask(@Body() data: task) {
        try {
            TaskSchema.parse(data);

            return this.taskService.createTask(data);
        } catch (error) {
            const errorMessages = error.errors.map((err: any) => err.message);

            throw new BadRequestException(errorMessages);
        }
    }

    @Get(':id')
    async getTaskById(@Param('id') id: string) {
        try {
            IdParamSchema.parse(id);

            const idNumber = parseInt(id, 10);

            const taskFound = await this.taskService.getTaskById(idNumber);

            if (!taskFound) {
                throw new BadRequestException('Task not found');
            }

            return taskFound;
        } catch (error) {
            const errorMessages = error.errors.map((err: any) => err.message);

            throw new BadRequestException(errorMessages);
        }
    }

    @Delete(':id')
    async deleteTask(@Param('id') id: string) {
        try {
            IdParamSchema.parse(id);

            const idNumber = parseInt(id, 10);

            const deleteResult = await this.taskService.deleteTask(idNumber);

            if (!deleteResult) {
                throw new BadRequestException('Task not found');
            }

            return deleteResult;
        } catch (error) {
            const errorMessages = error.errors.map((err: any) => err.message);

            throw new BadRequestException(errorMessages);
        }
    }

    @Put(':id')
    async updateTask(@Param('id') id: string, @Body() data: task) {
        try {
            IdParamSchema.parse(id);

            PutTaskSchema.parse(data);

            const idNumber = parseInt(id, 10);

            const updatedTask = await this.taskService.updateTask(idNumber, data);

            if (!updatedTask) {
                throw new BadRequestException('Task not found');
            }

            return updatedTask;
        } catch (error) {
            const errorMessages = error.errors.map((err: any) => err.message);

            throw new BadRequestException(errorMessages);
        }
    }
}   