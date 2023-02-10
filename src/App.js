import React from "react";
import { BrowserRouter, Route, Routes, Router } from "react-router-dom";

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

const reload = () => window.location.reload();

const App = () => {
  const mainTour = useMainTour();
  const whitelistTour = useWhitelistTour();
  const depositTour = useDepositTour();
  const { account } = useWeb3React();

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
        startAt={mainTour.currentStep}
        steps={mainTour.tourSteps}
        isOpen={mainTour.isTourOpen}
        onRequestClose={mainTour.closeTour}
        goToStep={mainTour.currentStep}
        disableFocusLock={true}
        disableKeyboardNavigation={mainTour.isNextStepBlocked}
        disableDotsNavigation={mainTour.isNextStepBlocked}
        showButtons={!mainTour.isNextStepBlocked}
        nextStep={mainTour.nextStepHandler}
        prevButton={<></>}
      />

      <Tour
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
        prevButton={<></>}
      />

      <Tour
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
        prevButton={<></>}
      />
    </>
  );
};

export default App;
