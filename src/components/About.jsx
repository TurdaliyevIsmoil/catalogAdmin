import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDataContext } from "../contexts/DataContext";
import EditorToolbar, { modules, formats } from "./Quill";
import Button from "./UI/Button";

function About() {
  const { about, updateStudyItem } = useDataContext();
  const [quillUz, setquillUz] = useState("");
  const [quillRu, setquillRu] = useState("");
  const [quillEn, setquillEn] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (about) {
      setquillUz(about.uz);
      setquillRu(about.ru);
      setquillEn(about.en);
    }
  }, [about]);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const newData = {
      uz: quillUz,
      ru: quillRu,
      en: quillEn,
    };
    updateStudyItem(newData, about.id, "about");
    navigate("/about");
  };
  return (
    <Container>
      <div className="editor">
        <EditorToolbar id={"toolbar"} />
        <ReactQuill
          value={quillUz || ""}
          onChange={setquillUz}
          theme="snow"
          placeholder={"UZ"}
          modules={modules("toolbar")}
          formats={formats}
        />{" "}
        <br />
        <EditorToolbar id={"toolbar1"} />
        <ReactQuill
          value={quillRu || ""}
          onChange={setquillRu}
          theme="snow"
          placeholder={"RU"}
          modules={modules("toolbar1")}
          formats={formats}
        />
        <br />
        <EditorToolbar id={"toolbar2"} />
        <ReactQuill
          value={quillEn || ""}
          onChange={setquillEn}
          theme="snow"
          placeholder={"EN"}
          modules={modules("toolbar2")}
          formats={formats}
        />
      </div>

      <Button onClick={onSubmitHandler}>Saqlash</Button>
    </Container>
  );
}

export default About;

const Container = styled.div`
  margin-top: 32px;
  .editor {
    background-color: #ffffffc7;
  }
`;
