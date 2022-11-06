import { data } from "autoprefixer";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../../API";
import { useDataContext } from "../../contexts/DataContext";
import Button from "../UI/Button";

const EditProduct = () => {
  const [data, setdata] = useState([]);
  const [values, setvalues] = useState({
    title: "",
    describe: "",
    price: 0,
  });
  const { editProduct } = useDataContext();
  const [switches, setswitches] = useState([]);
  const params = useParams();
  useEffect(() => {
    if (params.id) {
      (async function () {
        await fetch(API.product.getTable + params.id)
          .then((i) => i.json())
          .then((i) => {
            setvalues({
              title: i.data.productName,
              desc: i.data.productDescriptions,
              price: i.data.productPrice,
            });
            setdata(i.data || []);
          });
      })();
    }
  }, []);

  useEffect(() => {
    data !== [] &&
      fetch(
        API.product.getTemplate +
          "?product-id=" +
          data.productId +
          "&template-id=" +
          data.productTemplateId
      )
        .then((i) => i.json())
        .then((i) => {
          const newTemplate = i?.data?.body?.switch?.map((i) => ({
            title: i.switchTitle,
            options: i.switchBody.map((i) => ({
              price: i.switchItemPrice,
              title: i.switchItemTitle,
            })),
          }));
          setswitches(newTemplate || []);
        });
  }, [data]);

  const editProductHandler = async (e) => {
    e.preventDefault();
    if (e.target.image.files[0] && e.target.image.files[0].size > 1047152) {
      return alert("File is so large! You should change!");
    }
    const newdata = {
      productId: data.productId,
      title: e.target.title.value,
      desc: e.target.desc.value,
      price: e.target.price.value,
      image: e.target.image.files[0] || undefined,
      subCatalogId: params?.id,
    };
    const newTemplate = {
      body: {
        form: [
          {
            formItemTitle: "string",
            formItemType: "string",
          },
        ],
        switch: switches.map((i) => ({
          switchBody: i.options.map((i) => ({
            switchItemPrice: i.price,
            switchItemTitle: i.title,
          })),
          switchTitle: i.title,
        })),
      },
      title: "string",
    };
    const templateres = await fetch(API.template.create, {
      method: "POST",
      body: JSON.stringify(newTemplate),
    });
    const { data: templateData } = await templateres.json();
    await editProduct(newdata, templateData);

    await fetch(API.subcatalogs.getProducts + params.id)
      .then((i) => i.json())
      .then((i) => setdata(i.data || []));
    setswitches([]);
    e.target.reset();
  };

  const optionsAdder = () => {
    setswitches((p) => [
      ...p,
      {
        options: [
          {
            title: "",
            price: "",
          },
        ],
      },
    ]);
  };
  const optionsDeleter = (id) => {
    if (switches.length === 1) {
      return setswitches([]);
    } else {
      const deleted = switches.filter((i, n) => n !== id);
      setswitches(deleted);
    }
  };

  const subOptionsAdder = (id) => {
    const option = {
      ...switches[id],
      options: [
        ...switches[id].options,
        {
          title: "",
          price: "",
        },
      ],
    };
    const newswitches = switches.map((i, n) => (n === id ? option : i));
    setswitches(newswitches);
  };

  const optionTitleHandler = (e, id, optionId) => {
    const { value } = e.target;
    const newswitches = switches.map((i, n) =>
      n === id
        ? {
            ...i,
            options: i.options.map((i, n) =>
              n === optionId ? { ...i, title: value } : i
            ),
          }
        : i
    );
    setswitches(newswitches);
  };
  const optionPriceHandler = (e, id, optionId) => {
    const { value } = e.target;
    const newswitches = switches.map((i, n) =>
      n === id
        ? {
            ...i,
            options: i.options.map((i, n) =>
              n === optionId ? { ...i, price: value } : i
            ),
          }
        : i
    );
    setswitches(newswitches);
  };
  const deleteOption = (id, optionId) => {
    const newswitches = switches.map((i, n) =>
      n === id
        ? { ...i, options: [...i.options.filter((i, n) => n !== optionId)] }
        : i
    );
    setswitches(newswitches);
  };

  const opetionMainTitleHandler = (e, id) => {
    const { value } = e.target;
    const newswitches = switches.map((i, n) =>
      n === id ? { ...i, title: value } : i
    );
    setswitches(newswitches);
  };

  return (
    <div>
      <br />
      <form onSubmit={editProductHandler} className="">
        <div className="grid  grid-cols-4 gap-4">
          <input type="file" className="p-4" name="image" />
          <input
            type="text"
            className="p-4"
            placeholder="Title"
            value={values.title}
            name="title"
            onChange={(e) =>
              setvalues((p) => ({ ...p, title: e.target.value }))
            }
          />
          <input
            type="text"
            className="p-4"
            placeholder="Description"
            name="desc"
            value={values.desc}
            onChange={(e) => setvalues((p) => ({ ...p, desc: e.target.value }))}
          />
          <input
            type="number"
            className="p-4"
            placeholder="Price (sum )"
            name="price"
            value={values.price}
            onChange={(e) =>
              setvalues((p) => ({ ...p, price: +e.target.value }))
            }
          />
        </div>
        <div className="mt-3 text-3xl flex flex-row w-full justify-between items-center">
          <div>Options</div>
          <div
            onClick={optionsAdder}
            className="p-3 rounded bg-[green] text-base uppercase text-[white] hover:opacity-90 cursor-pointer"
          >
            Add
          </div>
        </div>
        <div className="rounded mb-5 mt-5">
          {switches.map((i, n) => (
            <div className="flex flex-col bg-[#eee] mt-5 p-4">
              <div className="grid w-full grid-cols-1 gap-4 flex">
                <input
                  type="text"
                  value={i.title}
                  className="p-4 grow"
                  onChange={(e) => opetionMainTitleHandler(e, n)}
                  placeholder="Title"
                />
                <div
                  onClick={() => subOptionsAdder(n)}
                  className="cursor-pointer p-2 px-4 bg-[green] text-white rounded text-xl"
                >
                  +
                </div>
              </div>
              {i.options.map((i, j, arr) => (
                <div className="grid w-full grid-cols-2 mt-2 gap-4">
                  <input
                    type="text"
                    className="p-4 rounded"
                    placeholder="Option Title"
                    value={i.title}
                    onChange={(e) => optionTitleHandler(e, n, j)}
                  />
                  <input
                    value={i.price}
                    onChange={(e) => optionPriceHandler(e, n, j)}
                    type="text"
                    className="p-4 rounded"
                    placeholder="Option Price"
                  />
                  {j === arr.length - 1 && (
                    <div
                      onClick={() => deleteOption(n, j)}
                      className="p-2 rounded text-center col-start-1 col-end-3 opacity-70 bg-[red] text-white"
                    >
                      Delete option
                    </div>
                  )}
                </div>
              ))}
              {switches.length - 1 === n && (
                <input
                  type="button"
                  className="p-4 mt-2 w-full rounded bg-[red] text-white"
                  value="Delete"
                  onClick={() => optionsDeleter(n)}
                />
              )}
            </div>
          ))}
        </div>
        <div></div>
        <div></div>
        <div></div>
        <Button>Update</Button>
      </form>
      <br />
    </div>
  );
};

export default EditProduct;
