import {
  Icon,
  Button,
  Image,
  Input,
  Container,
  Header,
  Card,
} from "semantic-ui-react";
import React, { useEffect, useState } from "react";
import JobPostingService from "../services/jobPostingService";
import { Grid } from "semantic-ui-react";
export default function Home() {
  const [jobPostings, setjobPostings] = useState([]);
  useEffect(() => {
    let jobPostingService = new JobPostingService();
    jobPostingService
      .getJobPosting()
      .then((result) => setjobPostings(result.data.data));
  }, []);
  return (
    <div style={{ marginBottom: "5em" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: "column",
          minHeight: "37em",
          backgroundImage: `url("http://localhost:3000/son.png")`,
        }}
      >
        <Image
          size="large"
          src="http://localhost:3000/logo.png"
          style={{ width: "30%", minWidth: "15%" }}
        ></Image>
        <Input
          style={{ display: "flex", width: "320px" }}
          size="huge"
          icon={<Icon name="search" inverted circular link />}
          placeholder="Pozisyon,firma adı,sektör"
        />
      </div>
      <Grid style={{ display: "flex", margin: "0" }}>
        <Container style={{ display: "flex" }}>
          <Grid style={{ display: "flex" }} centered>
            <Grid.Row
              style={{
                height: "auto",
                margin: "5em 0em 6em 0em",
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <Grid.Column
                style={{
                  display: "flex",
                  flex: "1",
                  width: "fit-content",
                  justifyContent: "center",
                }}
              >
                <ul style={{ listStyle: "none", width: "160px" }}>
                  <li className="img">
                    <Icon
                      size="huge"
                      className="promotion"
                      name="search"
                      style={{ color: "#4471FE" }}
                    ></Icon>
                  </li>
                  <li>
                    <h2 style={{ textAlign: "center", paddingTop: "0.5em" }}>
                      İş Ara
                    </h2>
                  </li>
                  <li>
                    <p
                      style={{
                        textAlign: "center",
                        color: "grey",
                        paddingTop: "0.5em",
                      }}
                    >
                      Hayallerinde ki işi bul.
                    </p>
                  </li>
                </ul>
              </Grid.Column>
              <Grid.Column
                style={{
                  display: "flex",
                  flex: "1",
                  width: "fit-content",
                  justifyContent: "center",
                }}
              >
                <ul style={{ listStyle: "none", width: "160px" }}>
                  <li className="img">
                    <Icon
                      size="huge"
                      className="promotion"
                      name="signup"
                      style={{ color: "#f85032" }}
                    ></Icon>
                  </li>
                  <li>
                    <h2 style={{ textAlign: "center", paddingTop: "0.5em" }}>
                      Kayıt Ol
                    </h2>
                  </li>
                  <li>
                    <p
                      style={{
                        textAlign: "center",
                        color: "grey",
                        paddingTop: "0.5em",
                      }}
                    >
                      Harika iş fırsatlarımızdan yararlanmak için sistemize
                      kaydını gerçekleştir.
                    </p>
                  </li>
                </ul>
              </Grid.Column>
              <Grid.Column
                style={{
                  display: "flex",
                  flex: "1",
                  width: "fit-content",
                  justifyContent: "center",
                }}
              >
                <ul style={{ listStyle: "none", width: "160px" }}>
                  <li className="img">
                    <Icon
                      size="huge"
                      className="promotion"
                      name="id badge outline"
                      style={{ color: "#FFCC20" }}
                    ></Icon>
                  </li>
                  <li>
                    <h2 style={{ textAlign: "center", paddingTop: "0.5em" }}>
                      CV Tasarla
                    </h2>
                  </li>
                  <li>
                    <p
                      style={{
                        textAlign: "center",
                        color: "grey",
                        paddingTop: "0.5em",
                      }}
                    >
                      En ilgi çekici özelliklerinden oluşan bir cv hazırla.
                    </p>
                  </li>
                </ul>
              </Grid.Column>
              <Grid.Column
                style={{
                  display: "flex",
                  flex: "1",
                  width: "fit-content",
                  justifyContent: "center",
                }}
              >
                <ul style={{ listStyle: "none", width: "160px" }}>
                  <li className="img">
                    <Icon
                      size="huge"
                      className="promotion"
                      name="checkmark"
                      style={{ color: "#34D3D7" }}
                    ></Icon>
                  </li>
                  <li>
                    <h2 style={{ textAlign: "center", paddingTop: "0.5em" }}>
                      Başvur
                    </h2>
                  </li>
                  <li>
                    <p
                      style={{
                        textAlign: "center",
                        color: "grey",
                        paddingTop: "0.5em",
                      }}
                    >
                      Bu bulduğun harika fırsattan yararlanmak için başvurunu
                      yap.
                    </p>
                  </li>
                </ul>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ display: "flex" }}>
              <Header as="h1" centered>
                Öne Çıkan İlanlar
              </Header>
            </Grid.Row>

            <Grid.Row
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Card.Group
                style={{ marginBottom: "2em", justifyContent: "center" }}
              >
                <Card className="shadow" style={{ backgroundColor: "#F7F5F4" }}>
                  <Card.Content style={{ backgroundColor: "white" }}>
                    <Image
                      floated="right"
                      size="tiny"
                      src="https://images.unsplash.com/photo-1549924231-f129b911e442?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                    />
                    <Card.Header className="cardHeader">
                      İş Pozisyonu
                    </Card.Header>
                    <Card.Meta className="company">Şirket İsmi</Card.Meta>
                  </Card.Content>
                  <Card.Content extra>
                    <div className="cardFooter">
                      <div className="workingTime">
                        <Icon disabled name="time" />
                        Zaman
                      </div>
                      <div className="city">
                        <Icon disabled name="map marker" />
                        Konum
                      </div>
                    </div>
                  </Card.Content>
                </Card>

                <Card className="shadow" style={{ backgroundColor: "#F7F5F4" }}>
                  <Card.Content style={{ backgroundColor: "white" }}>
                    <Image
                      floated="right"
                      size="tiny"
                      src="https://images.unsplash.com/photo-1549924231-f129b911e442?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                    />
                    <Card.Header className="cardHeader">
                      İş Pozisyonu
                    </Card.Header>
                    <Card.Meta className="company">Şirket İsmi</Card.Meta>
                  </Card.Content>
                  <Card.Content extra>
                    <div className="cardFooter">
                      <div className="workingTime">
                        <Icon disabled name="time" />
                        Zaman
                      </div>
                      <div className="city">
                        <Icon disabled name="map marker" />
                        Konum
                      </div>
                    </div>
                  </Card.Content>
                </Card>

                <Card className="shadow" style={{ backgroundColor: "#F7F5F4" }}>
                  <Card.Content style={{ backgroundColor: "white" }}>
                    <Image
                      floated="right"
                      size="tiny"
                      src="https://images.unsplash.com/photo-1549924231-f129b911e442?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                    />
                    <Card.Header as="h1" className="cardHeader">
                      İş Pozisyonu
                    </Card.Header>
                    <Card.Meta className="company">Şirket İsmi</Card.Meta>
                  </Card.Content>
                  <Card.Content extra>
                    <div className="cardFooter">
                      <div className="workingTime">
                        <Icon disabled name="time" />
                        Zaman
                      </div>
                      <div className="city">
                        <Icon disabled name="map marker" />
                        Konum
                      </div>
                    </div>
                  </Card.Content>
                </Card>
              </Card.Group>
            </Grid.Row>
            <Grid.Row>
              <Card.Group
                style={{
                  width: "80%",
                  backgroundColor: "#F3F1EF",
                  margin: "2em 0em",
                }}
              >
                <Card
                  centered
                  style={{ width: "100%", backgroundColor: "#4471FE" }}
                >
                  <Card.Content style={{ minHeight: "100%" }}>
                    <Button
                      style={{ marginTop: "0em", color: "#4471FE" }}
                      floated="right"
                      size="massive"
                    >
                      Kayıt Ol
                    </Button>
                    <Card.Header
                      style={{
                        fontSize: "2em",
                        textAlign: "left",
                        paddingTop: "0.5em",
                        backgroundColor: "#4471FE",
                        color: "#F3F1EF",
                      }}
                    >
                      Daha büyük fırsatlardan haberdar olmak için
                    </Card.Header>
                  </Card.Content>
                </Card>
              </Card.Group>
            </Grid.Row>
          </Grid>
        </Container>
      </Grid>
    </div>
  );
}
