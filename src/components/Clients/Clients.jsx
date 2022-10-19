import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDataContext } from "../../contexts/DataContext";
import Card from "../Card";
import Button from "../UI/Button";

function Clients() {
  const navigate = useNavigate();
  const { comment } = useDataContext();
  return (
    <Container>
      <Button onClick={() => navigate("add")}>Qo'shish</Button>
      <div className="row">
        {comment.map((i) => (
          <Card
            title={i.title.uz}
            secondary={i.location.uz}
            img={i.img}
            path={i.id}
          />
        ))}
      </div>
    </Container>
  );
}

export default Clients;

const Container = styled.div`
  margin-top: 15px;
  & > .row {
    margin-top: 15px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 30px;
  }
`;
