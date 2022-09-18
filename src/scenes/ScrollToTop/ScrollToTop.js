import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { useSearchParams } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const [cookies, setCookie] = useCookies(['referrer_wallet_address']);
  const [searchParams, setSearchParams] = useSearchParams();

  const saveReferrerWallet = () => {

      if (!cookies.referrer_wallet_address && searchParams.get("referrer_wallet_address")) {
          setCookie(
              'referrer_wallet_address',
              searchParams.get("referrer_wallet_address"),
              {
                  expires: new Date(new Date().setMonth(new Date().getMonth() + 1))
              }
          )

      }
  }
  
  useEffect(() => {
          saveReferrerWallet();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}