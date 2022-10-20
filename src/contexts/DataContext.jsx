import { createContext, useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import API from "../API";
import reducer from "../reducers/DataReducer";
import {
  APPLICATIONS_DATA,
  CATALOGS_DATA,
  LOADING_END,
  LOADING_START,
  LOGIN,
  NEWS_DATA,
  SERVICES_DATA,
  TABLES_DATA,
} from "../utils/constants";

const Data = createContext();

const initialState = {
  tables: [],
  catalogs: [],
  news: [],
  services: [],
  applications: [],
  loading: true,
  auth: false,
  token: "",
};

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  // Fetch
  const fetchCatalogs = async () => {
    loadingStart();
    await fetch(API.catalogs.getCatalogs)
      .then((e) => (e.ok ? e.json() : Error("Something went wrong")))
      .then(
        (d) => d.data !== null && dispatch({ type: CATALOGS_DATA, payload: d })
      )
      .catch((e) => console.log(e));
    loadingEnd();
  };

  const fetchNews = async () => {
    loadingStart();
    await fetch(API.news.getNewsS + "?offset=0&limit=12")
      .then((e) => (e.ok ? e.json() : Error("Something went wrong")))
      .then((d) => d.data !== null && dispatch({ type: NEWS_DATA, payload: d }))
      .catch((e) => console.log(e));
    loadingEnd();
  };

  const deleteProduct = async (id) => {
    await fetch(API.product.delete + id, {
      method: "DELETE",
      headers: { Authorization: state.token },
    });
  };
  const deleteNews = async (id) => {
    await fetch(API.news.delete + id, {
      method: "DELETE",
      headers: { Authorization: state.token },
    });
  };

  const addCategory = async (data) => {
    loadingStart();
    var myHeaders = new Headers();
    myHeaders.append("Authorization", state.token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      catalogIsTop: false,
      catalogName: data,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(API.catalogs.create, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    fetchCatalogs();
  };

  const addSubCategory = async (data, id) => {
    loadingStart();
    var myHeaders = new Headers();
    myHeaders.append("Authorization", state.token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      catalogId: +id,
      subcatalogIsTop: false,
      subcatalogName: data,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(API.subcatalogs.create, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    fetchCatalogs();
  };
  const deleteCategory = async (id) => {
    loadingStart();
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
      headers: {
        Authorization: state.token,
      },
    };

    await fetch(API.catalogs.delete + id, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    fetchCatalogs();
  };
  const deleteSubCategory = async (id) => {
    loadingStart();
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
      headers: {
        Authorization: state.token,
      },
    };

    await fetch(API.subcatalogs.delete + id, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    fetchCatalogs();
  };
  const updateCategory = async (id, data) => {
    loadingStart();
    var requestOptions = {
      method: "PUT",
      redirect: "follow",
      headers: {
        Authorization: state.token,
      },
      body: JSON.stringify({
        catalogIsTop: false,
        catalogName: data,
        id: id,
      }),
    };

    await fetch(API.catalogs.delete + id, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    fetchCatalogs();
  };
  const addProduct = async (data) => {
    loadingStart();
    let post_id = null;
    await fetch(API.product.create, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${state.token}`,
      },
      body: JSON.stringify({
        productDescriptions: data.desc,
        productIsActive: true,
        productIsNew: true,
        productIsTop: false,
        productName: data.title,
        productPrice: data.price,
        subCatalogID: +data.subCatalogId,
      }),
    })
      .then((d) => d.json())
      .then((d) => (post_id = d.data))
      .catch((e) => console.log(e));
    await ImgUploader(
      data.image,
      "http://49.12.13.213:9090/api/v1/product/upload-image?product-id=",
      post_id
    );
    fetchCatalogs();
  };
  const addNews = async (data) => {
    loadingStart();
    let post_id = null;
    await fetch(API.news.create, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${state.token}`,
      },
      body: JSON.stringify({
        newsBody: data.desc,
        newsTitle: data.title,
      }),
    })
      .then((d) => d.json())
      .then((d) => (post_id = d.data))
      .catch((e) => console.log(e));
    await ImgUploader(
      data.image,
      "http://49.12.13.213:9090/api/v1/home-news/upload-image?home-news-id=",
      post_id
    );
    fetchCatalogs();
  };
  // const addTable = async (data) => {
  //   loadingStart();
  //   let post_id = null;
  //   await fetch(API.table.create, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `bearer ${state.token}`,
  //     },
  //     body: JSON.stringify({
  //       post_body: data.body,
  //       post_body_ru: data.body_ru,
  //       post_title: data.title,
  //       post_title_ru: data.title_ru,
  //       price: data.price,
  //       duration: data.duration,
  //       post_img_url: "",
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((response) => (post_id = response.data))
  //     .catch((e) => console.log(e));
  //   await ImgUploader(data.img, API.table.updateImage, post_id);
  //   fetchTables();
  //   navigate("/tables");
  // };

  // // PUT
  // const updateNews = async (data) => {
  //   loadingStart();
  //   const data1 = {
  //     post_body: data.body,
  //     post_body_ru: data.body_ru,
  //     post_title: data.title,
  //     post_title_ru: data.title_ru,
  //     post_img_url: "",
  //   };
  //   const data2 = {
  //     post_body: data.body,
  //     post_body_ru: data.body_ru,
  //     post_title: data.title,
  //     post_title_ru: data.title_ru,
  //     post_img_url: "",
  //     post_img_path: data.imgPath,
  //   };
  //   await fetch(API.news.update + data.id, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `bearer ${state.token}`,
  //     },
  //     body: JSON.stringify(data.img ? data1 : data2),
  //   }).catch((e) => console.log(e));
  //   if (data.img) {
  //     await ImgUploader(data.img, API.news.updateImage, data.id);
  //   }
  //   fetchNews();
  //   navigate("/news");
  // };
  // const updateService = async (data) => {
  //   loadingStart();
  //   const data1 = {
  //     post_body: data.body,
  //     post_body_ru: data.body_ru,
  //     post_title: data.title,
  //     post_title_ru: data.title_ru,
  //     price: data.price,
  //     post_date: data.post_date,
  //     post_img_url: "",
  //   };
  //   const data2 = {
  //     post_body: data.body,
  //     post_body_ru: data.body_ru,
  //     post_title: data.title,
  //     post_title_ru: data.title_ru,
  //     price: data.price,
  //     post_date: data.post_date,
  //     post_img_url: "",
  //     post_img_path: data.imgPath,
  //   };
  //   await fetch(API.service.update + data.id, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `bearer ${state.token}`,
  //     },
  //     body: JSON.stringify(data.img ? data1 : data2),
  //   }).catch((e) => console.log(e));
  //   if (data.img) {
  //     await ImgUploader(data.img, API.service.updateImage, data.id);
  //   }
  //   navigate("/services");
  //   fetchServices();
  // };
  // const updateTable = async (data) => {
  //   loadingStart();
  //   const data1 = {
  //     post_body: data.body,
  //     post_body_ru: data.body_ru,
  //     post_title: data.title,
  //     post_title_ru: data.title_ru,
  //     price: data.price,
  //     post_date: data.post_date,
  //     date: data.date,
  //     duration: data.duration,
  //     format: data.format,
  //     post_img_url: "",
  //   };
  //   const data2 = {
  //     post_body: data.body,
  //     post_body_ru: data.body_ru,
  //     post_title: data.title,
  //     post_title_ru: data.title_ru,
  //     price: data.price,
  //     post_date: data.post_date,
  //     date: data.date,
  //     duration: data.duration,
  //     format: data.format,
  //     post_img_url: "",
  //     post_img_path: data.imgPath,
  //   };
  //   await fetch(API.table.update + data.id, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `bearer ${state.token}`,
  //     },
  //     body: JSON.stringify(data.img ? data1 : data2),
  //   }).catch((e) => console.log(e));
  //   if (data.img) {
  //     await ImgUploader(data.img, API.table.updateImage, data.id);
  //   }
  //   fetchTables();
  //   navigate("/tables");
  // };

  // // Deletes
  // const deleteNews = (id) => {
  //   loadingStart();
  //   fetch(API.news.delete + id, {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `bearer ${state.token}`,
  //     },
  //   })
  //     .then((e) => (e.ok ? e.json() : Error("Something went wrong")))
  //     .then((d) => {
  //       navigate("/news");
  //       fetchNews();
  //     })
  //     .catch((e) => console.log(e));
  // };
  // const deleteService = (id) => {
  //   loadingStart();
  //   fetch(API.service.delete + id, {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `bearer ${state.token}`,
  //     },
  //   })
  //     .then((e) => (e.ok ? e.json() : Error("Something went wrong")))
  //     .then((d) => {
  //       fetchServices();
  //       navigate("/services");
  //     })
  //     .catch((e) => console.log(e));
  // };
  // const deleteTable = (id) => {
  //   loadingStart();
  //   fetch(API.table.delete + id, {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `bearer ${state.token}`,
  //     },
  //   })
  //     .then((e) => console.log(e))
  //     .then((d) => {
  //       navigate("/tables");
  //       fetchTables();
  //     })
  //     .catch((e) => console.log(e));
  // };

  // Helpers
  const ImgUploader = async (img, api, id) => {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `${state.token}`);
    let formdata = new FormData();
    formdata.append("file", img);
    let requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
    await fetch(api + id, requestOptions)
      .then((response) => response.json())
      .catch((error) => console.log("error", error));
  };

  // Ui helpers
  const loadingEnd = () => {
    dispatch({
      type: LOADING_END,
    });
  };
  const loadingStart = () => {
    dispatch({
      type: LOADING_START,
    });
  };

  const login = (u, p) => {
    loadingStart();

    const inf = {
      password: p.toString(),
      username: u.toString(),
    };
    // Request
    fetch(API.admin.login, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inf),
    })
      // Cheking
      .then((d) => {
        if (d.status === 200) return d.json();
        else {
          alert("Wrong information!");
          throw new Error("Incorrent Data!");
        }
      })
      .then((data) => dispatch({ type: LOGIN, payload: data }))
      .catch((e) => console.log(e));
    loadingEnd();
  };

  useEffect(() => {
    const login = localStorage.getItem("auth");
    const login_exp = localStorage.getItem("auth_exp");
    if (+login_exp < new Date().getTime()) {
      localStorage.removeItem("auth");
      localStorage.removeItem("auth_exp");
    } else {
      dispatch({ type: LOGIN, payload: { token: login } });
    }
    loadingEnd();
  }, []);
  useEffect(() => {
    if (state.auth) {
      fetchCatalogs();
      // fetchServices();
      fetchNews();
      // fetchTables();
      // fetchApplications();
    }
  }, [state.auth]);
  return (
    <Data.Provider
      value={{
        ...state,
        loadingEnd,
        loadingStart,
        login,
        fetchCatalogs,
        addCategory,
        deleteCategory,
        deleteCategory,
        updateCategory,
        deleteProduct,
        addSubCategory,
        deleteSubCategory,
        addProduct,
        addNews,
        deleteNews,
      }}
    >
      {children}
    </Data.Provider>
  );
};

export const useDataContext = () => {
  return useContext(Data);
};
