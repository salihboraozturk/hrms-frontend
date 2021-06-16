import axios from "axios";

export default class CityService {
  getJobType() {
    return axios.get("http://localhost:8081/api/jobtypes/getall");
  }
}
