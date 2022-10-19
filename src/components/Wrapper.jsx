import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import styled from "styled-components";

function Wrapper() {
  return (
    <Container>
      <Navbar />
      <Outlet />
    </Container>
  );
}

export default Wrapper;

const Container = styled.div`
  width: 100%;
`;
