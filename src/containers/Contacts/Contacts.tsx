import React, {FormEvent, useCallback, useEffect, useState} from 'react';
import Container from "react-bootstrap/Container";
import {AboutInfoType, ContactsInfoType} from "../../types";
import axiosApi from "../../axiosApi";

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
    <Container>
      <h5>Contacts</h5>
      <span>Phone: {contactsInfo.phone}</span>
      <span>E-mail: {contactsInfo.email}</span>
      <button className="btn btn-dark" onClick={() => setEditShow(true)}>Edit</button>
      {editShow ? (
        <form onSubmit={onFormSubmit}>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">History</label>
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
            <label htmlFor="exampleFormControlInput1">History</label>
            <input
              type="text"
              className="form-control bg-transparent text-dark"
              required
              name="email"
              value={contactsInfo.email}
              onChange={infoChanged}
            />
          </div>
          <button type="submit" className="btn btn-dark">Save</button>
        </form>
      ) : null}
    </Container>
  );
};

export default Contacts;