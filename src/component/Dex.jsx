import React, { useEffect } from "react";
import styled from "styled-components";

const Background = styled.div`
  background: #b3eaff;
  padding: 20px 15px;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  background: #b3eaff;
  justify-content: center;
  max-width: 700px;
  margin: 0 auto;
  gap: 10px;
`;

const PokemonImages = styled.img`
  height: 100px;
  width: 100px;
  filter: brightness(0);
`;

const Numbers = styled.p`
  font-family: "PokemonFont";
  text-align: center;
`;

const dex = (props) => {
  return (
    <Background>
      <Container>
        {props.images &&
          props.images.map((image, index) => {
            return (
              <div>
                <PokemonImages src={image} />
                <Numbers>#{String(index + 1).padStart(3, "0")}</Numbers>
              </div>
            );
          })}
      </Container>
    </Background>
  );
};

export default dex;
