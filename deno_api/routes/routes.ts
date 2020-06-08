import { Router } from "https://deno.land/x/oak/mod.ts";
import personsController from '../controllers/persons.controller.ts'
const router = new Router();

router
    .get("/persons", personsController.getAllPersons)
    .post("/persons", personsController.createPerson)
    .delete("/persons/:id",personsController.deletePerson)
    .put("/persons/:id", personsController.updatePerson);

export default router;
