import axios from "axios";

export default class SkillService {
  update(skill) {
    console.log(skill);
    return axios.post("http://localhost:8081/api/skills/update", skill);
  }
}
