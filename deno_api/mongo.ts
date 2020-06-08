import { MongoClient } from "https://deno.land/x/mongo@v0.8.0/mod.ts";
import {DB_NAME, DB_HOST_URL} from './config.ts'
const client = new MongoClient();
client.connectWithUrl(DB_HOST_URL)
const db = client.database(DB_NAME);
export default db;