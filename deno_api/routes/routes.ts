import { Router } from "https://deno.land/x/oak/mod.ts";
import personsController from '../controllers/persons.controller.ts';
import authController from '../controllers/auth.controller.ts';
import authMiddleware from '../middlewares/auth.middleware.ts';
const router = new Router();

router
    .get("/persons",personsController.getAllPersons)
    .get("/persons/:id",personsController.getById)
    .post("/persons", personsController.createPerson)
    .delete("/persons/:id",personsController.deletePerson)
    .put("/persons/:id", personsController.updatePerson)
    .post("/auth/login",authController.login)
    .post("/auth/signup",authController.signup);

export default router;
