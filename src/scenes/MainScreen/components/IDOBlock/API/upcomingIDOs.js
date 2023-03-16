import axios from "axios";

export function getUpcomingIdos() {
  return axios.get(process.env.REACT_APP_API_URL + "projects");
}

export function getCompletedPRODIdos() {
  return axios.get(process.env.REACT_APP_PROD_API_URL + "projects");
}

export function getMyIdos(walletAddress) {
  return axios.get(
    process.env.REACT_APP_API_URL + `projects?wallet=${walletAddress}`
  );
}
