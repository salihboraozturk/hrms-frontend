import axios from "axios";

export default class FavoriteAdsService {
  getFavoritesByCandidateId(candidateId) {
    return axios.get(
      "http://localhost:8081/api/favoriteads/getFavoritesByCandidateId?candidateId=" +
        candidateId
    );
  }

  changejobpostingfavoritestatus(candidateId, jobPostingId) {
    return axios.post(
      `http://localhost:8081/api/favoriteads/changejobpostingfavoritestatus?candidateId=${candidateId}&jobPostingId=${jobPostingId}`
    );
  }
}
