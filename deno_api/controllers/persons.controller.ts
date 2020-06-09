import personsService from "../services/person.service.ts";

export default {
  /**
   * response: Arreglo de Personas
   * request, params: void
   */
  getAllPersons: async ({ request, response, params }: {
    request: any;
    response: any;
    params: { id: string };
  }) => {
    response.status = 200;
    response.body = await personsService.getAllPersons();
    return response;
  },

  getById: async ({ request, response, params }: {
    request: any;
    response: any;
    params: { id: string };
  }) => {
    const person = await personsService.getById(params.id);
    if (!person) {
      response.status = 404;
      response.body = {
        success: false,
        message: "Person not found",
      };
    }
    response.status = 200;
    response.body = person;
    return;
  },

  createPerson: async ({ request, response }: {
    request: any;
    response: any;
  }) => {
    let data = await request.body();
    if (!request.hasBody) {
      response.status = 400;
      response.body = {
        success: false,
        message: "No data provided",
      };
      return;
    }
    response.status = 201;
    response.body = await personsService.create(data.value);
    return;
  },

  deletePerson: async (
    { request, response, params }: {
      request: any;
      response: any;
      params: { id: string };
    },
  ) => {
    let id = params.id;
    let updated = await personsService.delete(id);
    if (!updated) {
      response.status = 400;
      response.body = {
        success: false,
        message: "Person not found",
      };
      return;
    }
    response.status = 200;
    response.body = {
      success: true,
    };
    return;
  },

  updatePerson: async (
    { request, response, params }: {
      request: any;
      response: any;
      params: { id: string };
    },
  ) => {
    let id = params.id;
    let body = await request.body();
    let exist = await personExist(id);
    if (!request.hasBody) {
      response.status = 400;
      response.body = {
        success: false,
        message: "Data provided",
      };
      return;
    }
    if (exist != true) {
      response.status = 404;
      response.body = exist;
      return;
    }
    let updated = await personsService.update(body.value, id);
    response.status = 200;
    response.body = {
      success: true,
    };
    return;
  },

  generateCode: (
    { request, response }: {
      request: any;
      response: any;
    },
  ) => {
    response.status = 200;
    response.body = personsService.generateCode();
    return;
  },
};

const personExist = async (id) => {
  const person = await personsService.getById(id);
  if (!person) {
    return { success: false, message: "Person not found" };
  } else return true;
};
