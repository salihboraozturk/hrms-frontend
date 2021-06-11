import React from "react";
import { Grid } from "semantic-ui-react";
import CandidateList from "../components/CandidateList";
import CityList from "../components/CityList";
import EmployerList from "../components/EmployerList";

export default function Dashboard() {
  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            <CandidateList />
            <br />
            <br />
            <EmployerList />
            <br />
            <br />
            <CityList/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
