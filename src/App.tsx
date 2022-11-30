import React from 'react';
import NavBar from "./components/NavBar/NavBar";
import Home from "./containers/Home/Home";
import {Route, Routes} from "react-router-dom";
import Add from "./containers/Add/Add";

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
          <Route path="add" element={(
            <Add/>
          )}/>
        </Routes>
      </main>
    </>
  );
}

export default App;
