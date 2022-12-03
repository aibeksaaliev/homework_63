import React, {useCallback, useEffect, useState} from 'react';
import {PostType} from "../../types";
import {Link, useNavigate, useParams} from "react-router-dom";
import axiosApi from "../../axiosApi";
import BlogSpinner from "../../components/BlogSpinner/BlogSpinner";
import Container from "react-bootstrap/Container";
import ReactTooltip from "react-tooltip";

const ReadMore= () => {
  const {id} = useParams();
  const [post, setPost] = useState<PostType>({
    id: "",
    title: "",
    description: "",
    time: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchOnePost = useCallback(async () => {
    setLoading(true);
      try {
        const postResponse = await axiosApi.get<PostType>("/posts/" + id + ".json");
        setPost(prevState => ({
          ...prevState,
          id: id,
          title: postResponse.data.title,
          description: postResponse.data.description,
          time: postResponse.data.time,
        }));
      } finally {
        setLoading(false);
      }
    },
    [id]);

  useEffect(() => {
    fetchOnePost().catch(console.error);
  }, [id, fetchOnePost]);

  const deleteOnePost = async () => {
    try {
      await axiosApi.delete("/posts/" + id + ".json");
    } finally {
      navigate("/posts");
    }
  };

  let pageContent = (
    <Container>
      <div className="card w-75 m-auto mt-3">
        <div className="card-header d-flex justify-content-between">
          <span className="text-capitalize fw-bold">{post?.title}</span>
          <span>{post?.time}</span>
        </div>
        <div className="card-body">
          <p className="card-text">{post?.description}</p>
          <div className="w-25 m-auto d-flex justify-content-around">
            <button
              onClick={deleteOnePost}
              className="btn btn-dark rounded-circle"
              style={{padding: "6px 10px"}}
              data-tip="" data-for="delete"
            >
              <i className="bi bi-trash3"></i>
            </button>
            <Link
              to={"/posts/" + id + "/edit"}
              className="btn btn-dark rounded-circle"
              style={{padding: "6px 10px"}}
              data-tip data-for="edit"
            >
              <i className="bi bi-pencil-square"></i>
            </Link>
            <ReactTooltip
              id="delete"
              place="left"
              effect="solid"
            >
              Delete post
            </ReactTooltip>
            <ReactTooltip
              id="edit"
              place="right"
              effect="solid"
            >
              Edit post
            </ReactTooltip>
          </div>
        </div>
      </div>
    </Container>
  );

  if (loading) {
    pageContent = <BlogSpinner/>
  }


  return (
    <>
      {pageContent}
    </>
  );
};

export default ReadMore;