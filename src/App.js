import React, { useEffect, useState } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components";
import { Home, Cart } from "./pages";
import { useDispatch } from "react-redux";
import { setPizzas } from "./redux/actions/pizzas";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    axios
      .get("http://localhost:3001/pizzas")
      .then(({ data }) => dispatch(setPizzas(data)));
  }, []);
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/cart" element={<Cart />} exact />
        </Routes>
      </div>
    </div>
  );
}

export default App;
