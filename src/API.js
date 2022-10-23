const mainPath = process.env.REACT_APP_MAIN_API_PATH_KEY;
const HTTP = process.env.REACT_APP_CORE_HTTP;
export default {
  admin: {
    login: `${HTTP}://${mainPath}/api/v1/admin/sign-in`,
  },
  news: {
    create: `${HTTP}://${mainPath}/api/v1/home-news/create`,
    delete: `${HTTP}://${mainPath}/api/v1/home-news/delete?id=`,
    update: `${HTTP}://${mainPath}/api/v1/home-news/update`,
    updateImage: `${HTTP}://${mainPath}/api/v1/home-news/upload-image?home-news-id=`,
    getNews: `${HTTP}://${mainPath}/api/news/get`,
    getNewsS: `${HTTP}://${mainPath}/api/v1/home-news/list`,
  },
  catalogs: {
    create: `${HTTP}://${mainPath}/api/v1/catalog/create `,
    delete: `${HTTP}://${mainPath}/api/v1/catalog/delete?id=`,
    update: `${HTTP}://${mainPath}/api/service/update/`,
    updateImage: `${HTTP}://${mainPath}/api/service/upload-img/`,
    getService: `${HTTP}://${mainPath}/service/get`,
    getCatalogs: `${HTTP}://${mainPath}/api/v1/catalog/get-list`,
  },
  subcatalogs: {
    create: `${HTTP}://${mainPath}/api/v1/subcatalog/create`,
    delete: `${HTTP}://${mainPath}/api/v1/subcatalog/delete?id=`,
    update: `${HTTP}://${mainPath}/api/service/update/`,
    updateImage: `${HTTP}://${mainPath}/api/service/upload-img/`,
    getService: `${HTTP}://${mainPath}/service/get`,
    getCatalogs: `${HTTP}://${mainPath}/api/v1/subcatalog/list`,
    getProducts: `${HTTP}://${mainPath}/api/v1/subcatalog/product?offset=0&limit=100&id=`,
  },
  product: {
    create: `${HTTP}://${mainPath}/api/v1/product/create`,
    delete: `${HTTP}://${mainPath}/api/v1/product/delete?product-id=`,
    update: `${HTTP}://${mainPath}/api/v1/product/update`,
    updateImage: `${HTTP}://${mainPath}/api/v1/product/upload-image?product-id=`,
    getTable: `${HTTP}://${mainPath}/api/v1/product/get-product`,
    getTables: `${HTTP}://${mainPath}/tables/get`,
  },
};
