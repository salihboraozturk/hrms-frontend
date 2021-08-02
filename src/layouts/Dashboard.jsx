import React from "react";
import { Route } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import AddJobPosting from "../pages/AddJobPosting";
import CurricullumVitae from "../pages/CurricullumVitae";
import EmployerInfo from "../pages/EmployerInfo";
import EmployerList from "../pages/EmployerList";
import Home from "../pages/Home";
import JobPosting from "../pages/JobPosting";
import JobPostingDetail from "../pages/JobPostingDetail";
import JobPostingFilter from "../pages/JobPostingFilter";
import SystemUserInfo from "../pages/SystemUserInfo";


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
              <Route
              exact
              path="/jobposting/:id"
              component={JobPostingDetail}
            />
          </div>
        </Grid.Row>
      </Grid>
    </div>
  );
}
