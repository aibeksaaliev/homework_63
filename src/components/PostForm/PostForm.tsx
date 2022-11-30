import React from 'react';
import Container from "react-bootstrap/Container";

const PostForm = () => {
  return (
    <Container>
      <form>
        <div className="form-group">
          <label htmlFor="exampleFormControlInput1">Title</label>
          <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Title"/>
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">Description</label>
          <textarea className="form-control" id="exampleFormControlTextarea1"></textarea>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">Save</button>
        </div>
      </form>
    </Container>
  );
};

export default PostForm;