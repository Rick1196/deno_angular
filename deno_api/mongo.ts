import { MongoClient } from "https://deno.land/x/mongo@v0.8.0/mod.ts";
import {DB_NAME, DB_URL} from './config.ts'//importamos la url el nombre de la base de datos desde el archivo de config
const client = new MongoClient();
client.connectWithUri(DB_URL)//nos conectamos al servidor base de datos
const db = client.database(DB_NAME);//nos conectamos a la base de datos
export default db;//exportamos un objecto: DataBase