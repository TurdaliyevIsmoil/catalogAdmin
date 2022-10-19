import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useDataContext } from "../../contexts/DataContext";
import Button from "../UI/Button";
import Input from "../UI/Input";
import BundledEditor from "../../BundledEditor";
import EditorInit from "../../utils/EditorInit";
import { BiCloudUpload } from "react-icons/bi";

function SingleTable() {
  const [values, setValues] = useState({
    title: null,
    title_ru: null,
    price: null,
    duration: null,
    date: null,
  });
  const [edit, setedit] = useState(true);
  const [img, setimg] = useState();
  const editorRef = useRef(null);
  const editorRefRu = useRef(null);
  const [imagePath, setimagePath] = useState();
  const [descLang, setdescLang] = useState("uz");
  const { addTable, deleteTable, tables, updateTable } = useDataContext();
  const { id } = useParams();
  useEffect(() => {
    setedit(() => id !== "add");
    if (edit) {
      setValues((i) => ({
        title_ru: getItem(id)?.post_title_ru,
        title: getItem(id)?.post_title,
        price: getItem(id)?.price,
        duration: getItem(id)?.duration,
        date: getItem(id)?.date,
      }));
      setimagePath(getItem(id) ? "https://" + getItem(id).post_img_path : null);
    }
  }, [tables]);

  const imageHandler = (e) => {
    setimg(e.target.files[0]);
    // console.log()
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setimagePath(reader.result);
    };
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const readyContent = {
      title: values.title,
      title_ru: values.title_ru,
      price: values.price,
      body: editorRef.current.getContent(),
      body_ru: editorRefRu.current.getContent(),
      post_date: getItem(id)?.post_date,
      format: e.target.format.value,
      duration: values.duration,
      date: values.date,
      img: img,
      imgPath: imagePath,
    };
    if (edit) {
      updateTable({ ...readyContent, id });
    } else {
      addTable(readyContent);
    }
  };
  const deleteHandler = () => {
    deleteTable(+id);
  };

  const getItem = (id) => {
    return tables.filter((i) => i.id === +id)[0];
  };

  return (
    <Container enctype="multipart/form-data" onSubmit={onSubmitHandler}>
      <div className="row">
        <label>Title</label>
        <div className="inputs">
          <Input
            type="text"
            name="title_uz"
            value={values.title}
            placeholder="UZ"
            onInput={(i) => setValues((e) => ({ ...e, title: i.target.value }))}
          />
          <Input
            type="text"
            name="title_ru"
            value={values.title_ru}
            placeholder="RUS"
            onInput={(i) =>
              setValues((e) => ({ ...e, title_ru: i.target.value }))
            }
          />
          <Input
            type="text"
            name="price"
            value={values.price}
            placeholder="Price"
            onInput={(i) => setValues((e) => ({ ...e, price: i.target.value }))}
          />
        </div>
      </div>
      <div className="row">
        <div className="inputs">
          <Input
            type="text"
            name="duration"
            value={values.duration}
            placeholder="7 (kun), 9:00-11:00 (soat dan-gacha)"
            onChange={(i) =>
              setValues((e) => ({ ...e, duration: i.target.value }))
            }
          />
          <Input
            type="date"
            alt="Start Date"
            name="date"
            value={values.date}
            placeholder="Start date"
            onInput={(i) => setValues((e) => ({ ...e, date: i.target.value }))}
          />
          <select name="format" id="">
            <option value="all">All</option>
            <option value="online" selected={getItem(id)?.format === "online"}>
              Online
            </option>
            <option
              value="offline"
              selected={getItem(id)?.format === "offline"}
            >
              Offline
            </option>
          </select>
        </div>
      </div>
      <div
        className="row image flex"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <label className="flex">
          <BiCloudUpload />
          {img ? img.name.slice(0, 15) : "Select Image"}
          <Input
            // value={item ? item.img : values.img}
            style={{ display: "none" }}
            type="file"
            name="img"
            onChange={imageHandler}
          />
        </label>
      </div>
      {imagePath ? <img className="main-image" src={imagePath} /> : ""}
      <div className="tab flex justify-start">
        <div
          onClick={() => setdescLang("uz")}
          className={`${descLang == "uz" ? "active" : ""}`}
        >
          Uzbek
        </div>
        <div
          onClick={() => setdescLang("ru")}
          className={`${descLang == "ru" ? "active" : ""}`}
        >
          Russian
        </div>
      </div>
      <div className={`bundleEditor ${descLang === "uz" ? "active" : ""}`}>
        <BundledEditor
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue={edit && tables ? getItem(id)?.post_body : ""}
          init={{ ...EditorInit }}
        />
      </div>
      <div className={`bundleEditor ${descLang === "ru" ? "active" : ""}`}>
        <BundledEditor
          onInit={(evt, editor) => (editorRefRu.current = editor)}
          initialValue={edit && tables ? getItem(id)?.post_body_ru : ""}
          init={{ ...EditorInit }}
        />
      </div>
      <br />
      <Button type="submit">{edit === true ? "Yangilash" : "Saqlash"}</Button>
      {edit === true ? (
        <Button
          type="button"
          onClick={deleteHandler}
          style={{ background: "red", marginLeft: "15px" }}
        >
          O'chirish
        </Button>
      ) : null}
    </Container>
  );
}

export default SingleTable;

const Container = styled.form`
  background-color: #ffffffbc;
  margin-top: 30px;
  padding: 15px;
  border-radius: 10px;
  .bundleEditor {
    height: 0;
    overflow: hidden;
    &.active {
      height: auto;
    }
  }
  .tab {
    margin-top: 20px;
    justify-content: flex-start;
    background-color: #ededed;
    border-radius: 4px 4px 0 0;
    div {
      transition: all 0.3s;
      cursor: pointer;
      padding: 16px 40px;
      &.active,
      &:hover {
        color: white;
        background: #43a6e0;
      }
    }
  }
  .main-image {
    border-radius: 8px;
    overflow: hidden;
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
    margin-top: 20px;
  }
  .ql-toolbar,
  .quill {
    background-color: #ffffffd3;
  }
  .image {
    background-color: #ebebebe6;
    height: 100%;
    padding: 8px 10px;
    margin-top: 20px !important;
    border-radius: 4px;
    color: grey;
    label {
      cursor: pointer;
      gap: 6px;
      &:hover {
        color: #3f3f3f;
      }
    }
  }
  .editor {
  }
  select {
    padding: 10px;
    background-color: #ededed;
    color: black;
    border: 0;
    border-radius: 6px;
  }
  .tox-tinymce {
    border-radius: 0 0 10px 10px;
  }
  .inputs {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 15px;
    &.four {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }
  label {
    font-size: 18px;
    span {
      font-size: 12px;
      color: grey;
    }
  }
  h2 {
    margin-bottom: 0px;
    font-weight: 600;
    color: #0f6181;
  }
  .row {
    box-sizing: border-box;
    margin-top: 10px;

    &.extra-data {
      input {
        margin-top: 10px;
      }
    }
    &.grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 20px;
      .row {
        margin-top: 0 !important;
      }
    }
  }
  .mce-content-body {
    .mce-object-iframe {
      width: 100%;
      min-width: 100%;
      max-width: 100%;
    }
    iframe {
      width: 100%;
      min-width: 100%;
      max-width: 100%;
    }
  }
`;
