import axios from "axios";

export default class CandidateService {
  getCandidates() {
    return axios.get("http://localhost:8081/api/candidates/getall");
  }

  getCVByCandidate(candidateId) {
    return axios.get("http://localhost:8081/api/candidates/getCVByCandidate?candidateId="+candidateId);
  }
  update(candidate){
    return axios.post("http://localhost:8081/api/candidates/update",candidate)
  }
}
