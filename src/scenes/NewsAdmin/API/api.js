import axios from "axios";

export function getNews(id) {
  return axios.get(process.env.REACT_APP_API_URL + "news" + `/${id}`);
}

export function createNews(data) {
  return axios.post(process.env.REACT_APP_API_URL + "news_create", data);
}

export function putNews(id, data) {
  return axios.put(
    process.env.REACT_APP_API_URL + "news_update" + `/${id}`,
    data
  );
}

export function deleteNews(id) {
  return axios.delete(process.env.REACT_APP_API_URL + "news_delete" + `/${id}`);
}
