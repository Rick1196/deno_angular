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


  getById: async({ request, response, params }: {
    request: any;
    response: any;
    params: { id: string };
  })=>{
    response.status = 200;
    response.body = await personsService.getById(params.id);
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
    try {
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
    } catch (err) {
      throw new Error(err);
    }
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
    if (!request.hasBody) {
      response.status = 400;
      response.body = {
        success: false,
        message: "Data provided",
      };
      return;
    }
    let updated = await personsService.update(body.value,id);
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
};
