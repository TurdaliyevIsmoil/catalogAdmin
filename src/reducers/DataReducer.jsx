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

export default (state, action) => {
  switch (action.type) {
    case LOGIN: {
      localStorage.setItem("auth", action.payload.token);
      localStorage.setItem("auth_exp", new Date().getTime() + 3 * 3600 * 1000);
      return { ...state, auth: true, token: action.payload.token };
    }
    case LOADING_START:
      return { ...state, loading: true };
    case "login":
      return { ...state };
    case LOADING_END:
      return { ...state, loading: false };
    case SERVICES_DATA: {
      const services = action.payload.data.sort((a, b) => a.id < b.id);
      return { ...state, services };
    }
    case NEWS_DATA: {
      const news = action.payload.data.sort((a, b) => a.id < b.id);
      return { ...state, news };
    }
    case TABLES_DATA: {
      const tables = action.payload.data.sort((a, b) => a.id < b.id);
      return { ...state, tables };
    }
    case CATALOGS_DATA: {
      const catalogs = action.payload.data.sort((a, b) => a.id < b.id);
      return { ...state, catalogs };
    }
    case APPLICATIONS_DATA: {
      if (action.payload.data === undefined) {
        return state;
      }
      const applications = action.payload.data.sort((a, b) => a.id < b.id);
      return { ...state, applications };
    }
    default:
      return state;
  }
};
