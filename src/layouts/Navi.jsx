import "../css/Navi.css"
import React from "react";
import { NavLink } from "react-router-dom";
import { Container, Button, Image, Menu, Icon } from "semantic-ui-react";

export default function Navi() {
  return (
    <div className="navbar">
      <Menu className="navbarmenu" fixed="top" style={{backgroundColor:"#4471FE"}} secondary>
        <Container className="navbarcontainer">
          <Menu.Item name="HRMS" exact as={NavLink} to="/">
           <Image size="small" src="http://localhost:3000/logo.png"></Image>
          </Menu.Item>
          <Menu.Item as={NavLink} to="/jobposting"><strong>İş İlanları</strong></Menu.Item>
          <Menu.Menu position="right" >
            <Menu.Item style={{paddingRight:"0px",marginRight:"0px"}}>
              <Button.Group>
                <Button>Giris Yap</Button>
                <Button.Or />
                <Button style={{ backgroundColor: "#f85032" }}>Kayıt Ol</Button>
              </Button.Group>
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
    </div>
  );
}
