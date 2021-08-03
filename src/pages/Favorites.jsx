import { React, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Card,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Segment,
} from "semantic-ui-react";
import FavoriteAdsService from "../services/favoriteAdsService";
import JobPostingService from "../services/jobPostingService";

export default function Favorites() {
  const [jobPostings, setJobPosting] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [render, setRender] = useState(false);
  useEffect(() => {
    let favoriteService = new FavoriteAdsService();

    favoriteService.getFavoritesByCandidateId(3).then((result) => {
      setFavorites(result.data.data);
    });
    getFavorites(favorites);
  }, [favorites]);
  function getFavorites(favorites) {
    let jobPostingService = new JobPostingService();
    for (let index = 0; index < favorites.length; index++) {
      jobPostingService
        .getById(favorites[index].jobPostingId)
        .then((result) => {
          jobPostings[index] = result.data.data;
        });
    }
  }
  function rendering() {
    if (render === true) {
      setRender(false);
    } else {
      setRender(true);
    }
  }
  function handleChangeFavoriteStatus(candidateId, jobPostingId) {
    let favoriteService = new FavoriteAdsService();
    favoriteService.changejobpostingfavoritestatus(candidateId, jobPostingId);
  }
  return (
    <div>
      <Container style={{ marginTop: "1em" }}>
        <Grid>
          <Grid.Column>
            <Segment>
              <Header as="h2" floated="left">
                <Icon name="heart" color="red" />
                Favori İlanlarım
              </Header>

              <Divider clearing />
              {jobPostings.map((jobPosting) => (
                <Card
                  className="shadow cardjp"
                  style={{ backgroundColor: "#F7F5F4", width: "100%" }}
                  key={jobPosting.id}
                >
                  <Card.Content
                    as={NavLink}
                    to={`/jobposting/${jobPosting.id}`}
                    className="cardContent"
                  >
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
                      <div
                        as={NavLink}
                        to={`/jobposting/${jobPosting.id}`}
                        className="workingTime"
                      >
                        <Icon disabled name="time" />
                        {jobPosting.workingTime.workingTimeName}
                      </div>
                      <div className="like">
                        <Icon
                          color="red"
                          name="like"
                          onClick={() =>
                            handleChangeFavoriteStatus(3, jobPosting.id)
                          }
                        />
                      </div>
                      <div
                        as={NavLink}
                        to={`/jobposting/${jobPosting.id}`}
                        className="city"
                      >
                        <Icon disabled name="map marker" />
                        {jobPosting.city.cityName}
                      </div>
                    </div>
                  </Card.Content>
                </Card>
              ))}
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}
