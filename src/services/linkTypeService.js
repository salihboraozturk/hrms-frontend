import axios from "axios";

export default class LinkTypeService {
  getLinkType() {
    return axios.get("http://localhost:8081/api/linktypes/getall");
  }
}