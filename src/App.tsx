import React, {useState} from 'react';
import {Route, Routes} from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Home from "./containers/Home/Home";
import Add from "./containers/Add/Add";
import ReadMore from "./containers/ReadMore/ReadMore";
import {PostType} from "./types";
import EditPost from "./containers/EditPost/EditPost";
import About from "./containers/About/About";
import Contacts from "./containers/Contacts/Contacts";

function App() {
  const [existingPost, setExistingPost] = useState<PostType | null>(null);

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
            <ReadMore getSelectedPost={setExistingPost}/>
          )}/>
          <Route path="/posts/:id/edit" element={(
            <EditPost existingPost={existingPost!}/>
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
