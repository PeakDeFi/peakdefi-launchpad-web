import React, { useRef, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Router,
  useLocation,
} from "react-router-dom";

import { routes } from "./routes";
import history from "./history";
import BaseLayout from "./scenes/BaseLayout/BaseLayout";

import { ethers } from "ethers";

import "./fonts.css";
import "react-toastify/dist/ReactToastify.css";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";

import PrivateRoute from "./scenes/PrivateRoute/PrivateRoute";
import "animate.css/animate.min.css";
import ScrollToTop from "./scenes/ScrollToTop/ScrollToTop";
import { ToastContainer, toast, Flip } from "react-toastify";
import NotFound from "./scenes/NotFound/NotFound";
import Tour from "reactour";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import useMainTour from "./hooks/useMainTour/useMainTour";
import useWhitelistTour from "./hooks/useWhitelistTour/useWhitelistTour";
import useDepositTour from "./hooks/useDepositTour/useDepositTour";
import useClaimTour from "./hooks/useClaimTour/useClaimTour";
import mainTourClasses from "../src/scenes/Tours/maintour.module.scss";
import PolygonModal from "./scenes/Polygon/PolygonModal/PolygonModal";
import useScript from "./hooks/useScript/useScript";
import { hooks, metaMask } from './scenes/Header/ProviderDialog/Metamask'

const reload = () => window.location.reload();

const App = () => {
  const { useChainId, useAccounts, useIsActivating, useIsActive,  useENSNames } = hooks
  const mainTour = useMainTour();
  const whitelistTour = useWhitelistTour();
  const depositTour = useDepositTour();
  const claimTour = useClaimTour();
  const accounts = useAccounts()
  const account = accounts?.length > 0 ? accounts[0] : null
  const chainId = useChainId()
  const [isPolygonModalOpen, setIsPolygonModalOpen] = useState(false);
  const location = useLocation();

  const [savedScriptDiv, setSaveScriptDiv] = useState(null);

  useEffect(() => {
    if (
      chainId ===
        parseInt(process.env.REACT_APP_SUPPORTED_CHAIN_IDS.split(",")[1]) &&
      !location.pathname.includes("project-details")
    ) {
      setIsPolygonModalOpen(true);
    }
  }, [location, chainId]);

  // useEffect(() => {
  //   const externalScriptDiv = document.getElementById(
  //     "sendx-modal-fLasrVpAxU7jL2RJuE4PZ6"
  //   );

  //   if (externalScriptDiv) {
  //     externalScriptDivRef.current.appendChild(
  //       externalScriptDiv.cloneNode(true)
  //     );
  //   }
  // });

  return (
    <>
      <ScrollToTop />

      <BaseLayout history={history}>
        <Routes>
          {routes.map((route) => {
            if (route.isProtected)
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<PrivateRoute />}
                >
                  <Route
                    key={route.path}
                    path={route.path}
                    exact={route.exact}
                    element={route.component}
                  />
                </Route>
              );

            return (
              <Route
                key={route.path}
                path={route.path}
                exact={route.exact}
                element={route.component}
              />
            );
          })}
        </Routes>
      </BaseLayout>

      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={"dark"}
        transition={Flip}
      />
      <Tour
        className={mainTourClasses.mainTour}
        maskClassName={mainTourClasses.mask}
        rounded={16}
        startAt={mainTour.currentStep}
        steps={mainTour.tourSteps}
        isOpen={mainTour.isTourOpen}
        onRequestClose={mainTour.closeTour}
        goToStep={mainTour.currentStep}
        disableFocusLock={true}
        disableKeyboardNavigation={mainTour.isNextStepBlocked}
        disableDotsNavigation={true}
        nextStep={mainTour.nextStepHandler}
        prevStep={mainTour.prevStepHandler}
        currentStep={mainTour.currentStep}
        nextButton={mainTour.isNextStepBlocked ? <></> : undefined}
        prevButton={mainTour.isPreviousStepBlocked ? <></> : undefined}
      />

      <Tour
        className={mainTourClasses.mainTour}
        maskClassName={mainTourClasses.mask}
        rounded={16}
        startAt={whitelistTour.currentStep}
        steps={whitelistTour.tourSteps}
        isOpen={whitelistTour.isTourOpen}
        onRequestClose={whitelistTour.closeTour}
        goToStep={whitelistTour.currentStep}
        disableFocusLock={true}
        disableKeyboardNavigation={whitelistTour.isNextStepBlocked}
        disableDotsNavigation={whitelistTour.isNextStepBlocked}
        showButtons={!whitelistTour.isNextStepBlocked}
        nextStep={whitelistTour.nextStepHandler}
        prevStep={whitelistTour.prevStepHandler}
        prevButton={whitelistTour.isPreviousStepBlocked ? <></> : undefined}
      />

      <Tour
        className={mainTourClasses.mainTour}
        maskClassName={mainTourClasses.mask}
        rounded={16}
        startAt={depositTour.currentStep}
        steps={depositTour.tourSteps}
        isOpen={depositTour.isTourOpen}
        onRequestClose={depositTour.closeTour}
        goToStep={depositTour.currentStep}
        disableFocusLock={true}
        disableKeyboardNavigation={depositTour.isNextStepBlocked}
        disableDotsNavigation={depositTour.isNextStepBlocked}
        showButtons={!depositTour.isNextStepBlocked}
        nextStep={depositTour.nextStepHandler}
        prevStep={depositTour.prevStepHandler}
        prevButton={depositTour.isPreviousStepBlocked ? <></> : undefined}
      />

      <Tour
        className={mainTourClasses.mainTour}
        maskClassName={mainTourClasses.mask}
        rounded={16}
        startAt={claimTour.currentStep}
        steps={claimTour.tourSteps}
        isOpen={claimTour.isTourOpen}
        onRequestClose={claimTour.closeTour}
        goToStep={claimTour.currentStep}
        disableFocusLock={true}
        disableKeyboardNavigation={claimTour.isNextStepBlocked}
        disableDotsNavigation={claimTour.isNextStepBlocked}
        showButtons={!claimTour.isNextStepBlocked}
        nextStep={claimTour.nextStepHandler}
        prevStep={claimTour.prevStepHandler}
        prevButton={claimTour.isPreviousStepBlocked ? <></> : undefined}
      />
      <PolygonModal
        isOpen={isPolygonModalOpen}
        onClose={() => setIsPolygonModalOpen(false)}
      />
    </>
  );
};

export default App;
