import React from "react";
import styled from "styled-components";

function Button({ children, ...rest }) {
  return <Container {...rest}>{children}</Container>;
}

export default Button;
const Container = styled.button`
  background-color: #0f6181;
  padding: 10px 32px;
  height: 100%;
  font-family: "Gilroy";
  font-weight: 600;
  border: none;
  color: white;
  border-radius: 7px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0c84b4;
  }
`;
