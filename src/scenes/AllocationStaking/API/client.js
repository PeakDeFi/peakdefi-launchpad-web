import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ApiClient } from "services/api/APIClient";

export const useFetchPrice = () => {
  return useQuery({
    queryKey: "price",
    queryFn: () => {
      return ApiClient.get("peak_defi_price");
    },
    select: (response) => {
      return response.price;
    },
  });
};
