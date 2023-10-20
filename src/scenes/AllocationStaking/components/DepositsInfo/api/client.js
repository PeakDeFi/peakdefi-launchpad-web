import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useFetchDepositsInfo = (walletAddress, page, pageSize) => {
  return useQuery(["deposits-info", walletAddress], () => {
    return axios.get(
      process.env.REACT_APP_API_URL +
        `deposits-info?wallet=${walletAddress}&page=${page}&page_size=${pageSize}`
    );
  });
};
