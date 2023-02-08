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

const reload = () => window.location.reload();

const App = () => {
  const {
    currentStep,
    goToStep,
    tourSteps,
    isTourOpen,
    closeTour,
    isNextStepBlocked,
    nextStepHandler,
  } = useMainTour();
  const { account } = useWeb3React();

  useEffect(() => {
    console.log("🚀 ~ file: App.js:54 ~ App ~ currentStep", currentStep);
  }, [currentStep]);

  useEffect(() => {
    if (account) {
      goToStep(3);
    }
  }, [account]);

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
        steps={tourSteps}
        isOpen={isTourOpen}
        onRequestClose={closeTour}
        goToStep={currentStep}
        disableFocusLock={true}
        disableKeyboardNavigation={isNextStepBlocked}
        disableDotsNavigation={isNextStepBlocked}
        showButtons={!isNextStepBlocked}
        nextStep={nextStepHandler}
      />
    </>
  );
};

export default App;
