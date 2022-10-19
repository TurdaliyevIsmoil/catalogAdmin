import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Card({ title, secondary, path }) {
  const navigate = useNavigate();
  return (
    <Container className="row" onClick={() => navigate(`${path}`)}>
      <h2>{title.slice(0,40)}</h2>
      <p>{secondary}</p>
    </Container>
  );
}

export default Card;

const Container = styled.div`
  border-radius: 8px;
  overflow: hidden;
  background-color: #ffffff;
  box-shadow: 0 20px 27px 0 rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all .3s;
  &:hover {
    transform: translateY(-5px);
  }
  img {
    background-color: #cccccc;
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
  }
  h2,
  p {
    padding-left: 16px;
    text-align: left;
    margin-top: 12px;
  }
  h2 {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 10px;
  }
  p {
    margin-top: 0;
    margin-bottom: 12px;
  }
`;
