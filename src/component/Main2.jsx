import React, { useState, useEffect } from "react";
import axios from "axios";
import MainNavbar from "./MainNavbar";
import TodoList from "./TodoList";
import Signin from "./Signin";

const Main2 = () => {
  const [names, setNames] = useState([]);
  const [loginStatus, setLoginStatus] = useState(false);
  const [user, setUser] = useState({ token: "", username: "", userId: "" });
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchName = async () => {
      await axios
        .get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151")
        .then((res) => {
          const response = res.data;
          const list = response.results;
          setNames(list);
        });
    };
    fetchName();
  }, []);

  function handleLoginStatus(value) {
    setLoginStatus(value);
  }

  function userData(value) {
    setUser(value);
  }

  const options = [];
  const images = [];
  names &&
    names.map((data, index) => {
      const str = data.name;
      const str2 = str.charAt(0).toUpperCase() + str.slice(1);
      options.push({
        value: str2,
        label: index + 1 + ". " + str2,
        index: index,
        number: index + 1,
      });
      images.push(
        `https://www.pkparaiso.com/imagenes/pokedex/crystal/${String(
          index + 1
        ).padStart(3, "0")}.gif`
      );
    });

  return (
    <div>
      <Signin
        handleLoginStatus={handleLoginStatus}
        userData={userData}
        loginStatus={loginStatus}
      />
      <MainNavbar />
      <TodoList
        user={user}
        loginStatus={loginStatus}
        notes={notes}
        images={images}
        options={options}
      />
      {/* <Dex images={images} /> */}
    </div>
  );
};

export default Main2;
