import React, { useEffect, useState } from "react";
import {
  Card,
  Icon,
  Image,
  Container,
  Grid,
  Pagination,
} from "semantic-ui-react";
import JobPostingFilter from "./JobPostingFilter";
import JobPostingService from "../services/jobPostingService";
import FavoriteAdsService from "../services/favoriteAdsService";
import { useHistory, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
export default function JobPosting() {
  const [jobPostings, setjobPostings] = useState([]);
  const [jobPostingCount, setjobPostingCount] = useState([]);
  const [favoriteAds, setfavoriteAds] = useState([]);
  const history = useHistory();
  const [render, setRender] = useState(false);
  let { cityId, workingTimeId, pageNo, pageSize } = useParams();
  useEffect(() => {
    let jobPostingService = new JobPostingService();
    let favoriteAdsService = new FavoriteAdsService();
    if (cityId && workingTimeId) {
      jobPostingService
        .getByCityIdAndWorkingTimeId(cityId, workingTimeId)
        .then((result) => setjobPostings(result.data.data));
    } else if (cityId) {
      jobPostingService
        .getByCityId(cityId)
        .then((result) => setjobPostings(result.data.data));
    } else if (workingTimeId) {
      jobPostingService
        .getByWorkingTimeId(workingTimeId)
        .then((result) => setjobPostings(result.data.data));
    } else if ((pageNo, pageSize)) {
      jobPostingService
        .getByPage(pageNo, pageSize)
        .then((result) => setjobPostings(result.data.data));
    } else {
      jobPostingService
        .getJobPosting()
        .then((result) => setjobPostings(result.data.data));
    }
    jobPostingService
      .getJobPosting()
      .then((result) => setjobPostingCount(result.data.data));
    favoriteAdsService
      .getFavoritesByCandidateId(3)
      .then((result) => setfavoriteAds(result.data.data));
  }, [render]);

  function rendering() {
    if (render === true) {
      setRender(false);
    } else {
      setRender(true);
    }
  }
  function handlePagination(pageNo) {
    history.push(
      `/jobposting/getallbypage/pageNo/${pageNo}/pageSize/${pageSize}`
    );
    rendering();
  }
  function handleChangeFavoriteStatus(candidateId, jobPostingId) {
    let favoriteAdsService = new FavoriteAdsService();
    favoriteAdsService.changejobpostingfavoritestatus(
      candidateId,
      jobPostingId
    );
    rendering();
  }
  function checkFavouritePosting(jobPostingId) {
    var bool = false;
    for (let i = 0; i < favoriteAds.length; i++) {
      if (favoriteAds[i].jobPostingId === jobPostingId) {
        return true;
      } else {
        bool = false;
      }
    }
    return bool;
  }
  return (
    <div style={{ paddingTop: "20px" }}>
      <Container>
        <Grid columns={3}>
          <Grid.Column
            className="sidebar"
            width={3}
            style={{
              paddingLeft: "0px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <JobPostingFilter></JobPostingFilter>
          </Grid.Column>
          <Grid.Column
            className="main-content"
            width={10}
            style={{ paddingRight: "0px" }}
          >
            {jobPostings.map((jobPosting) => (
              <Card
                as={NavLink}
                to={`/jobposting/${jobPosting.id}`}
                className="shadow cardjp"
                style={{ backgroundColor: "#F7F5F4", width: "100%" }}
                key={jobPosting.id}
              >
                <Card.Content className="cardContent">
                  <Image
                    floated="right"
                    style={{ height: "70px", width: "auto" }}
                    src={jobPosting.employer.companyLogo}
                  />
                  <Card.Header className="cardHeader">
                    {jobPosting.jobPosition.positionName}
                  </Card.Header>
                  <Card.Meta className="company">
                    {jobPosting.employer.companyName}
                  </Card.Meta>
                </Card.Content>
                <Card.Content extra>
                  <div className="cardFooter">
                    <div className="workingTime">
                      <Icon disabled name="time" />
                      {jobPosting.workingTime.workingTimeName}
                    </div>
                    <div className="like">
                      {checkFavouritePosting(jobPosting.id) === true ? (
                        <Icon
                          color="red"
                          name="like"
                          onClick={() =>
                            handleChangeFavoriteStatus(3, jobPosting.id)
                          }
                        />
                      ) : (
                        <Icon
                          name="like"
                          onClick={() =>
                            handleChangeFavoriteStatus(3, jobPosting.id)
                          }
                        />
                      )}
                    </div>
                    <div className="city">
                      <Icon disabled name="map marker" />
                      {jobPosting.city.cityName}
                    </div>
                  </div>
                </Card.Content>
              </Card>
            ))}

            <Pagination
              id="pag"
              defaultActivePage={pageNo}
              pointing
              secondary
              totalPages={jobPostingCount.length / pageSize}
              onPageChange={(event, data) => handlePagination(data.activePage)}
            />
          </Grid.Column>
          <Grid.Column width={3} className="profilebar">
            <Card>
              <Image
                src="https://blog.ramazansancar.com.tr/wp-content/uploads/2019/08/840fc919c6e970bf8ba3cb6fbd822d0c1041cc8b.png"
                wrapped
                ui={false}
              />
              <Card.Content>
                <Card.Header>Daniel</Card.Header>
                <Card.Meta>Joined in 2016</Card.Meta>
                <Card.Description>
                  Daniel is a comedian living in Nashville.
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon name="user" />
                  10 Friends
                </a>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}
