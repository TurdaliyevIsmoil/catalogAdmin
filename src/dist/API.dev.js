"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var mainPath = process.env.REACT_APP_MAIN_API_PATH_KEY;
var HTTP = process.env.REACT_APP_CORE_HTTP;
var _default = {
  admin: {
    login: "".concat(HTTP, "://").concat(mainPath, "/api/v1/admin/sign-in")
  },
  news: {
    create: "".concat(HTTP, "://").concat(mainPath, "/api/v1/home-news/create"),
    "delete": "".concat(HTTP, "://").concat(mainPath, "/api/v1/home-news/delete"),
    update: "".concat(HTTP, "://").concat(mainPath, "/api/v1/home-news/update"),
    updateImage: "".concat(HTTP, "://").concat(mainPath, "/api/v1/home-news/upload-image"),
    getNews: "".concat(HTTP, "://").concat(mainPath, "/api/news/get"),
    getNewsS: "".concat(HTTP, "://").concat(mainPath, "/api/v1/home-news/list")
  },
  catalogs: {
    create: "".concat(HTTP, "://").concat(mainPath, "/api/service/create "),
    "delete": "".concat(HTTP, "://").concat(mainPath, "/api/service/delete?id="),
    update: "".concat(HTTP, "://").concat(mainPath, "/api/service/update/"),
    updateImage: "".concat(HTTP, "://").concat(mainPath, "/api/service/upload-img/"),
    getService: "".concat(HTTP, "://").concat(mainPath, "/service/get"),
    getCatalogs: "".concat(HTTP, "://").concat(mainPath, "/api/v1/catalog/get-list")
  },
  product: {
    create: "".concat(HTTP, "://").concat(mainPath, "/api/v1/product/create"),
    "delete": "".concat(HTTP, "://").concat(mainPath, "/api/v1/product/delete"),
    update: "".concat(HTTP, "://").concat(mainPath, "/api/v1/product/update"),
    updateImage: "".concat(HTTP, "://").concat(mainPath, "/api/v1/product/upload-image"),
    getTable: "".concat(HTTP, "://").concat(mainPath, "/api/v1/product/get-product"),
    getTables: "".concat(HTTP, "://").concat(mainPath, "/tables/get")
  }
};
exports["default"] = _default;