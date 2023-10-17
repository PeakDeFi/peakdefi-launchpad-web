import { useEffect } from "react";
import { useState } from "react";
import { useCookies } from "react-cookie";

export const useReferrer = () => {
  const [cookies, setCookie] = useCookies(["referrer_wallet_address"]);

  return {
    referrer:
      cookies.referrer_wallet_address ??
      "0x0000000000000000000000000000000000000000",
    isReferrerSet: !!cookies.referrer_wallet_address,
  };
};
