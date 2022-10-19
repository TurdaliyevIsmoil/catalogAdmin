import React from "react";
import styled from "styled-components";
import logo from "../images/logo.png";
import { NavLink } from "react-router-dom";
import {
  MdOutlineDashboardCustomize,
} from "react-icons/md";
import { GrServices } from "react-icons/gr";
import { RiNewspaperLine } from "react-icons/ri";
import { BiMessageDetail } from "react-icons/bi";
import { BsTable } from "react-icons/bs";

function Sidebar() {
  return (
    <Container>
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <NavLink activeclassname="active" to={"/catalogs"}>
        <div className="flex icon">
          <MdOutlineDashboardCustomize />
        </div>
        Catalogs
      </NavLink>
      <NavLink activeclassname="active" to={"/news"}>
        <div className="flex icon">
          <RiNewspaperLine />
        </div>
        News
      </NavLink>
    </Container>
  );
}

export default Sidebar;
const Container = styled.div`
  min-width: 286px;
  max-width: 286px;
  padding: 40px 30px;
  box-sizing: border-box;
  height: calc(100vh - 40px);
  border-radius: 15px;
  overflow: auto;
  position: sticky;
  top: 15px;
  .logo {
    margin-bottom: 40px;
    img {
      height: 60px;
    }
  }
  .icon {
    border-radius: 0.4rem;
    background-color: #fff;
    padding: 10px;
    color: #0f6181;
    font-size: 20px;
    box-shadow: 0 0.3125rem 0.625rem 0 rgba(39, 39, 39, 0.12) !important;
    transition: all 0.3s ease;
  }

  a {
    text-transform: uppercase;
    display: flex;
    gap: 15px;
    align-items: center;
    font-size: 14px;
    margin-top: 20px;
    padding: 5px;
    border-radius: 0.5em;
    font-weight: 500;
    transition: all 0.3s ease;
    font-weight: 500;
    letter-spacing: 0.5px;
    &:hover {
      background-color: #ffffffb2;
    }
    path {
      stroke: #0f6181;
    }
    &.active {
      .icon {
        background-color: #0f6181;
        color: white !important;
        path {
          stroke: white;
        }
      }
      color: #0f6181;
      background-color: #fff;
      box-shadow: 0 20px 27px 0 rgba(0, 0, 0, 0.05);
    }
  }
`;
