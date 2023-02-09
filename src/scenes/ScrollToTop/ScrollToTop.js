import { useEffect, useRef, useState, useImperativeHandle } from "react";
import { useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useSearchParams } from "react-router-dom";
import EbookBanner from "../MainScreen/components/EbookBanner/EbookBanner";
import Backdrop from "@mui/material/Backdrop";
import zIndex from "@mui/material/styles/zIndex";
import { CircularProgress } from "@mui/material";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const [cookies, setCookie] = useCookies(["referrer_wallet_address"]);
  const [messages, setMessages] = useCookies(["advertisement"]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isRunned, setIsRunned] = useState(false);
  const [showingPopup, setShowingPopup] = useState(false);
  const childRef = useRef();

  const saveReferrerWallet = () => {
    if (searchParams.get("referrer_wallet_address")) {
      setCookie(
        "referrer_wallet_address",
        searchParams.get("referrer_wallet_address"),
        {
          expires: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        }
      );
    }
  };

  const showAdvertisement = () => {
    if (!cookies.advertisement && childRef.current) {
      childRef.current.getAlert();
      setShowingPopup(true);
      setMessages("advertisement", searchParams.get("advertisement"), {
        expires: new Date(new Date().setMonth(new Date().getFullYear + 2)),
      });
    }
  };

  useEffect(() => {
    saveReferrerWallet();
    setTimeout(showAdvertisement, 30000);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div>
      <div style={{ display: "none" }}>
        <EbookBanner ref={childRef} />
      </div>
      <Backdrop
        open={showingPopup}
        onClick={() => {
          childRef.current.hideAlert();
          setShowingPopup(false);
        }}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress />
      </Backdrop>
    </div>
  );
}
