import axios from "axios";

export default class LanguageService {
  update(language) {
      console.log(language)
    return axios.post("http://localhost:8081/api/languages/update", language);
  }
}
