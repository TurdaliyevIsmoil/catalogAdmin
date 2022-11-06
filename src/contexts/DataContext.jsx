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
  const addProduct = async (data, tId) => {
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
    await ImgUploader(data.image, API.product.updateImage, post_id);
    await fetch(
      `${API.template.connect}?product-id=${post_id}&template-id=${tId}`
    );
    fetchCatalogs();
  };
  const editProduct = async (data, tId) => {
    loadingStart();
    let post_id = null;
    await fetch(API.product.update, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${state.token}`,
      },
      body: JSON.stringify({
        productDescriptions: data.desc,
        productIsActive: true,
        productId: data.productId,
        productIsNew: true,
        productIsTop: false,
        productName: data.title,
        productPrice: data.price,
        subCatalogID: +data.subCatalogId,
      }),
    })
      .then((d) => d.json())
      .then((d) => (post_id = data.productId))
      .catch((e) => console.log(e));
    if (data.image)
      await ImgUploader(data.image, API.product.updateImage, post_id);
    await fetch(
      `${API.template.update}?product-id=${data.productId}&template-id=${tId}`,
      { method: "PUT" }
    );
    fetchCatalogs();
    navigate(-1);
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
    await ImgUploader(data.image, API.news.updateImage, post_id);
    fetchCatalogs();
  };
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
        editProduct,
      }}
    >
      {children}
    </Data.Provider>
  );
};

export const useDataContext = () => {
  return useContext(Data);
};
