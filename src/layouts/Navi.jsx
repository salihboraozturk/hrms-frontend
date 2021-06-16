import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";

export default function Navi() {
  return (
    <div>
      <Menu size="large" fixed="top">
        <Container>
          <Menu.Item name="HRMS Project" />

          <Menu.Item name="home" as={NavLink} to="/employerlist"></Menu.Item>

          <Menu.Item name="jobPostings" />

          <Menu.Menu position="right">
            <Menu.Item name="İş İlanı Ekle"  as={NavLink} to="/addJobPosting"/>
            <Menu.Item>
              <Button.Group>
                <Button>Sign In</Button>
                <Button.Or />
                <Button color="blue">Sign Up</Button>
              </Button.Group>
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
    </div>
  );
}
