import axios from "axios";

export default class SchoolService {
  update(school) {
      console.log(school)
    return axios.post("http://localhost:8081/api/schools/update", school);
  }
  add(school) {
    console.log(school)
  return axios.post("http://localhost:8081/api/schools/add", school);
}
deleteById(schoolId) {
  return axios.delete(
    "http://localhost:8081/api/schools/deletebyid?schoolId=" + schoolId
  );
}
}
