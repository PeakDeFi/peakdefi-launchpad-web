import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useFetchReferralRewardsInfo = (wallet, page, pageSize) => {
  return useQuery(["referral-rewards-info", wallet], () => {
    return axios.get(
      process.env.REACT_APP_API_URL +
        `referral-rewards-info?wallet=${wallet}&page=${page}&page_size=${pageSize}`
    );
  });
};
