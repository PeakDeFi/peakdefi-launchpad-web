import { useDispatch, useSelector } from "react-redux";

import classes from "./ThankYouPage.module.scss";
import Deposit from "./images/Deposit.svg";
import Register from "./images/Register.svg";
import { useEffect } from "react";
import { setShort } from "../../features/bgSlice";
import { useNavigate } from "react-router-dom";

const ThankYouPage = () => {
  const actionData = useSelector((state) => state.thankYouPage);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setShort(true));
  }, []);

  const handleDone = () => {
    dispatch(setShort(false));
    navigate(-1);
  };

  return (
    <div className={classes.ThankYouPage}>
      <img
        src={actionData.register ? Register : Deposit}
        className={classes.icon}
      />
      {actionData.register && (
        <>
          {actionData.projectName === "Tangible" ? (
            <h1>
              Thank you! You are now whitelisted for the{" "}
              {actionData.projectName} Sale.
            </h1>
          ) : (
            <h1>
              Thank you! You are now whitelisted for the sale{" "}
              {actionData.projectName}.
            </h1>
          )}
        </>
      )}

      {actionData.deposit && (
        <h1 data-tut={'success-deposit-screen'}>
          Thank you! You successfully deposited {actionData.amount} USDT for the{" "}
          {actionData.projectName} Sale.
        </h1>
      )}

      {actionData.staking && (
        <h1>Thank you for staking {actionData.amount} PEAK.</h1>
      )}

      <button className={classes.doneButton} onClick={handleDone}>
        Done
      </button>
    </div>
  );
};

export default ThankYouPage;
