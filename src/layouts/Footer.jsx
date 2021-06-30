import React from "react";
import { Container, Grid, Header, List, Segment } from "semantic-ui-react";
export default function Footer() {
  return (
    <div className="footer">
        <Container>
          <Grid style={{margin:"5px"}} stackable>
            <Grid.Row style={{paddingBottom:"0"}}>
              <Grid.Column width={3}>
                <Header as="h3" content="Hakkımızda" />
                <List link>
                  <List.Item as="a">Site Haritası</List.Item>
                  <List.Item as="a">İletişim</List.Item>
                  <List.Item as="a">Misyonumuz</List.Item>
                  <List.Item as="a">Vizyonumuz</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header as="h3" content="Yardım" />
                <List link>
                  <List.Item as="a">S.S.S</List.Item>
                  <List.Item as="a">Öneri</List.Item>
                </List>
              </Grid.Column>

              <Grid.Column width={7}>
                <Header as="h3">Kariyer</Header>
                <p>
                  Ekibimizin bir parçası olmak ve bizimle çalışmak için
                </p>
                <List.Item as="a">Başvur</List.Item>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header as="h3" content="Veri Politikamız" />
                <List link>
                  <List.Item as="a">Aydınlatma Metni</List.Item>
                  <List.Item as="a">Çerez Politikası</List.Item>
                  <List.Item as="a">Bilgi Güvenliği Politikası</List.Item>
                </List>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
    </div>
  );
}
