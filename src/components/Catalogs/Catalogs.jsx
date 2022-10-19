import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useDataContext } from "../../contexts/DataContext";
import Button from "../UI/Button";

function Catalogs() {
  const [edit, setEdit] = useState(false);
  const { catalogs, addCategory, deleteCategory, updateCategory } =
    useDataContext();

  const submitHandler = (e) => {
    e.preventDefault();
    edit
      ? updateCategory(edit, e.target.input.value)
      : addCategory(e.target.input.value);
  };

  const editHandler = (id) => {
    document.getElementById("category-input").value = catalogs.find(
      (i) => i.id === id
    ).catalogName;
    setEdit(id);
    setImmediate(id);
  };
  return (
    <Container>
      <form className="flex items-stretch gap-2" onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Add Category"
          name="input"
          id="category-input"
          className="text-lg font-regular border border-gray-400 py-3 px-4 grow rounded-xl bg-white"
        />
        {edit && (
          <Button className="h-full" onClick={() => setEdit(false)}>
            Cancel
          </Button>
        )}
        <Button className="h-full">Add</Button>
      </form>
      <div className="row grid grid-cols-4 mt-5 w-full gap-5">
        {catalogs.map((i) => (
          <div className="py-3 px-2 flexflex-col justify-between rounded bg-white items-center shadow text-center">
            <NavLink to={`${i.id}`} className="text-xl mt-4">
              {i.catalogName}
            </NavLink>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => editHandler(i.id)}
                className="p-2 w-full rounded bg-[blue] text-white"
              >
                Edit
              </button>
              <button
                onClick={deleteCategory.bind(this, i.id)}
                className="p-2 w-full rounded bg-[red] text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default Catalogs;
const Container = styled.div`
  margin-top: 15px;
  img {
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
  }
`;
