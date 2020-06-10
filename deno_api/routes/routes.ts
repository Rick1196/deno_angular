import { Router } from "https://deno.land/x/oak/mod.ts";
import personsController from "../controllers/persons.controller.ts"; //importar los controladores de Persona
import authController from "../controllers/auth.controller.ts";//importar los controladores de autenticacion
import authMiddleware from "../middlewares/auth.middleware.ts"; //verifica si se recive una cabezera Authentication Bearer con un token valido
const router = new Router();

//para una ruta sin necesidad de autenticacion
//ruta,controlador
//prara una ruta con autenticacion
//ruta,middleware,controldor
//para fines demostrativos todos las ruta son sn autenticacion
router
  .get("/persons", personsController.getAllPersons)
  .get("/persons/:id", personsController.getById)
  .post("/persons", personsController.createPerson)
  .delete("/persons/:id", personsController.deletePerson)
  .put("/persons/:id", personsController.updatePerson)
  .post("/auth/login", authController.login)
  .post("/auth/signup", authController.signup);

export default router;
