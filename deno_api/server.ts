import { Application } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

import { APP_HOST as hostname, APP_PORT as port } from "./config.ts";//importar las configuraciones
import router from "./routes/routes.ts";//rutas de los controlladores
const server = new Application();
const secure = true;
// Logger
server.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

server.use(oakCors());//permitir peticiones desde cualquier origen, post,put,delete,get
server.use(router.routes());//declarae el suo de las rutas de los controlladores
server.use(router.allowedMethods());//permitir cualquier tipo de peticion put, post ,...

server.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(
    `--- Escuchando en: ${secure ? "https://" : "http://"}${hostname ??
      "localhost"}:${port}`,
  );
});
await server.listen(`${hostname}:${port}`);
