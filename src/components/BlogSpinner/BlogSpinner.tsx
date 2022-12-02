import React from 'react';
import {Spinner} from "react-bootstrap";
import Container from "react-bootstrap/Container";

const BlogSpinner = () => {
  return (
    <Container className="d-flex mt-5 pt-5">
      <Spinner animation="border" className="mx-auto"/>
    </Container>
  );
};

export default BlogSpinner;