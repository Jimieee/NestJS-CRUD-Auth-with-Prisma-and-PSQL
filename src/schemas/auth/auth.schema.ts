import { z } from 'zod';

export const LoginSchema = z.object({
    username: z.string()
        .min(5, {
            message: 'PLEASE PUT 5 WORDS IN THE USERNAME'
        })
        .max(250, {
            message: 'PLEASE PUT 250 WORDS IN THE USERNAME'
        }),
    password: z.string()
        .min(6, {
            message: 'PLEASE PUT 6 WORDS IN THE PASSWORD'
        })
        .max(250, {
            message: 'PLEASE PUT 250 WORDS IN THE PASSWORD'
        }),
});

export const RegisterSchema = z.object({
    username: z.string()
        .min(5, {
            message: 'PLEASE PUT 5 WORDS IN THE USERNAME'
        })
        .max(50, {
            message: 'PLEASE PUT 50 WORDS IN THE USERNAME'
        }),
    password: z.string()
        .min(6, {
            message: 'PLEASE PUT 6 WORDS IN THE PASSWORD'
        })
        .max(250, {
            message: 'PLEASE PUT 250 WORDS IN THE PASSWORD'
        }),
    email: z.string()
        .min(5, {
            message: 'PLEASE PUT 5 WORDS IN THE EMAIL'
        })
        .max(255, {
            message: 'PLEASE PUT 255 WORDS IN THE EMAIL'
        }),
    name: z.string()
        .min(5, {
            message: 'PLEASE PUT 5 WORDS IN THE NAME'
        })
        .max(255, {
            message: 'PLEASE PUT 255 WORDS IN THE NAME'
        }),
});