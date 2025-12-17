import dotenv from "dotenv"

dotenv.config({quiet:true}); //prevent the commiting in terminal i.e --🔐 prevent committing .env to code: https://dotenvx.com/precommit

export const ENV={
    PORT : process.env.PORT,
    DB_URL : process.env.DB_URL,
    NODE_ENV : process.env.NODE_ENV
}