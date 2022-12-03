import React from 'react';
import {useParams} from "react-router-dom";
import PostForm from "../../components/PostForm/PostForm";

const EditPost = () => {
  const {id} = useParams();

  return (
    <>
      <PostForm id={id}/>
    </>
  );
};

export default EditPost;