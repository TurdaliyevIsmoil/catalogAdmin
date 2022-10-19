import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useDataContext } from "../../contexts/DataContext";
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
  comment_uz: "",
  comment_ru: "",
  comment_en: "",
};

function SingleTravel() {
  const [item, setitem] = useState(null);
  const [edit, setedit] = useState(true);
  const [values, setvalues] = useState(initialValues);
  const [img, setimg] = useState();
  const itemValues = (item) => ({
    id: item ? item.id : "",
    title_uz: item.title.uz,
    title_ru: item.title.ru,
    title_en: item.title.en,
    location_uz: item.location.uz,
    location_ru: item.location.ru,
    location_en: item.location.en,
    comment_uz: item.comment.uz,
    comment_ru: item.comment.ru,
    comment_en: item.comment.en,
  });

  const navigate = useNavigate();
  const { addItem, getCommentItem, updateStudyItem, deleteStudyItem } =
    useDataContext();

  const { id } = useParams();
  useEffect(() => {
    setedit(() => id !== "add");
    if (edit) {
      setitem(getCommentItem(id));
    }
  }, []);
  useEffect(() => {
    console.log(item);
    if (item) {
      console.log(item);
      setvalues(itemValues(item));
    }
  }, [item]);

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setvalues((state) => ({ ...state, [name]: value }));
  };

  const imageHandler = (e) => {
    console.log(e.target.files[0])
    setimg(e.target.files[0]);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const newData = {
      title: {
        uz: values.title_uz,
        ru: values.title_ru,
        en: values.title_en,
      },
      location: {
        uz: values.location_uz,
        ru: values.location_ru,
        en: values.location_en,
      },
      comment: {
        uz: values.comment_uz,
        ru: values.comment_ru,
        en: values.comment_en,
      },
      img: img ? img : item.img,
    };
    if (edit) {
      updateStudyItem(newData, item.id, "clients");
    } else {
      addItem(newData, "clients");
    }
    navigate("/clients");
  };

  const deleteHandler = () => {
    deleteStudyItem(item, "clients");
    navigate("/clients");
  };

  return (
    <Container>
      <div className="row">
        <label>Ism Familya</label>
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
          Qayerdan <span>Misol: Polsha</span>
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
          Izoh <span>Misol: 3-4 gapdan iborat</span>
        </label>
        <div className="inputs">
          <textarea
            value={values.comment_uz}
            name="comment_uz"
            rows={7}
            onChange={inputChangeHandler}
            placeholder="Izoh ..."
          ></textarea>
          <textarea
            value={values.comment_ru}
            name="comment_ru"
            rows={7}
            onChange={inputChangeHandler}
            placeholder="Kомментарий ..."
          ></textarea>
          <textarea
            value={values.comment_en}
            name="comment_en"
            rows={7}
            onChange={inputChangeHandler}
            placeholder="Comment ..."
          ></textarea>
        </div>
      </div>
      <div className="row image">
        <label
          style={{
            padding: "5px",
            background: "#0f6181",
            color: "white",
          }}
        >
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
  textarea {
    resize: vertical;
    background-color: #ebebebe6;
    padding: 8px 16px;
    border: 0;
    box-sizing: border-box !important;
    font-size: 14px;
    border-radius: 5px;
    width: 100%;
    &:focus {
      border: 0;
      outline: none;
    }
  }

  .row {
    box-sizing: border-box;
    margin-top: 10px;
    &.image {
      margin-top: 15px;
      display: flex;
      align-items: center;
      gap: 15px;
      img {
        width: 40px;
        height: 40px;
        object-fit: cover;
      }
    }
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
