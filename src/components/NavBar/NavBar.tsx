import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {NavLink} from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container className="d-flex justify-content-between">
          <Navbar.Brand><NavLink to="/">My Blog</NavLink></Navbar.Brand>
          <Nav>
            <Nav.Link><NavLink to="/">Home</NavLink></Nav.Link>
            <Nav.Link><NavLink to="/add">Add</NavLink></Nav.Link>
            <Nav.Link><NavLink to="/about">About</NavLink></Nav.Link>
            <Nav.Link><NavLink to="/contacts">Contacts</NavLink></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;