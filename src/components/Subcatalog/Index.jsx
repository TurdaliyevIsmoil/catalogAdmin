import React, { useEffect } from "react";
import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import API from "../../API";
import { useDataContext } from "../../contexts/DataContext";
import Button from "./../UI/Button";

const Subcatalog = () => {
  const [data, setdata] = useState([]);
  const { addSubCategory, deleteSubCategory } = useDataContext();
  const params = useParams();

  useEffect(() => {
    fetch(API.subcatalogs.getCatalogs)
      .then((i) => i.json())
      .then(
        (i) =>
          i &&
          setdata(i.data.filter((i) => +i?.catalog_id === +params?.id) || [])
      );
  }, []);

  const addSubcatalog = async (e) => {
    e.preventDefault();
    await addSubCategory(e.target.input.value, params.id);
    fetch(API.subcatalogs.getCatalogs)
      .then((i) => i.json())
      .then(
        (i) =>
          i &&
          setdata(() => i.data.filter((i) => +i?.catalog_id === +params?.id))
      );
  };

  const deleteSubCatalog = async (id) => {
    await deleteSubCategory(id);
    fetch(API.subcatalogs.getCatalogs)
      .then((i) => i.json())
      .then(
        (i) =>
          i && setdata(i.data.filter((i) => i?.catalog_id === params?.id) || [])
      );
  };

  return (
    <div>
      <form
        onSubmit={addSubcatalog}
        className="w-full mt-5 flex items-center gap-2"
      >
        <input
          type="text"
          className="p-3 rounded bg-[white] border  border-gray-400 grow"
          placeholder="Add something..."
          name="input"
        />
        <Button>Add</Button>
      </form>
      <div className="grid grid-cols-4 gap-4 mt-8">
        {data?.map((i) => (
          <div className="flex flex-col bg-[white] p-4 ">
            <NavLink to={`${i.subcatalogID}`} className="text-center">
              {i.subcatalogName}
            </NavLink>
            <div className="flex gap-2 mt-4">
              <button
                onClick={deleteSubCatalog.bind(this, i.subcatalogID)}
                className="p-2 w-full rounded bg-[red] text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subcatalog;
