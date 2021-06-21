import React, { useEffect, useState } from "react";
import {
  Card,
  Icon,
  Image,
  Container,
  Grid,
  Menu,
  Pagination,
} from "semantic-ui-react";
import JobPostingService from "../services/jobPostingService";
export default function JobPosting() {
  const [jobPostings, setjobPostings] = useState([]);
  useEffect(() => {
    let jobPostingService = new JobPostingService();
    jobPostingService
      .getJobPosting()
      .then((result) => setjobPostings(result.data.data));
  }, []);

  return (
    <div style={{ marginTop: "6em" }}>
      <Container>
        <Grid columns={3}>
          <Grid.Column width={3} style={{ paddingLeft: "0px" }}>
            <Menu vertical style={{ backgroundColor: "#F7F5F4" }}>
              <Menu.Item>
                <Menu.Header>Products</Menu.Header>

                <Menu.Menu>
                  <Menu.Item name="enterprise" />
                  <Menu.Item name="consumer" />
                </Menu.Menu>
              </Menu.Item>

              <Menu.Item>
                <Menu.Header>CMS Solutions</Menu.Header>

                <Menu.Menu>
                  <Menu.Item name="rails" />
                  <Menu.Item name="python" />
                  <Menu.Item name="php" />
                </Menu.Menu>
              </Menu.Item>

              <Menu.Item>
                <Menu.Header>Hosting</Menu.Header>

                <Menu.Menu>
                  <Menu.Item name="shared" />
                  <Menu.Item name="dedicated" />
                </Menu.Menu>
              </Menu.Item>

              <Menu.Item>
                <Menu.Header>Support</Menu.Header>

                <Menu.Menu>
                  <Menu.Item name="email">E-mail Support</Menu.Item>

                  <Menu.Item name="faq">FAQs</Menu.Item>
                </Menu.Menu>
              </Menu.Item>
            </Menu>
          </Grid.Column>
          <Grid.Column width={10} style={{ paddingRight: "0px" }}>
            {jobPostings.map((jobPosting) => (
              <Card
                className="shadow cardjp"
                style={{ backgroundColor: "#F7F5F4", width: "100%" }}
              >
                <Card.Content className="cardContent">
                  <Image
                    floated="right"
                    size="tiny"
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
                      <Icon disabled name="info circle" />
                      {jobPosting.workingTime.workingTimeName}
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
              defaultActivePage={1}
              firstItem={null}
              lastItem={null}
              pointing
              secondary
              totalPages={7}
            />
          </Grid.Column>
          <Grid.Column width={3}>
            <Card>
              <Image src="/images/avatar/large/daniel.jpg" wrapped ui={false} />
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
