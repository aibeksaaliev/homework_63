import React, {FormEvent, useCallback, useEffect, useState} from 'react';
import Container from "react-bootstrap/Container";
import axiosApi from "../../axiosApi";
import {AboutInfoType} from "../../types";
import ReactTooltip from "react-tooltip";

const About = () => {
  const [aboutInfo, setAboutInfo] = useState<AboutInfoType>({
    history: "",
    mission: "",
    established: "",
    posts: ""
  });
  const [editShow, setEditShow] = useState(false);

  const fetchAboutInfo = useCallback(async () => {
    const infoResponse = await axiosApi.get<AboutInfoType>('/about.json');
    const info = infoResponse.data;
    setAboutInfo(info);
  }, []);

  useEffect(() => {
    fetchAboutInfo().catch(console.error);
  }, [fetchAboutInfo]);

  const infoChanged = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;

    setAboutInfo(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axiosApi.put("/about.json", aboutInfo)
    } catch (e) {
      throw new Error();
    } finally {
      setEditShow(false);
    }
  };


  return (
    <Container className="text-center pt-4 pb-4 position-relative">
      <h4>About</h4>
      <h5>History</h5>
      <p>{aboutInfo?.history}</p>
      <h5>Mission</h5>
      <p>{aboutInfo?.mission}</p>
      <span className="d-block">Established: {aboutInfo?.established}.</span>
      <span className="d-block">How many posts i wrote: {aboutInfo?.posts}.</span>
      <button
        className="btn btn-dark d-block position-absolute top-0 end-0 mt-4 rounded-circle"
        onClick={() => setEditShow(true)}
        style={{padding: "6px 10px"}}
        data-tip="" data-for="edit_about"
      >
        <i className="bi bi-three-dots-vertical"></i>
      </button>
      <ReactTooltip
        id="edit_about"
        place="left"
        effect="solid"
      >
        Edit page
      </ReactTooltip>
      {editShow ? (
        <form onSubmit={onFormSubmit} className="mt-3">
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Edit history info</label>
            <textarea
              className="form-control bg-transparent text-dark"
              required
              name="history"
              value={aboutInfo?.history}
              onChange={infoChanged}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Edit mission info</label>
            <textarea
              className="form-control bg-transparent text-dark"
              required
              name="mission"
              value={aboutInfo?.mission}
              onChange={infoChanged}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Edit established info</label>
            <input
              type="text"
              className="form-control bg-transparent text-dark"
              required
              name="established"
              value={aboutInfo?.established}
              onChange={infoChanged}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Edit posts info</label>
            <input
              type="text"
              className="form-control bg-transparent text-dark"
              required
              name="posts"
              value={aboutInfo?.posts}
              onChange={infoChanged}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-dark mt-2">Save</button>
          </div>
        </form>
      ) : null}
    </Container>
  );
};

export default About;