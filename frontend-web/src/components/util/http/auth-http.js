import { httpTsApi } from '.';

class AuthResource {
  constructor(http, resource) {
    this.http = httpTsApi;
    this.resource = resource;
  }

  login(login, senha) {
    const data = {
      login: login,
      senha: senha,
    };
    const ret = this.http.post(this.resource, data);
    return ret;
  }
}

const authHttp = new AuthResource(httpTsApi, 'entrar');

export default authHttp;
