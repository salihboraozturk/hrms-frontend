import React from "react";
import { NavLink } from "react-router-dom";
import {
  Button,
  Container, Dropdown, Image,
  Menu
} from "semantic-ui-react";
import "../css/Navi.css";

export default function Navi() {
  return (
    <div className="navbar">
      <Menu
        className="navbarmenu"
        fixed="top"
        style={{ backgroundColor: "#4471FE" }}
        secondary
      >
        <Container className="navbarcontainer">
          <Menu.Item name="HRMS" exact as={NavLink} to="/">
            <Image size="small" src="http://localhost:3000/logo.png"></Image>
          </Menu.Item>
          <Menu.Menu position="right">
            <Dropdown
              icon="bars"
              pointing="top right"
              className="link item my-hamburger-menu"
            >
              <Dropdown.Menu>
                <Dropdown.Item as={NavLink} to="/jobposting">
                  İş İlanları
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Header>İşlemler</Dropdown.Header>
                <Dropdown.Item>Giriş Yap</Dropdown.Item>
                <Dropdown.Item>Kayıt Ol</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
          <Menu.Item className="my-nav-item" as={NavLink} to="/jobposting">
            <strong>İş İlanları</strong>
          </Menu.Item>
          <Menu.Menu className="my-nav-item" position="right">
            <Menu.Item style={{ paddingRight: "0px", marginRight: "0px" }}>
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
