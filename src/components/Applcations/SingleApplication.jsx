import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useDataContext } from "../../contexts/DataContext";
function SingleApplication() {
  const [item, setitem] = useState();

  const { applications } = useDataContext();
  const { id } = useParams();
  useEffect(() => {
    setitem(applications.filter((a) => a.id === +id)[0]);
    console.log(item);
  }, []);

  return item ? (
    <Container>
      <div className="row">
        <div className="column">
          <label>Ism Familya</label>
          <div className="muted">{item.first_name + " " + item.last_name}</div>
        </div>
        <div className="column">
          <label>Telefon raqam</label>
          <div className="muted">{item.phone_number}</div>
        </div>
      </div>
      <div className="row">
        <div className="column">
          <label>Xabar</label>
          <div className="muted">{item.text} </div>
        </div>
        <div className="column">
          <label>Xizmat Turi</label>
          <div className="muted">{item.type_service}</div>
        </div>
      </div>
      <div className="column">
        <label>Yuborilgan sana</label>
        <div className="muted">
          {new Date(item.created_at).toLocaleDateString()}
        </div>
      </div>
    </Container>
  ) : null;
}

export default SingleApplication;

const Container = styled.div`
  margin-top: 30px;
  padding: 15px;
  background-color: #ffffffbc;
  border-radius: 15px;
  .row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 15px;
  }
  .column {
    margin: 10px 0;
  }
  .muted {
    padding: 10px 16px;
    background-color: #ececec;
  }
`;