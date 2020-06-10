import db from "../mongo.ts";
import Person from "../interfaces/person.interface.ts";
const personsCollection = db.collection("persons");

export default {
  getAllPersons: async () => {
    return await personsCollection.find({ baja: false }) as Person[];
  },

  getById: async(id:any)=>{
    const doc = await personsCollection.findOne({ _id: { "$oid": id } });
    return doc;
  },

  create: async (person: any) => {
    const doc: Person = {
      nombre: person.nombre,
      edad: person.edad,
      sexo: person.sexo,
      codigo: person.codigo,
      fechaAlta: new Date(),
      baja: false,
    };
    const id = await personsCollection.insertOne(doc);
    return id;
  },

  delete: async (id: any) => {
    try {
      const doc = await personsCollection.findOne({ _id: { "$oid": id } });
      if (!doc) throw new Error("Person not found");
      doc.baja = true;
      doc.fechaBaja = new Date();
      return await personsCollection.updateOne(
        { _id: { "$oid": id } },
        { $set: doc },
      );
    } catch (err) {
      throw new Error(err).message;
    }
  },

  update: async (body: any, id: any) => {
    const doc = await personsCollection.findOne({ _id: { "$oid": id } });
    if (!doc) throw new Error("Person not found");
    doc.nombre = body.nombre;
    doc.edad = body.edad;
    doc.codigo = body.codigo;
    doc.sexo = body.sexo;
    return await personsCollection.updateOne(
      { _id: { "$oid": id } },
      { $set: doc },
    );
  },

};
