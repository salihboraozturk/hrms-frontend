import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import {
  Button,
  Card,
  Icon,
  Image,
  Item,
  Label,
  Container,
} from "semantic-ui-react";
import JobPostingService from "../services/jobPostingService";
import {
  Divider,
  Dropdown,
  Grid,
  Header,
  List,
  Menu,
  Segment,
} from "semantic-ui-react";
export default function JobPostingDetail() {
  let { id } = useParams();
  const [jobPosting, setJobPosting] = useState({});
  useEffect(() => {
    let jobPostingService = new JobPostingService();
    jobPostingService
      .getById(id)
      .then((result) => setJobPosting(result.data.data));
  }, []);
  console.log(jobPosting);
  return (
    <div>
      <Container text style={{ marginTop: "1em" }}>
        <Grid>
          <Grid.Column>
            <Image
              size="medium"
              label={{
                as: "h1",
                color: "black",
                content: jobPosting.listingDate,
                ribbon: true,
              }}
              src={jobPosting.employer?.companyLogo}
            />
            <Header as="h1">{jobPosting.jobPosition?.positionName}</Header>
            <Header as="h4">
              <Icon name="map marker" />
              {jobPosting.employer?.companyName}-{jobPosting.city?.cityName}
            </Header>
            <p>{jobPosting.jobDescription}</p>
            <p>
              <strong>Maaş Skalası:</strong>
              <Label as="a">₺{jobPosting.minSalary}</Label>-
              <Label as="a">₺{jobPosting.maxSalary}</Label>
            </p>
            <p>
              <Label color="teal" as="a">
                Açık Pozisyon Sayısı
                <Label.Detail>{jobPosting.numberOfOpenPosition}</Label.Detail>
              </Label>
              <Label as="a" color="red" image>
                Çalışma Türü
                <Label.Detail>{jobPosting.jobType?.jobTypeName}</Label.Detail>
              </Label>
              <Label as="a" color="yellow" image>
                Çalışma Şekli
                <Label.Detail>
                  {jobPosting.workingTime?.workingTimeName}
                </Label.Detail>
              </Label>
            </p>
            <Button positive>Başvur</Button>
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}
