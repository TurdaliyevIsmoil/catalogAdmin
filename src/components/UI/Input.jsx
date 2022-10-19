import React from "react";
import styled from "styled-components";

function Input({ ...rest }) {
  return <Container {...rest} />;
}

export default Input;

const Container = styled.input`
  background-color: #ebebebe6;
  padding: 8px 16px;
  border: 0;
  box-sizing: border-box !important;
  font-size: 14px;
  border-radius: 5px;
  width: 100%;
  &:focus {
    border: 0;
    outline: none;
  }
`;
