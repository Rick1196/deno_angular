import User from "../interfaces/user.interface.ts";
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import db from "../mongo.ts";
import {
  makeJwt,
  setExpiration,
  Jose,
  Payload,
} from "https://deno.land/x/djwt/create.ts";
import { SECRET as key } from "../config.ts";
const userCollection = db.collection("users");
const salt = await bcrypt.genSalt(8);
const header: Jose = {
  alg: "HS256",
  typ: "JWT",
};

export default {
  signup: async (user: any) => {
    let hash = await bcrypt.hash(user.password, salt);
    const doc: User = {
      username: user.username,
      password: hash,
    };
    console.log(doc.username);
    return await userCollection.insertOne(doc);
  },

  login: async (user: any) => {
    const doc = await userCollection.findOne({ username: user.username });
    const result = await bcrypt.compare(user.password, doc.password);
    if (result) {
      const payload: Payload = {
        iss: user.username,
        exp: setExpiration(new Date().getTime() + 60000),
      };
      const jwt = makeJwt({ key, header, payload });
      console.log(jwt);
      
      if (jwt) {
        return {
          token: jwt,
        };
      } else {
        return null;
      }
    }
  },
};
