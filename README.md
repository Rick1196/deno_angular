# deno_angular
## Como instalar deno
### En Linux(Preferentemente) o Mac
`curl -fsSL https://deno.land/x/install/install.sh | sh`
### En windows
`iwr https://deno.land/x/install/install.ps1 -useb | iex`
## Necesito una instancia de MongoDB corriendo localmane?
No, el proyecto utiliza un servicio de MongoAtlas
## Como iniciar el servidor Deno
Utilizar el siguiente comando en la terminal dentro del folder deno_api
`deno run  --allow-net --allow-write --allow-read --allow-plugin --allow-env --unstable server.ts`
## Esta ver la aplicacion de Angular montada en un servidor?
si
en el siguiente link: [AngularView](https://deno-app.firebaseapp.com/)

## El backend funciona correctamente en el servidor?
No, lamentablemente Deno aun no es soportado nativamente por muchos servidores o proveedores de servicios en la nube.
### El problema?
AWS no expone correctamente la IP donde Deno escuhca, por lo tanto las peticiones no llegan correctamente y la respuesta termina siendo Error: connect ETIMEDOUT 18.216.125.212:3001.
### La solicion?
Configurar Deno para escuchar en una direccion de IP correcta para AWS o Dockerizar el proyecto de deno para
solo exponer la IP por defecto de AWS.

## Como inicar el servidor de angular
`ng serve`

## Librerias utilizadas en el servidor Deno
- djwt
- deno_mongo
- Dotenv
- BCrypt
Todas encontradas en la documentacion de [Deno](https://deno.land/)

## Librerias utilizadas en Angular
- [Bulma](https://bulma.io/documentation/)