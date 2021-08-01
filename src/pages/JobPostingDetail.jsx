import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { Card, Icon, Image, Item, Label, Container } from "semantic-ui-react";
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
        <Image
          centered
          size="medium"
          src={jobPosting.employer?.companyLogo}
          style={{ marginTop: "2em" }}
        />
        <Header as="h1">
          {jobPosting.jobPosition?.positionName}
          <Header.Subheader>
            {jobPosting.employer?.companyName}
          </Header.Subheader>
        </Header>
        <Divider></Divider>
        <h2>İlan Detayları</h2>
        <p>{jobPosting.jobDescription}</p>
        <p>
          <strong>Maaş Skalası:</strong>
          <Label as="a">₺{jobPosting.minSalary}</Label>-
          <Label as="a">₺{jobPosting.maxSalary}</Label>
        </p>
        <p>
          <Label color="green" as="a">
            Açık Pozisyon Sayısı
            <Label.Detail>{jobPosting.numberOfOpenPosition}</Label.Detail>
          </Label>
          <Label as="a" color="teal" image>
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
      </Container>
    </div>
  );
}
