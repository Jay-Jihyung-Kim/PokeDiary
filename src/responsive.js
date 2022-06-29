import { css } from "styled-components";

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 650px) {
      ${props}
    }
  `;
};

export const smallMobile = (props) => {
  return css`
    @media only screen and (max-width: 520px) {
      ${props}
    }
  `;
};
