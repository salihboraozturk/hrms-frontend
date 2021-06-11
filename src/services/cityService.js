import axios from "axios";

export default class CityService {
  getCities() {
    return axios.get("http://localhost:8081/api/cities/getall");
  }
}
