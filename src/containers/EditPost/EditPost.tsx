import React, {useRef} from 'react';
import {PostType} from "../../types";
import PostForm from "../../components/PostForm/PostForm";
import {useParams} from "react-router-dom";

interface EditPostProps {
  existingPost: PostType;
}

const EditPost: React.FC<EditPostProps> = ({existingPost}) => {
  const {id} = useParams();


  return (
    <>
      <PostForm id={id}/>
    </>
  );
};

export default EditPost;