import axios from "axios";

export default class JobExperienceService {
  update(jobExperience) {
    console.log(jobExperience);
    return axios.post(
      "http://localhost:8081/api/jobexperiences/update",
      jobExperience
    );
  }
  add(jobExperience) {
    return axios.post(
      "http://localhost:8081/api/jobexperiences/add",
      jobExperience
    );
  }
  deleteById(jobExperience) {
    return axios.delete(
      "http://localhost:8081/api/jobexperiences/deletebyid?jobExperienceId=" + jobExperience
    );
  }
}
