import axios from "axios";

export default class JobPostingService {
  getJobPosting() {
    return axios.get("http://localhost:8081/api/jobposting/getall");
  }

  getByCityIdAndWorkingTimeId(cityId, workingTimeId) {
    return axios.get(
      `http://localhost:8081/api/jobposting/getbycityidandworkingtimeid?cityId=${cityId}&workingTimeId=${workingTimeId}`
    );
  }

  getByCityId(cityId) {
    return axios.get(
      `http://localhost:8081/api/jobposting/getbycityid?cityId=${cityId}`
    );
  }

  getByWorkingTimeId(workingTimeId) {
    return axios.get(
      `http://localhost:8081/api/jobposting/getbyworkingtimeid?workingTimeId=${workingTimeId}`
    );
  }
  getByPage(pageNo, pageSize) {
    return axios.get(
      `http://localhost:8081/api/jobposting/getallbypage?pageNo=${pageNo}&pageSize=${pageSize}`
    );
  }

  addJobPosting(values) {
    values.employer = { id: values.employerId };
    values.jobPosition = { positionId: values.jobPositionId };
    values.city = { id: values.cityId };
    values.jobType = { id: values.jobTypeId };
    values.workingTime = { id: values.workingTimeId };
    values.listingDate = "2015-06-06";
    return axios.post("http://localhost:8081/api/jobposting/add", values);
  }
}
