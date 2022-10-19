import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../../contexts/DataContext";

function Applications() {
  const navigate = useNavigate();
  const { applications } = useDataContext();
  return (
    <Container>
      <div className="row head">
        <div className="item">Id</div>
        <div className="item">Ism Familya</div>
        <div className="item">Xizmat</div>
        <div className="item">Sana</div>
      </div>
      {applications.map((i, id) => (
        <div className="row" onClick={() => navigate(`${i.id}`)}>
          <div className="item">#{++id}</div>
          <div className="item">{i.first_name + " " + i.last_name}</div>
          <div className="item study">
            <span>{i.type_service}</span>
          </div>
          <div className="item">
            {new Date(i.created_at).toLocaleDateString()}
          </div>
        </div>
      ))}
    </Container>
  );
}

export default Applications;

const Container = styled.div`
  margin-top: 30px;
  background-color: #ffffffbc;
  padding: 15px;
  border-radius: 15px;
  text-align: left;
  .row {
    cursor: pointer;
    display: grid;
    grid-template-columns: 0.5fr 1.5fr 1fr 1fr;
    padding: 10px 0;
    color: #0f6181;
    border-bottom: 1px solid #dddddd7f;
    transition: all 0.3s;
    &:hover {
      background-color: #fff;
    }
    &.head {
      padding: 15px 0;
      font-weight: bold;
      border-bottom: 1.5px solid #0f618178;
    }
    .item {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      span {
        padding: 5px 10px;
        color: white;
        border-radius: 5px;
      }
      &.study span {
        background-color: #068c96;
      }
      &.work span {
        background-color: #b49300;
      }
      &.travel span {
        background-color: #0f6181;
      }
    }
    .item:last-child {
      font-size: 20px;
      svg {
        padding: 5px;
        transition: all 0.3s;
        cursor: pointer;
      }
      & svg:first-child:hover {
        color: red;
      }
      & svg:last-child:hover {
        color: green;
      }
    }
  }
`;
