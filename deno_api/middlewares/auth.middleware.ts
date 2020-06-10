import { Context } from "https://deno.land/x/oak/mod.ts";
import { validateJwt } from "https://deno.land/x/djwt/validate.ts";
import { SECRET as key } from "../config.ts";//importamos el secret key del archivo de configuracion

const authMiddleware = async (ctx: Context, next: any) => {
  const headers: Headers = ctx.request.headers;
  //tomamos el JWT del Header de autorizacion y los comparamos, si valido continuamos
  // de otro modo regresamo un status 401 unauthorized
  const authorization = headers.get("Authorization");
  if (!authorization) {
    ctx.response.status = 401;
    return;
  }
  const jwt = authorization.split(" ")[1];
  if (!jwt) {
    ctx.response.status = 401;
    return;
  }
  if (await validateJwt(jwt, key, { isThrowing: false })) {
    await next();
    return;
  }

  ctx.response.status = 401;
  ctx.response.body = { message: "Invalid jwt token" };
};

export default authMiddleware;
