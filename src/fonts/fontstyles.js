import { createGlobalStyle } from "styled-components";
import PokemonGB from "./PokeFont.ttf";

const FontStyles = createGlobalStyle`
 @font-face{
   font-family: "PokemonFont";
   src: url(${PokemonGB})
 }
`;

export default FontStyles;
