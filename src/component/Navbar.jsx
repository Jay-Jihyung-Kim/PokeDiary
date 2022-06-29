import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  background: #d82430;
  width: 100%;
  height: 100%;
  color: #f5f6f1;
  font-family: "PokemonFont";
  display: flex;
  justify-content: space-between;
  padding: 20px 20px;
`;

const Left = styled.div`
  display: flex;
  gap: 20px;
  cursor: pointer;
`;
const Text = styled.span`
  cursor: pointer;
  text-decoration: none;
  color: white;
  margin-right: 20px;
`;
const Right = styled.div``;

const Navbar = (props) => {
  return (
    <Container>
      <Left></Left>
      <Right>
        <Link style={{ textDecoration: "none" }} to="/main">
          <Text>Sign In</Text>
        </Link>
      </Right>
    </Container>
  );
};

export default Navbar;
