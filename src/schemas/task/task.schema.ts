import { z } from 'zod';

export const TaskSchema = z.object({
    title: z.string()
        .min(3, {
            message: 'PLEASE PUT 3 WORDS IN THE TITLE'
        })
        .max(255, {
            message: 'PLEASE PUT 255 WORDS IN THE TITLE'
        }),
    description: z.string()
        .min(3, {
            message: 'PLEASE PUT 3 WORDS IN THE DESCRIPTION'
        })
        .max(255, {
            message: 'PLEASE PUT 255 WORDS IN THE DESCRIPTION'
        }),
});

export const PutTaskSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
});

export const IdParamSchema = z.string().regex(/^\d+$/, { message: 'Invalid ID' });
