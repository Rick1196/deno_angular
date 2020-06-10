import { Application } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

import { APP_HOST as hostname, APP_PORT as port } from "./config.ts";
import router from "./routes/routes.ts";
const server = new Application();
const secure = true;
// Logger
server.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

server.use(oakCors());
server.use(router.routes());
server.use(router.allowedMethods());

server.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(
    `--- Escuchando en: ${secure ? "https://" : "http://"}${hostname ??
      "localhost"}:${port}`,
  );
});
await server.listen(`${hostname}:${port}`);
