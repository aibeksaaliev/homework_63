import React, {FormEvent, useCallback, useEffect, useState} from 'react';
import {PostType} from "../../types";
import axiosApi from "../../axiosApi";
import Container from "react-bootstrap/Container";
import ReactTooltip from "react-tooltip";
import {useNavigate} from "react-router-dom";
import BlogSpinner from "../BlogSpinner/BlogSpinner";

interface PostFormProps {
  id?: string;
}

const PostForm: React.FC<PostFormProps> = ({id}) => {
  const [post, setPost] = useState<PostType>({
    id: "",
    title: "",
    description: "",
    time: ""
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchPost = useCallback(async () => {
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
    if (id) {
      fetchPost().catch(console.error);
    }
  }, [id, fetchPost]);

  const postChanged = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;

    setPost(prevState => ({
      ...prevState,
      [name]: value,
      time: new Date().toLocaleString(),
    }));
  };

  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await axiosApi.put("/posts/" + id + ".json", post);
        navigate("/")
      } else {
        await axiosApi.post("/posts.json", post);
        navigate("/");
      }
    } catch (e) {
      throw new Error();
    }
  };

  let pageContent = (
    <Container className="w-50 bg-dark rounded-3 mt-3">
      <h3 className="text-white text-center text-uppercase pt-3">{id ? "Edit post" : "New post"}</h3>
      <form
        onSubmit={onFormSubmit}
        className="m-auto"
      >
        <div className="form-group">
          <label htmlFor="exampleFormControlInput1">Title</label>
          <input
            type="text"
            className="form-control bg-transparent text-white"
            required
            name="title"
            value={post.title}
            placeholder="Title"
            onChange={postChanged}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">Description</label>
          <textarea
            className="form-control bg-transparent text-white"
            required
            name="description"
            value={post.description}
            onChange={postChanged}
          ></textarea>
        </div>
        <div className="form-group mt-4 pb-4 text-center">
          <button
            type="submit"
            className="btn btn-dark border-1 border-white rounded-circle"
            style={{padding: "6px 10px"}}
            data-tip="" data-for="save"
          >
            <i className="bi bi-save"></i>
          </button>
          <ReactTooltip
            id="save"
            place="top"
            effect="solid"
            className="bg-white text-dark"
          >
            Save post
          </ReactTooltip>
        </div>
      </form>
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

export default PostForm;