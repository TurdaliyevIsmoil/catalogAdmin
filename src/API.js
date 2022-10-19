
const mainPath = process.env.REACT_APP_MAIN_API_PATH_KEY;
const HTTP = process.env.REACT_APP_CORE_HTTP;
export default {
  admin: {
    login: `${HTTP}://${mainPath}/api/v1/admin/sign-in`,
  },
  news: {
    create: `${HTTP}://${mainPath}/api/v1/home-news/create`,
    delete: `${HTTP}://${mainPath}/api/v1/home-news/delete`,
    update: `${HTTP}://${mainPath}/api/v1/home-news/update`,
    updateImage: `${HTTP}://${mainPath}/api/v1/home-news/upload-image`,
    getNews: `${HTTP}://${mainPath}/api/news/get`,
    getNewsS: `${HTTP}://${mainPath}/api/v1/home-news/list`,
  },
  catalogs: {
    create: `${HTTP}://${mainPath}/api/service/create `,
    delete: `${HTTP}://${mainPath}/api/service/delete?id=`,
    update: `${HTTP}://${mainPath}/api/service/update/`,
    updateImage: `${HTTP}://${mainPath}/api/service/upload-img/`,
    getService: `${HTTP}://${mainPath}/service/get`,
    getCatalogs: `${HTTP}://${mainPath}/api/v1/catalog/get-list`,
  },
  product: {
    create: `${HTTP}://${mainPath}/api/v1/product/create`,
    delete: `${HTTP}://${mainPath}/api/v1/product/delete`,
    update: `${HTTP}://${mainPath}/api/v1/product/update`,
    updateImage: `${HTTP}://${mainPath}/api/v1/product/upload-image`,
    getTable: `${HTTP}://${mainPath}/api/v1/product/get-product`,
    getTables: `${HTTP}://${mainPath}/tables/get`,
  },
};
