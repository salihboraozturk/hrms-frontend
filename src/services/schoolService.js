import axios from "axios";

export default class SchoolService {
  update(school) {
      console.log(school)
    return axios.post("http://localhost:8081/api/schools/update", school);
  }
}
