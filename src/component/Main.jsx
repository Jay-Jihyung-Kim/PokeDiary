import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import Navbar from "./Navbar";
import Trainer from "./Trainer";

const Main = () => {
  const [names, setNames] = useState([]);
  const [close, setClose] = useState("none");

  const [currentPokemon, setCurrentPokemon] = useState({
    value: "Bulbasaur",
    label: "1. Bulbasaur",
    index: 0,
    number: 1,
  });

  function handleChange(e) {
    setCurrentPokemon(options[e.index]);
  }

  function handleClose() {
    setClose("none");
  }

  function handleOpen() {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setClose("flex");
  }

  function handleClick(button) {
    if (button === "Next") {
      const newNumber = currentPokemon.index + 1;
      setCurrentPokemon(options[newNumber]);
    }
    if (button === "Prev") {
      const newNumber = currentPokemon.index - 1;
      setCurrentPokemon(options[newNumber]);
    }
  }

  function handleRandom() {
    setCurrentPokemon(options[Math.floor(Math.random() * 150)]);
  }

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
        `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${String(
          index + 1
        ).padStart(3, "0")}.png`
      );
    });

  return (
    <div>
      <Navbar />
      <Card
        nameList={names}
        onClick={handleOpen}
        close={close}
        currentPokemon={currentPokemon}
        handleChange={handleChange}
        handleClick={handleClick}
        handleRandom={handleRandom}
        options={options}
        images={images}
      />
      <Trainer
        onClick={handleClose}
        close={close}
        number={currentPokemon.number}
      />
    </div>
  );
};

export default Main;
