import React from "react";
import styled from "styled-components";
import {  MdOutlinePeopleAlt } from "react-icons/md";
import { useDataContext } from "../contexts/DataContext";
import { useNavigate } from "react-router-dom";
import { BsTable } from "react-icons/bs";
import { RiNewspaperLine } from "react-icons/ri";
import { GrServices } from "react-icons/gr";

function Main() {
  const { services, tables, news, applications } = useDataContext();
  const navigate = useNavigate();
  return (
    <Container>
      <div className="welcome">Welcome to Dashboard!</div>
  
    </Container>
  );
}

export default Main;

const Container = styled.div`
  .welcome {
    font-size: 36px;
    color: #0f6181;
    margin: 32px 12px;
    font-family: "Playfair display";
  }
  .information {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 15px;
    & > div {
      padding: 10px 10px 10px 15px;
      font-size: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;
      border-radius: 15px;
      color: #0f6181;
      cursor: pointer;
      path {
        stroke: white;
      }
      transition: transform 0.3s ease;
      &:hover {
        transform: translateY(-3px);
      }
      span {
        width: 50px;
        height: 50px;
        border-radius: 7px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #0f6181;
        font-size: 24px;
        position: relative;
        color: white;
        .notification {
          position: absolute;
          width: 20px;
          height: 20px;
          background-color: #fbfbfb;
          border: 1px solid #0f6181;
          border-radius: 50%;
          color: #0f6181;
          font-size: 12px;
          top: -9px;
          right: -9px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: bold;
        }
      }
    }
  }
`;
