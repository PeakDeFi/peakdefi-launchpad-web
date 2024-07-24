import axios from "axios";

export function getNews(id) {
  return axios.get(process.env.REACT_APP_API_URL + "get_news" + `/${id}`);
}