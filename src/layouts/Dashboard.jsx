import React from "react";
import { Route } from "react-router-dom";
import { Grid, Container } from "semantic-ui-react";

import AddJobPosting from "../pages/AddJobPosting";
import Home from "../pages/Home";
import EmployerList from "../pages/EmployerList";
import JobPosting from "../pages/JobPosting";
import JobPostingFilter from "../pages/jobPostingFilter";
import CurricullumVitae from "../pages/CurricullumVitae";
import SystemUserInfo from "../pages/SystemUserInfo";
import EmployerInfo from "../pages/EmployerInfo";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <Grid style={{ width: "100%" }}>
        <Grid.Row>
          <div style={{ width: "100%" }}>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/employerlist" component={EmployerList}></Route>
            <Route exact path="/jobposting" component={JobPosting}></Route>
            <Route
              exact
              path="/addjobposting"
              component={AddJobPosting}
            ></Route>
            <Route exact path="/filter" component={JobPostingFilter}></Route>
            <Route
              exact
              path="/jobposting/cityId/:cityId/positionId/:positionId"
              component={JobPosting}
            />
            <Route
              exact
              path="/jobposting/cityId/:cityId/workingTimeId/:workingTimeId"
              component={JobPosting}
            />
            <Route
              exact
              path="/jobposting/cityId/:cityId"
              component={JobPosting}
            />
            <Route
              exact
              path="/jobposting/workingTimeId/:workingTimeId"
              component={JobPosting}
            />
            <Route
              exact
              path="/jobposting/getallbypage/pageNo/:pageNo/pageSize/:pageSize"
              component={JobPosting}
            />
            <Route
              exact
              path="/cv/:id"
              component={CurricullumVitae}
            />
            <Route
              exact
              path="/systemuserinfo/:id"
              component={SystemUserInfo}
            />
              <Route
              exact
              path="/employer/:id"
              component={EmployerInfo}
            />
          </div>
        </Grid.Row>
      </Grid>
    </div>
  );
}
