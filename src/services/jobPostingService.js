import axios from "axios";

export default class JobPostingService {
  getJobPosting() {
    return axios.get("http://localhost:8081/api/jobposting/getall");
  }
  addJobPosting(values) {
    values.employer = {id:values.employerId}
    values.jobPosition = {positionId:values.jobPositionId}
    values.city = {id: values.cityId}
    values.jobType = {id: values.jobTypeId}
    values.workingTime = {id: values.workingTimeId}
    values.listingDate="2015-06-06"
    return axios.post("http://localhost:8081/api/jobposting/add",values);
  }
}