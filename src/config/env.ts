import dotenv from 'dotenv';

dotenv.config()

interface EnvConfig {
    PORT: string,
    DB_URL: string,
    ACCESS_TOKEN_SECRET:string,
}

const loadEnvVariables = (): EnvConfig => {
    const requiredEnvVariables: string[] = ["PORT", "DB_URL"]

    requiredEnvVariables.forEach(key => {
        if (!process.env[key]) {
            throw new Error(`Missing require environment variable ${key}`)
        }
    })


    return {
        PORT: process.env.PORT as string,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        DB_URL: process.env.DB_URL!,
        ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET as string,
    }
}

export const envVars: EnvConfig = loadEnvVariables()