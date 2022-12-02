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
          <Navbar.Brand><NavLink className="text-white text-decoration-none" to="/posts">My Blog</NavLink></Navbar.Brand>
          <Nav>
            <NavLink className="nav-link" to="/posts">Home</NavLink>
            <NavLink className="nav-link" to="/new-post">Add</NavLink>
            <NavLink className="nav-link" to="/about">About</NavLink>
            <NavLink className="nav-link" to="/contacts">Contacts</NavLink>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;