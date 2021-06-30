import axios from "axios";

export default class JobExperienceService {
  update(jobExperience) {
    console.log(jobExperience);
    return axios.post(
      "http://localhost:8081/api/jobexperiences/update",
      jobExperience
    );
  }
}
