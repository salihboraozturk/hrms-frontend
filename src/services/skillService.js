import axios from "axios";

export default class SkillService {
  update(skill) {
    return axios.post("http://localhost:8081/api/skills/update", skill);
  }
  add(skill) {
    console.log(skill);
    return axios.post("http://localhost:8081/api/skills/add", skill);
  }
  deleteById(skillId) {
    return axios.delete(
      "http://localhost:8081/api/skills/deletebyid?skillId=" + skillId
    );
  }
}
