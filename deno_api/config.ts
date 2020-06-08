import "https://deno.land/x/dotenv/load.ts";


export const APP_HOST = Deno.env.get('APP_HOST') || "127.0.0.1";
export const APP_PORT = Deno.env.get('APP_PORT') || 8080;
export const DB_URL = Deno.env.get('DB_HOST_URL');
export const DB_NAME = Deno.env.get('DB_NAME')