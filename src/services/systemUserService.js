import axios from "axios";

export default class SystemUserService {
  getSystemUsers() {
    return axios.get("http://localhost:8081/api/systemuser/getall");
  }

  async getSystemUserById(id) {
    return await axios.get("http://localhost:8081/api/systemuser/getbyid?id=" + id);
  }

  deleteById(id) {
    return axios.delete(
      "http://localhost:8081/api/systemuser/deletebyid?id=" + id
    );
  }
  add(systemUser) {
    return axios.post("http://localhost:8081/api/systemuser/add", systemUser);
  }
  update(systemUser) {
    return axios.put("http://localhost:8081/api/systemuser/update", systemUser);
  }
}
