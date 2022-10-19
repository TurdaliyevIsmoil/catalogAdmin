import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useDataContext } from "../../contexts/DataContext";
import EditorToolbar, { modules, formats } from "../Quill";
import Button from "../UI/Button";
import Input from "../UI/Input";
const initialValues = {
  id: "",
  title_uz: "",
  title_ru: "",
  title_en: "",
  location_uz: "",
  location_ru: "",
  location_en: "",
  employment_uz: "",
  employment_ru: "",
  employment_en: "",
  desc_uz: "",
  desc_ru: "",
  desc_en: "",
};
function SingleTravel() {
  const [item, setitem] = useState(null);
  const [edit, setedit] = useState(true);
  const [values, setvalues] = useState(initialValues);
  const [quillUz, setquillUz] = useState("");
  const [quillEn, setquillEn] = useState("");
  const [quillRu, setquillRu] = useState("");
  const [img, setimg] = useState();
  const itemValues = (item) => ({
    id: item ? item.id : "",
    title_uz: item.title.uz,
    title_ru: item.title.ru,
    title_en: item.title.en,
    location_uz: item.location.uz,
    location_ru: item.location.ru,
    location_en: item.location.en,
    employment_uz: item.employment.uz,
    employment_ru: item.employment.ru,
    employment_en: item.employment.en,
    desc_uz: item.desc.uz,
    desc_ru: item.desc.ru,
    desc_en: item.desc.en,
  });

  const navigate = useNavigate();
  const { addItem, getWorkItem, updateStudyItem, deleteStudyItem } =
    useDataContext();

  const { id } = useParams();
  useEffect(() => {
    setedit(() => id !== "add");
    if (edit) {
      setitem(getWorkItem(id));
    }
  }, []);
  useEffect(() => {
    if (item) {
      console.log(item);
      setvalues(itemValues(item));
      setquillEn(item.full_desc.en);
      setquillRu(item.full_desc.uz);
      setquillUz(item.full_desc.en);
    }
  }, [item]);

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setvalues((state) => ({ ...state, [name]: value }));
  };

  const imageHandler = (e) => {
    setimg(e.target.files[0]);
  };
  const quillChangeHandlerUz = (e) => {
    setquillUz(e);
  };
  const quillChangeHandlerRu = (e) => {
    setquillRu(e);
  };
  const quillChangeHandlerEn = (e) => {
    setquillEn(e);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const newData = {
      title: {
        uz: values.title_uz,
        ru: values.title_ru,
        en: values.title_en,
      },
      desc: {
        uz: values.desc_uz,
        ru: values.desc_ru,
        en: values.desc_en,
      },
      location: {
        uz: values.location_uz,
        ru: values.location_ru,
        en: values.location_en,
      },
      employment: {
        uz: values.employment_uz,
        ru: values.employment_ru,
        en: values.employment_en,
      },
      full_desc: {
        uz: quillUz,
        ru: quillRu,
        en: quillEn,
      },
      img: img ? img : item.img,
    };
    if (edit) {
      updateStudyItem(newData, item.id, 'work');
    } else {
      addItem(newData, "work");
    }
    navigate("/work");
  };

  const deleteHandler = () => {
    deleteStudyItem(item, "work");
    navigate("/work");
  };

  return (
    <Container>
      <div className="row">
        <label>
          Sarlovha <span>Misol: Gavaya orollari</span>
        </label>
        <div className="inputs">
          <Input
            value={values.title_uz}
            type="text"
            name="title_uz"
            placeholder="UZ"
            onChange={inputChangeHandler}
          />
          <Input
            value={values.title_ru}
            type="text"
            name="title_ru"
            placeholder="RUS"
            onChange={inputChangeHandler}
          />
          <Input
            value={values.title_en}
            type="text"
            name="title_en"
            placeholder="ENG"
            onChange={inputChangeHandler}
          />{" "}
        </div>
      </div>
      <div className="row">
        <label>
          Joylashuv <span>Misol: Polsha</span>
        </label>
        <div className="inputs">
          <Input
            value={values.location_uz}
            type="text"
            name="location_uz"
            placeholder="UZ"
            onChange={inputChangeHandler}
          />
          <Input
            value={values.location_ru}
            type="text"
            name="location_ru"
            placeholder="RUS"
            onChange={inputChangeHandler}
          />
          <Input
            value={values.location_en}
            type="text"
            name="location_en"
            placeholder="ENG"
            onChange={inputChangeHandler}
          />
        </div>
      </div>
      <div className="row">
        <label>
          Ish beruvchi <span>Misol: Qadoqlash firmasi </span>
        </label>
        <div className="inputs">
          <Input
            value={values.employment_uz}
            type="text"
            name="employment_uz"
            onChange={inputChangeHandler}
            placeholder="UZ"
          />
          <Input
            value={values.employment_ru}
            type="text"
            name="employment_ru"
            onChange={inputChangeHandler}
            placeholder="RU"
          />
          <Input
            value={values.employment_en}
            type="text"
            name="employment_en"
            onChange={inputChangeHandler}
            placeholder="EN"
          />
        </div>
      </div>
      <div className="row extra-data">
        <label>
          Qisqa ma'lumot <span>Misol: 3-4 gapdan iborat</span>
        </label>
        <Input
          value={values.desc_uz}
          type="text"
          name="desc_uz"
          onChange={inputChangeHandler}
          placeholder="Sayohat davomida ..."
        />
        <Input
          value={values.desc_ru}
          type="text"
          name="desc_ru"
          onChange={inputChangeHandler}
          placeholder="Во время поездки ..."
        />
        <Input
          value={values.desc_en}
          type="text"
          name="desc_en"
          onChange={inputChangeHandler}
          placeholder="During the trip ..."
        />
      </div>
      <div className="row image">
        <label>
          Rasm Tanlash
          <Input
            // value={item ? item.img : values.img}
            style={{ display: "none" }}
            type="file"
            name="img"
            onChange={imageHandler}
          />
        </label>
      </div>

      <div className="editor">
        <EditorToolbar id={"toolbar_uz"} />
        <ReactQuill
          value={quillUz}
          onChange={quillChangeHandlerUz}
          theme="snow"
          placeholder={"To'liq malumot ..."}
          modules={modules("toolbar_uz")}
          formats={formats}
        />
      </div>
      <div className="editor">
        <EditorToolbar id={"toolbar_ru"} />
        <ReactQuill
          value={quillRu}
          theme="snow"
          onChange={quillChangeHandlerRu}
          placeholder={"Подробная информация ..."}
          modules={modules("toolbar_ru")}
          formats={formats}
        />
      </div>
      <div className="editor">
        <EditorToolbar id={"toolbar_en"} />
        <ReactQuill
          value={quillEn}
          onChange={quillChangeHandlerEn}
          theme="snow"
          placeholder={"Detailed information ..."}
          modules={modules("toolbar_en")}
          formats={formats}
        />
      </div>
      <Button type="button" onClick={onSubmitHandler}>
        {edit === true ? "Yangilash" : "Saqlash"}
      </Button>
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

export default SingleTravel;

const Container = styled.form`
  background-color: #ffffffbc;
  margin-top: 30px;
  padding: 15px;
  border-radius: 10px;
  .ql-toolbar,
  .quill {
    background-color: #ffffffd3;
  }
  .editor {
    margin-top: 30px;
  }
  .inputs {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 15px;
  }
  label {
    font-size: 18px;
    span {
      font-size: 12px;
      color: grey;
    }
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
`;
