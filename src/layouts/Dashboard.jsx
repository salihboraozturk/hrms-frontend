import React from "react";
import { Route } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import AddJobPosting from "../components/AddJobPosting";
import CandidateList from "../components/CandidateList";
import EmployerList from "../components/EmployerList";

export default function Dashboard() {
  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            <Route exact path="/" component={CandidateList}></Route>
            <Route exact path="/employerlist" component={EmployerList}></Route>
            <Route exact path="/addjobposting" component={AddJobPosting}></Route>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
