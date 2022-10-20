import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../../API";
import { useDataContext } from "../../contexts/DataContext";
import Button from "../UI/Button";

const SubcatalogProducts = () => {
  const [data, setdata] = useState([]);
  const { deleteProduct, addProduct } = useDataContext();
  const params = useParams();
  useEffect(() => {
    if (params.id) {
      fetch(API.subcatalogs.getProductst + params.id)
        .then((i) => i.json())
        .then((i) => setdata(i.data || []));
    }
  }, []);
  const deleteHandler = async (n) => {
    await deleteProduct(n);
    if (params.id) {
      fetch(API.subcatalogs.getProductst + params.id)
        .then((i) => i.json())
        .then((i) => setdata(i.data || []));
    }
    // window.location.reload();
  };

  const addProductHandler = async (e) => {
    e.preventDefault();
    const data = {
      title: e.target.title.value,
      desc: e.target.desc.value,
      price: e.target.price.value,
      image: e.target.image.files[0],
      subCatalogId: params?.id,
    };
    await addProduct(data);
    fetch(API.subcatalogs.getProductst + params.id)
      .then((i) => i.json())
      .then((i) => setdata(i.data || []));
  };

  return (
    <div>
      <br />
      <form onSubmit={addProductHandler} className="grid grid-cols-4 gap-4">
        <input type="file" className="p-4" name="image" />
        <input type="text" className="p-4" placeholder="Title" name="title" />
        <input
          type="text"
          className="p-4"
          placeholder="Description"
          name="desc"
        />
        <input type="number" className="p-4" placeholder="Price" name="price" />
        <div></div>
        <div></div>
        <div></div>
        <Button>Add new product</Button>
      </form>
      <br />
      <div className="grid grid-cols-4 mt-4 gap-2">
        {data.map((i) => (
          <div className="p-4 shadow bg-white text-center flex flex-col gap-2 justify-start">
            <img
              src={i?.productImageName?.String}
              className="w-full aspect-square object-cover rounded"
              alt=""
            />
            {i.productName}
            <span
              className="text-[red]"
              onClick={() => deleteHandler(i.productId)}
            >
              Delete
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubcatalogProducts;
