import authService from "../services/auth.service.ts";
export default {
  signup: async ( { request, response }: {
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
    response.body = await authService.signup(data.value);
    return;
  },

  login: async ({ request, response }: {
    request: any;
    response: any;
  }) => {
    let body = await request.body();
    if (!request.hasBody) {
      response.status = 400;
      response.body = {
        success: false,
        message: "No data provided",
      };
      return;
    }
    const auth = await authService.login(body.value);
    if (!auth) {
      response.status = 401;
      response.body = {
        success: false,
        message: "Bad credentials",
      };
      return;
    }
    response.status = 200;
    response.body = auth;
    return;
  },
};
