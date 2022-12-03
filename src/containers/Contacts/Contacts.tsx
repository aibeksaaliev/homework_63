import React, {FormEvent, useCallback, useEffect, useState} from 'react';
import Container from "react-bootstrap/Container";
import {AboutInfoType, ContactsInfoType} from "../../types";
import axiosApi from "../../axiosApi";
import ReactTooltip from "react-tooltip";

const Contacts = () => {
  const [contactsInfo, setContactsInfo] = useState<ContactsInfoType>({
    phone: "",
    email: ""
  });
  const [editShow, setEditShow] = useState(false);

  const fetchContactsInfo = useCallback(async () => {
    const infoResponse = await axiosApi.get<ContactsInfoType>('/contacts.json');
    const info = infoResponse.data;
    setContactsInfo(info);
  }, []);

  useEffect(() => {
    fetchContactsInfo().catch(console.error);
  }, [fetchContactsInfo]);

  const infoChanged = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;

    setContactsInfo(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axiosApi.put("/contacts.json", contactsInfo)
    } catch (e) {
      throw new Error();
    } finally {
      setEditShow(false);
    }
  };

  return (
    <Container className="text-center pt-4 pb-4 position-relative">
      <h5 className="mb-3">Contacts</h5>
      <span className="d-block">Phone: <b>{contactsInfo.phone}</b></span>
      <span className="d-block">E-mail: <b>{contactsInfo.email}</b></span>
      <button
        className="btn btn-dark d-block position-absolute top-0 end-0 mt-4 rounded-circle"
        onClick={() => setEditShow(true)}
        style={{padding: "6px 10px"}}
        data-tip="" data-for="edit_contacts"
      >
        <i className="bi bi-three-dots-vertical"></i>
      </button>
      <ReactTooltip
        id="edit_contacts"
        place="left"
        effect="solid"
      >
        Edit page
      </ReactTooltip>
      {editShow ? (
        <form onSubmit={onFormSubmit} className="mt-3">
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Edit phone info</label>
            <input
              type="text"
              className="form-control bg-transparent text-dark"
              required
              name="phone"
              value={contactsInfo.phone}
              onChange={infoChanged}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Edit email info</label>
            <input
              type="text"
              className="form-control bg-transparent text-dark"
              required
              name="email"
              value={contactsInfo.email}
              onChange={infoChanged}
            />
          </div>
          <button type="submit" className="btn btn-dark mt-2">Save</button>
        </form>
      ) : null}
    </Container>
  );
};

export default Contacts;