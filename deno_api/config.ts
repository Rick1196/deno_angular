import "https://deno.land/x/dotenv/load.ts";


//desde el archivo .env import los valores para:
export const APP_HOST = Deno.env.get('APP_HOST') || "127.0.0.1";
export const APP_PORT = Deno.env.get('APP_PORT') || 3000;
export const DB_URL = Deno.env.get('DB_HOST_URL') || "mongodb+srv://dbAdmin:PEPEPECASPICAPAPAS@cluster0-zzuli.gcp.mongodb.net/test?retryWrites=true&w=majority";
export const DB_NAME = Deno.env.get('DB_NAME') || "deno_api";
export const SECRET = Deno.env.get('SECRET') || "PEPEPECASPICAPAPAS";