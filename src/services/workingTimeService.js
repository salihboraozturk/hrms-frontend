import axios from "axios";

export default class WorkingTimeService {
  getWorkingTime() {
    return axios.get("http://localhost:8081/api/workingtimes/getall");
  }
}
