import React, { useState, useEffect } from "react";
import axios from "axios";
import { mobile, smallMobile } from "../responsive";
import Select from "react-select";
import styled from "styled-components";

const Background = styled.div`
  background: skyblue;
  padding: 40px 6px;
  font-family: "PokemonFont";
  height: 100%;
  min-height: 100vh;
`;
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;
const Title = styled.h1`
  margin-bottom: 20px;
  ${mobile({
    fontSize: "25px",
  })}
  ${smallMobile({
    fontSize: "20px",
  })}
`;
const Cards = styled.div`
  background: white;
  border-radius: 25px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Img = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  max-width: 250px;
  max-height: 250px;
  ${mobile({ maxWidth: "200px", maxHeight: "200px" })}
`;
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const Desc = styled.p`
  text-align: center;
  margin: 0 10px;
  ${mobile({ fontSize: ".75rem" })}
`;
const TypeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space;
  align-items: center;
  margin-top: 20px;
`;
const Type = styled.p`
  font-size: 1rem;
  color: white;
  padding: 2px 3px 2px 5px;
  background: ${(props) =>
    (props.background === "BUG" ? "#ADBD21" : null) ||
    (props.background === "GRASS" ? "#7BCE52" : null) ||
    (props.background === "NORMAL" ? "#ADA594" : null) ||
    (props.background === "FIRE" ? "#F75231" : null) ||
    (props.background === "WATER" ? "#399CFF" : null) ||
    (props.background === "ELECTRIC" ? "#FFC631" : null) ||
    (props.background === "ICE" ? "#5ACEE7" : null) ||
    (props.background === "FIGHTING" ? "#A55239" : null) ||
    (props.background === "POISON" ? "#B55AA5" : null) ||
    (props.background === "GROUND" ? "#D6B552" : null) ||
    (props.background === "PSYCHIC" ? "#FF73A5" : null) ||
    (props.background === "FAIRY" ? "#F7B5F7" : null) ||
    (props.background === "ROCK" ? "#BDA55A" : null) ||
    (props.background === "GHOST" ? "#6363B5" : null) ||
    (props.background === "DARK" ? "#735A4A" : null) ||
    (props.background === "DRAGON" ? "#7b63e7" : null) ||
    (props.background === "STEEL" ? "#adadc6" : null) ||
    (props.background === "FLYING" ? "#9CADF7" : null)};
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0px;
  gap: 20px;
`;
const Button = styled.button`
  background: #6457a6;
  border: none;
  color: white;
  padding: 6px 80px;
  border-radius: 10px;
  ${smallMobile({
    width: "10px",
  })}
  display: flex;
  justify-content: center;
`;
const ChooseButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const Choose = styled.button`
  background: #f7b5f7;
  border: none;
  color: white;
  padding: 6px 40px;
  border-radius: 10px;
  margin-bottom: 30px;
`;

const Card = (props) => {
  const [pokemonDesc, setPokemonDesc] = useState();
  const [pokemonTypes, setPokemonTypes] = useState();

  useEffect(async () => {
    await axios
      .get(
        `https://pokeapi.co/api/v2/pokemon-species/${props.currentPokemon.number}`
      )
      .then((res) => {
        const response = res.data;
        const text = response.flavor_text_entries;
        const textLanguage = text.filter((lang) => lang.language.name === "en");
        setPokemonDesc(textLanguage[1]);
      });
    await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${props.currentPokemon.number}`)
      .then((resData) => {
        const responseData = resData.data;
        const types = responseData.types;
        setPokemonTypes(types);
      });
  }, [props.currentPokemon]);

  return (
    <Background status={props.howTo}>
      <Container>
        <Title>Choose Your Pokemon!</Title>
        <Select
          options={props.options}
          placeholder={"Choose your Pokemon!"}
          onChange={(e) => props.handleChange(e)}
          value={props.currentPokemon}
        />
        <Cards>
          <Img src={props.images[props.currentPokemon.index]} />
          <TextContainer>
            <h1>{props.currentPokemon.value}</h1>
            {pokemonDesc && (
              <Desc>{pokemonDesc.flavor_text.replace(/(\f)/gm, " ")}</Desc>
            )}
          </TextContainer>
          <TypeContainer>
            {pokemonTypes &&
              pokemonTypes.map((data) => {
                return (
                  <Type
                    background={data.type.name.toUpperCase()}
                    key={data.type.name}
                  >
                    {data.type.name.toUpperCase()}
                  </Type>
                );
              })}
          </TypeContainer>
          <ButtonContainer>
            <Button
              onClick={() => props.handleClick("Prev")}
              disabled={props.currentPokemon.index === 0}
            >
              Prev
            </Button>
            <Button
              onClick={() => props.handleClick("Next")}
              disabled={props.currentPokemon.index === 150}
            >
              Next
            </Button>
          </ButtonContainer>
          <ChooseButtonContainer>
            <Choose onClick={props.onClick}>I Choose You!</Choose>
            <Choose
              onClick={props.handleRandom}
              style={{ background: "#d82430" }}
            >
              Pick one for me!
            </Choose>
          </ChooseButtonContainer>
        </Cards>
      </Container>
    </Background>
  );
};

export default Card;
