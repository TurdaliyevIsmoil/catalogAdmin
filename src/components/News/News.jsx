import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useDataContext } from "../../contexts/DataContext";
import Button from "../UI/Button";

function News() {
  const { news } = useDataContext();
  const navigate = useNavigate();
  const [data, setdata] = useState([]);
  const { deleteNews, addNews } = useDataContext();
  useEffect(() => {
    fetch("http://49.12.13.213:9090/api/v1/home-news/list?offset=0&limit=100")
      .then((i) => i.json())
      .then((i) => setdata(i.data || []));
  }, []);

  const deleteHandler = async (n) => {
    await deleteNews(n);
    await fetch(
      "http://49.12.13.213:9090/api/v1/home-news/list?offset=0&limit=100"
    )
      .then((i) => i.json())
      .then((i) => setdata(i.data || []));
  };

  const addNewsHandler = async (e) => {
    e.preventDefault();
    const data = {
      title: e.target.title.value,
      desc: e.target.desc.value,
      image: e.target.image.files[0],
    };
    await addNews(data);
    await fetch(
      "http://49.12.13.213:9090/api/v1/home-news/list?offset=0&limit=100"
    )
      .then((i) => i.json())
      .then((i) => setdata(i.data || []));
  };

  return (
    <Container>
      <form onSubmit={addNewsHandler} className="grid grid-cols-3 gap-4">
        <input type="file" className="p-4" name="image" />
        <input type="text" className="p-4" placeholder="Title" name="title" />
        <input
          type="text"
          className="p-4"
          placeholder="Description"
          name="desc"
        />
        <div></div>
        <div></div>
        <div></div>
        <Button>Add News</Button>
      </form>
      <div className="grid grid-cols-4 gap-5">
        {data.map((i) => (
          <div className="flex flex-col bg-[white] shadow rounded-md p-3 mt-8">
            <img
              src={i.NewsImageLink}
              className="w-full aspect-square object-cover"
              alt=""
            />
            <div className="flex flex-col">
              <h2 className="text-2xl mt-2">{i.newsTitle}</h2>
              <p className="text-base mt-2">{i.newsBody}</p>
            </div>
            <div
              className="text-xl text-[red] cursor-pointer text-center"
              onClick={() => deleteHandler(i.NewsId)}
            >
              Delete
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default News;
const Container = styled.div`
  margin-top: 30px;
  & > .row {
    margin-top: 30px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 30px;
  }
`;
