import db from "../mongo.ts";//importamos la conexion a la base de datos
import Person from "../interfaces/person.interface.ts";//importamos Persona Interface
const personsCollection = db.collection("persons");//obtnemos acceso a la coleccion necesaria

export default {
  /*
  *return Person[], solo personas con  campo baja = false
  *input:void
  */
  getAllPersons: async () => {
    return await personsCollection.find({ baja: false }) as Person[];
  },
/*
  *return Person
  *input:id:string
  */
  getById: async(id:any)=>{
    const doc = await personsCollection.findOne({ _id: { "$oid": id } });
    return doc;
  },
  /*
  *return id:string
  *input:person:Person
  */
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

  /*
  *return id:string
  *input:id:string
  *eliminacion logica de una Persona
  */
  delete: async (id: any) => {
    try {
      const doc = await personsCollection.findOne({ _id: { "$oid": id } });//obtenemos la Persona a eliminar
      if (!doc) throw new Error("Person not found");//si el id no existe se lanza una excepcion
      doc.baja = true;//colocamos el campo baja en true
      doc.fechaBaja = new Date();//colocamos la fecha de baja
      return await personsCollection.updateOne(
        { _id: { "$oid": id } },
        { $set: doc },
      );//actualizamos en documento
    } catch (err) {
      throw new Error(err).message;
    }
  },
 /*
  *return id:string
  *input:id:string
  */
  update: async (body: any, id: any) => {
    const doc = await personsCollection.findOne({ _id: { "$oid": id } });//obtenemos la Persona a modificar
    if (!doc) throw new Error("Person not found");//si el id no existe se lanza una excepcion
    //modificacion completa del documento
    doc.nombre = body.nombre;
    doc.edad = body.edad;
    doc.codigo = body.codigo;
    doc.sexo = body.sexo;
    return await personsCollection.updateOne(
      { _id: { "$oid": id } },
      { $set: doc },
    );//actualizamos
  },

};
