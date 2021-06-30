import axios from "axios";

export default class EmployerService {
  getEmployers() {
    return axios.get("http://localhost:8081/api/employers/getall");
  }
  getEmployerById(employerId) {
    return axios.get(
      "http://localhost:8081/api/employers/getbyid?employerId=" + employerId
    );
  }

  update(employer) {
    return axios.post("http://localhost:8081/api/employers/update", employer);
  }
}
