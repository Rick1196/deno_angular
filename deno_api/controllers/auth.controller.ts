import authService from "../services/auth.service.ts";
export default {
  /**
   * response: id:String
   * request, params: void
   * request, body:User
   */
  signup: async ({ request, response }: {
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
    const exist = await userExist(data.value.username);
    console.log(exist,data.value.username);
    
    if (exist != null) {
      response.status = 406;
      response.body = {
        success: false,
        message: "El nombre de usuario ya existe",
      };
      return;
    }
    response.status = 201;
    response.body = await authService.signup(data.value);
    return;
  },
  /**
   * response: token:String
   * request, params: void
   * request, body:User
   */
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

const userExist = async (username: String) => {
  const user = await authService.isRegistered(username);
  return user;
};
