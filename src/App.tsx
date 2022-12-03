import React, {useState} from 'react';
import {Route, Routes} from "react-router-dom";
import {PostType} from "./types";
import NavBar from "./components/NavBar/NavBar";
import Home from "./containers/Home/Home";
import Add from "./containers/Add/Add";
import ReadMore from "./containers/ReadMore/ReadMore";
import EditPost from "./containers/EditPost/EditPost";
import About from "./containers/About/About";
import Contacts from "./containers/Contacts/Contacts";

function App() {

  return (
    <>
      <header>
        <NavBar/>
      </header>
      <main>
        <Routes>
          <Route path="/" element={(
            <Home/>
          )}/>
          <Route path="/posts" element={(
            <Home/>
          )}/>
          <Route path="/new-post" element={(
            <Add/>
          )}/>
          <Route path="/posts/:id" element={(
            <ReadMore/>
          )}/>
          <Route path="/posts/:id/edit" element={(
            <EditPost/>
          )}/>
          <Route path="/about" element={(
            <About/>
          )}/>
          <Route path="/contacts" element={(
            <Contacts/>
          )}/>
        </Routes>
      </main>
    </>
  );
}

export default App;
