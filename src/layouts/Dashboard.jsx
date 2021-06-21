import React from "react";
import { Route } from "react-router-dom";
import { Grid,Container } from "semantic-ui-react";


import AddJobPosting from "../components/AddJobPosting";
import Home from "../pages/Home";
import EmployerList from "../components/EmployerList";
import JobPosting from "../pages/JobPosting";

export default function Dashboard() {
  return (
    <div className="dashboard" style={{ minHeight: "90em" }} >
      <Grid style={{ width: "100%" }}>
        <Grid.Row>
          <div style={{ width: "100%" }}>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/employerlist" component={EmployerList}></Route>
            <Route
              exact
              path="/jobposting"
              component={JobPosting}
            ></Route>
            <Route
              exact
              path="/addjobposting"
              component={AddJobPosting}
            ></Route>
          </div>
        </Grid.Row>
      </Grid>
    </div>
  );
}
