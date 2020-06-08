import { Application } from "https://deno.land/x/oak/mod.ts";
import {APP_HOST, APP_PORT} from './config.ts';

const port = 8080;
const server = new Application();
// Logger
server.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

//Test response
server.use((ctx) => {
  ctx.response.body = "Hello World!";
});


console.log(`Servidor escuchando en el puerto ${port}`);
await server.listen(`${APP_HOST}:${APP_PORT}`);
