import React, {FormEvent, useCallback, useEffect, useState} from 'react';
import Container from "react-bootstrap/Container";
import axiosApi from "../../axiosApi";
import {AboutInfoType} from "../../types";

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
    <Container>
      <h4>About</h4>
      <h5>History</h5>
      <p>{aboutInfo?.history}</p>
      <h5>Mission</h5>
      <p>{aboutInfo?.mission}</p>
      <span>Established:{aboutInfo?.established}</span>
      <span>How many posts i wrote:{aboutInfo?.posts}</span>
      <button className="btn btn-dark" onClick={() => setEditShow(true)}>Edit</button>
      {editShow ? (
        <form onSubmit={onFormSubmit}>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">History</label>
            <textarea
              className="form-control bg-transparent text-dark"
              required
              name="history"
              value={aboutInfo?.history}
              onChange={infoChanged}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Mission</label>
            <textarea
              className="form-control bg-transparent text-dark"
              required
              name="mission"
              value={aboutInfo?.mission}
              onChange={infoChanged}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">History</label>
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
            <label htmlFor="exampleFormControlInput1">History</label>
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
            <button type="submit" className="btn btn-dark">Save</button>
          </div>
        </form>
      ) : null}
    </Container>
  );
};

export default About;