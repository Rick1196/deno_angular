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