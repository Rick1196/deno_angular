import User from "../interfaces/user.interface.ts";//importamos User Interface
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";//libreria para cifrar el password
import db from "../mongo.ts";
import {
  makeJwt,
  setExpiration,
  Jose,
  Payload,
} from "https://deno.land/x/djwt/create.ts";//libreria para JSON web token
import { SECRET as key } from "../config.ts";//obtenemos la clave secreta para generar JWT
const userCollection = db.collection("users");
const salt = await bcrypt.genSalt(8);//generamos un salt para cifrar o descifrar el password del usuario
const header: Jose = {
  alg: "HS256",
  typ: "JWT",
};

export default {
    /*
  *return id:string
  *input:user:any
  */
  signup: async (user: any) => {
    let hash = await bcrypt.hash(user.password, salt);//encriptamos el password del usuario
    const doc: User = {
      username: user.username,
      password: hash,
    };
    return await userCollection.insertOne(doc);
  },
  /*
  *return token:string
  *input: user:any
  */
  login: async (user: any) => {
    const doc = await userCollection.findOne({ username: user.username });//obtenemos el usuario mediante su nombre
    const result = await bcrypt.compare(user.password, doc.password);//comparamos el password recibido con el password guardado
    if (result) {
      const payload: Payload = {
        iss: user.username,
        exp: setExpiration(new Date().getTime() + 6000000),
      };
      const jwt = makeJwt({ key, header, payload });//obtenemos el JWT
      console.log(jwt);

      if (jwt) {
        return {
          token: jwt
        };
      } else {
        return null;
      }
    }
  },

  isRegistered: async(username:String)=>{
    const doc = await userCollection.findOne({ username: username });//obtenemos el usuario mediante su nombre
    return doc;
  }
};
