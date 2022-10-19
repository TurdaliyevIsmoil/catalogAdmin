import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDataContext } from "../../contexts/DataContext";
import Card from "../Card";
import Button from "../UI/Button";

function Tables() {
  const navigate = useNavigate();
  const { tables } = useDataContext();
  return (
    <Container>
      <Button onClick={() => navigate("add")}>Qo'shish</Button>
      <div className="row">
        {tables.map((i) => (
          <Card
            title={i.post_title}
            secondary={i.price}
            img={"https://"+i.post_img_path}
            path={i.id}
          />
        ))}
      </div>
    </Container>
  );
}

export default Tables;
const Container = styled.div`
  margin-top: 15px;
  & > .row {
    margin-top: 30px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 30px;
  }

  img {
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
  }
`;
