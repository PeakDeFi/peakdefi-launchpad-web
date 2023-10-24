import { useMergedProvidersState } from "hooks/useMergedProvidersState/useMergedProvidersState";
import { useEffect } from "react";
import { useState } from "react";
import { useCookies } from "react-cookie";

export const useReferrer = () => {
  const [cookies, setCookie] = useCookies(["referrer_wallet_address"]);
  const { accounts } = useMergedProvidersState();

  const myaccount = accounts[0] ?? "";

  return {
    referrer:
      cookies.referrer_wallet_address === myaccount
        ? "0x0000000000000000000000000000000000000000"
        : cookies.referrer_wallet_address ??
          "0x0000000000000000000000000000000000000000",
    isReferrerSet: !!cookies.referrer_wallet_address,
  };
};
