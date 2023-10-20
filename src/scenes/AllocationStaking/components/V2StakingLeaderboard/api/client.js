import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useV2LeaderboardData = (page) => {
  return useQuery(["leaderboard_v2", page], () => {
    return axios.get(
      process.env.REACT_APP_API_URL + `leaderboard_v2?page=${page}&page_size=10`
    );
  });
};
