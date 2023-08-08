import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { metaMask, hooks } from "../../../Header/ProviderDialog/Metamask";

import { BigNumber, ethers } from "ethers";

import { SALE_ABI, TOKEN_ABI } from "../../../../consts/abi";

import { useSelector, useDispatch } from "react-redux";
import { getUserDataKYC } from "../../../Header/API/blockpass";
import { toast } from "react-toastify";

import { providers } from "ethers";
import WalletConnectProvider from "@walletconnect/ethereum-provider";

import { RpcProvider } from "../../../../consts/rpc";
import Tooltip from "@mui/material/Tooltip";
import ErrorDialog from "../../../ErrorDialog/ErrorDialog";
import ErrorDialogStake from "./ErrorDialog/ErrorDialog";
import Confetti from "../../../../resources/confetti.png";
import ErrorImg from "./ErrorDialog/resources/warning.png";
import DialogBase from "../../../DialogBase/DialogBase";

import classes from "./IdoBlock.module.scss";
import ConfimrationDialog from "../../../ConfirmationDialog/ConfirmationDialog";

import { setDeposit, setRegister } from "./../../../../features/thankYouSlice";

import InternetLogo from "./images/internet_logo.png";
import web3 from "web3";

import { useNavigate, useParams } from "react-router-dom";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ArrowRight from "./images/arrowRight.svg";
import { kycBypassers } from "../../../../consts/kyc";
import { rpcWalletConnectProvider } from "../../../../consts/walletConnect";
import useWhitelistTour from "../../../../hooks/useWhitelistTour/useWhitelistTour";
import useDepositTour from "../../../../hooks/useDepositTour/useDepositTour";
import { setSaleStatus } from "../../../../features/projectDetailsSlice";
import { saveParticipation } from "./API/deposit";
import { admins } from "../../helpers/adminsList";
import { useDepositSaleTokens } from "../../../../hooks/useDepositSaleTokens/useDepostSaleTokens";
import useJSONContract from "../../../../hooks/useJSONContract/useJSONContract";
import NetfowrkInfoSection from "../NetworkInfoSection/NetworkInfoSection";
import { useProviderHook } from "hooks/useProviderHook/useProviderHook";
import { useMergedProvidersState } from "hooks/useMergedProvidersState/useMergedProvidersState";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function timeToDate(time) {
  let date = new Date(time * 1000);
  let hours = date.getHours();
  let minutes = "0" + date.getMinutes();
  let seconds = "0" + date.getSeconds();
  let formattedTime =
    hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
  return formattedTime;
}

function timeLeft(seconds) {
  let timeString = "";
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor((seconds % (3600 * 24)) / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = Math.floor(seconds % 60);
  if (d > 0) {
    return d + " days, " + h + " h, " + m + " mins";
  } else if (h > 0) {
    return h + " hours " + m + " minutes";
  } else if (m > 0 || s > 0) {
    return m + ":" + s;
  } else {
    return "Launched";
  }
}

function priceToFormatedPrice(price) {
  return "$" + price;
}

const tokenContractAddress = process.env.REACT_APP_BUSD_TOKEN_ADDRESS;

const IdoBlock = ({ idoInfo, ido, media }) => {
  const {
    goToNextStep: goToWhitelistTourNextStep,
    setUserIsRegistered,
    goToStep: goToWhitelistStep,
  } = useWhitelistTour();

  const params = useParams();

  const [isRegistered, setIsRegistered] = useState(false);
  const [depositedAmount, setDepositedAmount] = useState(0);
  const stakingBalance = useSelector((state) => state.staking.balance);

  const { contract: jsonContract } = useJSONContract(
    ido.contract_address,
    SALE_ABI
  );
  const provider = useProviderHook();

  const { accounts, chainId } = useMergedProvidersState();
  const account = accounts?.length > 0 ? accounts[0] : null;
  const [saleContract, setSaleContract] = useState();
  const [tokenContract, setTokenContract] = useState();

  const [amount, setAmount] = useState(0);
  const userWalletAddress = useSelector((state) => state.userWallet.address);
  const decimals = useSelector((state) => state.userWallet.decimal);
  const [allowance, setAllowance] = useState(0);
  const [showVerify, setShowVerify] = useState(false);
  const [maxAmount, setMaxAmount] = useState(2500);
  const [isParticipated, setIsParticipated] = useState(false);
  const [totalBUSDRaised, setTotalBUSDRaised] = useState(0);
  const [inputWarning, setInputWarning] = useState(false);
  const [userTier, setUserTier] = useState();
  const [isLotteryWinner, setIsLotteryWinner] = useState(false);

  const [showError, setShowError] = useState(false);
  const [showErrorStake, setShowErrorStake] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [messageIcon, setMessageIcon] = useState(Confetti);

  const [showConfirm, setShowConfirm] = useState(false);
  const [callback, setCallback] = useState();
  const [confirmMessage, setConfirmMessage] = useState("");

  const [sloganCollapsed, setSloganCollapsed] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const depositTour = useDepositTour(allowance > amount);

  const {
    isTokensDeposited,
    allow: distributionAllow,
    allowance: distributionAllowance,
    depositTokens: distributionDepositTokens,
    distributionContract,
  } = useDepositSaleTokens(
    ido.token.token_address,
    "0xbBA337fb2DD1C8293BDca287607ff51081D178b4",
    account === admins[params.name]
  );

  useEffect(() => {
    if (!!saleContract && isRegistered) {
      saleContract.Whitelist(userWalletAddress).then((response) => {
        setUserTier(parseInt(response.userTierId.toString()));
        console.log(response);
        if (response.userTierId == 0) setIsLotteryWinner(true);
      });
    }
  }, [saleContract, isRegistered]);

  // useEffect(async () => {
  //     try {
  //         await getUserDataKYC(account).then(response => {
  //             if (response.data.data.status === "approved") {
  //                 setShowVerify(false);
  //             } else {
  //                 setShowVerify(true);
  //             }
  //         }).catch(error => {
  //             setShowVerify(true);
  //         })
  //     } catch (error) {
  //         setShowVerify(true);
  //     }
  // }, [account])

  useEffect(() => {
    const callBack = async () => {
      const { ethereum } = window;
      if (userWalletAddress && ethereum) {
        let signer = await provider?.getSigner();

        const jsonProvider = new ethers.providers.JsonRpcProvider(RpcProvider);

        const lsaleContract = new ethers.Contract(
          ido.contract_address,
          SALE_ABI,
          signer
        );
        const usaleContract = new ethers.Contract(
          ido.contract_address,
          SALE_ABI,
          provider
        );

        setSaleContract(lsaleContract);

        const ltokenContract = new ethers.Contract(
          tokenContractAddress,
          TOKEN_ABI,
          signer
        );
        setTokenContract(ltokenContract);

        ltokenContract
          .allowance(userWalletAddress, ido.contract_address)
          .then((response) => {
            setAllowance(parseInt(response.toString()));
          })
          .catch((erorr) => {});
      } else if (userWalletAddress) {
        const web3Provider = new providers.Web3Provider(
          rpcWalletConnectProvider
        );
        const signer = web3Provider.getSigner();

        const lsaleContract = new ethers.Contract(
          ido.contract_address,
          SALE_ABI,
          signer
        );

        setSaleContract(lsaleContract);
        isRegisteredCheck(lsaleContract);

        const ltokenContract = new ethers.Contract(
          tokenContractAddress,
          TOKEN_ABI,
          signer
        );
        setTokenContract(ltokenContract);

        ltokenContract
          .allowance(userWalletAddress, ido.contract_address)
          .then((response) => {
            setAllowance(parseInt(response.toString()));
          })
          .catch((erorr) => {});
      } else {
        const usaleContract = new ethers.Contract(
          ido.contract_address,
          SALE_ABI,
          provider
        );

        usaleContract
          .sale()
          .then((response) => {
            setTotalBUSDRaised(response.totalBUSDRaised / 10 ** 18);
          })
          .catch((error) => {});
      }

      jsonContract
        .isParticipated(userWalletAddress)
        .then((response) => {
          setIsParticipated(response && account);
        })
        .catch((error) => {});

      jsonContract
        .userToParticipation(userWalletAddress)
        .then((response) => {
          setDepositedAmount(Math.round(response.amountPaid / 10 ** 18));
        })
        .catch((error) => {});

      jsonContract
        .sale()
        .then((response) => {
          setTotalBUSDRaised(response.totalBUSDRaised / 10 ** 18);
        })
        .catch((error) => {});

      isRegisteredCheck();

      if (ido.id == 13) {
        setShowMessage(true);
        setMessage(`<p> Due to bad actors (launchpads) that dumped the FRAG token during the TGE, we refunded all our investors.
                          On top of that, we negotiated with Fragmint that they will airdrop 20% of each investor's individual allocation of their re-launched version of the FRAG token.
                          </p>
                          <p>
                          In order to access your FRAG tokens, make sure to add their token to your wallet: 0x1a73308d8eeb3c1a2b771e9ace73508c52706b76
                          </p>
                          <p>The free Fragmint airdrop will be vested over 10 months. This means that 2% of the original Sale investment will be airdropped to the investor's wallet every month. The first airdrop was already made at the end of November 2022.</p>`);
        setMessageIcon(ErrorImg);
      }
    };

    if (jsonContract) {
      callBack();
    }
  }, [userWalletAddress, ido.contract_address, jsonContract, account]);

  const addToken = async () => {
    const { ethereum } = window;
    if (ido.token && ethereum) {
      try {
        // wasAdded is a boolean. Like any RPC method, an error may be thrown.
        const wasAdded = await ethereum.request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20", // Initially only supports ERC20, but eventually more!
            options: {
              address: ido.token.token_address, // The address that the token is at.
              symbol: ido.token.symbol, // A ticker symbol or shorthand, up to 5 chars.
              decimals: ido.token.decimals, // The number of decimals in the token
              image: ido.token.logo_url, // A string url of the token logo
            },
          },
        });
      } catch (error) {}
    }
  };

  const isRegisteredCheck = (lSaleContract) => {
    if (jsonContract === undefined) return;

    jsonContract
      .Whitelist(account)
      .then((res) => {
        setIsRegistered(res.userAddress === account);
      })
      .catch((error) => {});
  };

  const registerForSale = async () => {
    try {
      saleContract
        .registerForSale()
        .then((res) => {
          const transaction = res
            .wait()
            .then((tran) => {
              setIsRegistered(true);
              goToWhitelistStep(3);
              dispatch(setRegister({ projectName: idoInfo.token.name }));
              navigate("/thank-you-register");
              depositTour.nextStepHandler();
            })
            .error(() => {
              goToWhitelistStep(2);
              depositTour.goToNextStep(4);
            });

          toast.promise(transaction, {
            pending: "Registration pending",
            success: "Registration completed",
            error: "Registration failed",
          });
        })
        .catch((error) => {
          if (error?.data?.message.includes("Need to stake minimum")) {
            setShowErrorStake(true);
            setErrorMessage(
              "You need to stake minimum amount of 1000 PEAK before registering for sale"
            );
          }
        });

      //alert("Hash " + result.hash)
    } catch (error) {
      alert(error.data.message.replace("execution reverted: ", ""));
    }
  };

  const actualSaleRequest = async () => {
    const roundedAmount = 2 * Math.floor(amount / 2);
    let bigAmount = BigNumber.from(Math.round(roundedAmount * 100)).mul(
      BigNumber.from(10).pow(16)
    );
    console.log("bigAmount", bigAmount);
    saleContract
      .participate(bigAmount)
      .then((res) => {
        depositTour.goToNextStep();
        const transactipon = res
          .wait()
          .then((tran) => {
            saveParticipation(ido.id, account);
            setMessageIcon(Confetti);
            depositTour.goToStep(5);
            setShowMessage(true);
            setMessage(
              `Congratulations! You have just made a deposit of ${roundedAmount} USDT`
            );

            setIsParticipated(true);
            setDepositedAmount(roundedAmount);

            dispatch(
              setDeposit({
                projectName: idoInfo.token.name,
                amount: roundedAmount,
              })
            );
            navigate("/thank-you-deposit");
          })
          .catch(() => {
            depositTour.goToNextStep(4);
          });

        toast.promise(transactipon, {
          pending: "Deposit transaction pending",
          success: "Depost transaction successful",
          error: "Approval transaction failed",
        });
      })
      .catch((error) => {
        toast.error(
          <>
            <b>{"Request failed: "}</b>
            <br />
            <code>{error?.data?.message}</code>
          </>
        );
      });
  };

  const participateSale = async () => {
    if (isParticipated) {
      return;
    }

    try {
      if (amount < 10) {
        setShowError(true);
        setErrorMessage(
          "You cannot deposit less than 10 USDT tokens on this sale"
        );
      } else {
        const roundedAmount = 2 * Math.floor(amount / 2);
        if (roundedAmount !== amount) {
          setAmount(roundedAmount);

          setShowError(true);
          setErrorMessage(
            "You cannot buy an odd amount of tokens. Your deposit was lowered to the nearest even amount."
          );
        } else {
          actualSaleRequest();
        }
        //TODO change to BUSD decimals

        // setCallback(() => actualSaleRequest());
        // setConfirmMessage("Confirm token purchase");
        // setShowConfirm(true);
      }
    } catch (error) {
      alert(error.data.message.replace("execution reverted: ", ""));
    }
  };

  const approve = async () => {
    try {
      tokenContract
        .approve(ido.contract_address, ethers.constants.MaxUint256)
        .then((response) => {
          let transaction = response
            .wait()
            .then((tran) => {
              try {
                setAllowance(ethers.constants.MaxUint256);
              } catch (error) {
                console.log(error);
              }
              depositTour.goToNextStep();
            })
            .catch(() => {
              depositTour.goToStep(4);
            });

          toast.promise(transaction, {
            pending: "Approval transaction pending",
            success: "Approval transaction successfull",
            error: "Approval transaction failed",
          });
        });
    } catch (error) {
      alert(error.data.message.replace("execution reverted: ", ""));
    }
  };

  useEffect(() => {
    if (isRegistered) {
      setUserIsRegistered();
    }
  }, [isRegistered]);

  useEffect(() => {
    if (amount > 0) {
      depositTour.unblockPropagation();
    } else {
      depositTour.blockPropagation();
    }
  }, [amount]);

  const isAllowedToParticipate =
    (!showVerify || kycBypassers.some((e) => e === account)) &&
    ((ido.timeline.sale_end > Date.now() / 1000 &&
      ido.timeline.registration_start < Date.now() / 1000 &&
      (!isRegistered || ido.timeline.sale_start > Date.now() / 1000)) ||
      (ido.timeline.sale_start < Date.now() / 1000 &&
        ido.timeline.sale_end > Date.now() / 1000 &&
        isRegistered));

  const isWhitelistStage =
    ido.timeline.sale_end > Date.now() / 1000 &&
    ido.timeline.registration_start < Date.now() / 1000 &&
    ido.timeline.sale_start > Date.now() / 1000;

  const isDepositStage =
    ido.timeline.sale_start < Date.now() / 1000 &&
    ido.timeline.sale_end > Date.now() / 1000;

  useEffect(() => {
    if (isDepositStage) {
      dispatch(setSaleStatus("deposit"));
    } else if (isWhitelistStage) {
      dispatch(setSaleStatus("whitelist"));
    } else if (ido.timeline.sale_end < Date.now() / 1000 && isParticipated) {
      dispatch(setSaleStatus("claim"));
    } else {
      dispatch(setSaleStatus(""));
    }
  }, [isWhitelistStage, isDepositStage, isParticipated, ido]);

  useEffect(() => {
    console.log(
      "🚀 ~ file: IdoBlock.js:534 ~ IdoBlock ~ distributionContract:",
      distributionContract
    );
    console.log(
      "🚀 ~ file: IdoBlock.js:539 ~ IdoBlock ~ distributionAllowance:",
      distributionAllowance
    );
  }, [distributionAllowance, distributionContract]);

  const onChangeNetwork = async (desiredNetworkID) => {
    if (window.ethereum.networkVersion !== desiredNetworkID) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: web3.utils.toHex(desiredNetworkID) }],
        });
      } catch (err) {
        // This error code indicates that the chain has not been added to MetaMask
        if (err.code === 4902) {
          toast.error(
            "The Polygon network was not connected to your wallet provider. To continue please add Polygon network to your wallet provider"
          );
        }
      }
    }
  };

  if (ido === undefined) return <></>;

  const tierAllocation = [40, 150, 370, 500, 950, 1800];

  return (
    <div className={classes.IdoBlock}>
      <div className={classes.privateSaleFlag}>
        {ido.title == "EYWA"
          ? "KOL Sale"
          : ido.title == "Another-1"
          ? "Pre-sale"
          : ido.is_private_sale
          ? "Private Sale"
          : "Public sale"}
      </div>
      <div className={classes.tokenBlock}>
        <div className={classes.token}>
          <img
            className={classes.tokenLogo}
            alt={idoInfo.token.name}
            src={idoInfo.token.img}
          />
          <div className={classes.text}>
            <div className={classes.name}> {idoInfo.token.name} </div>
            <div className={classes.symbol}>{idoInfo.token.symbol}</div>
            <div className={classes.media}>
              <a key={-1} href={ido.website_url} target="_blank">
                <img src={InternetLogo} />
              </a>
              {media.map((media, id) => {
                return (
                  <a key={id} href={media.link} target="_blank">
                    {" "}
                    <img alt="" src={media.imgMobile} />{" "}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {priceDetail(idoInfo.token)}
      </div>
      <div
        className={sloganCollapsed ? classes.slogan : classes.expandedSlogan}
      >
        {" "}
        {ido.heading_text + "."}
        {ido.heading_text.length > 100 && (
          <div
            className={classes.readMore}
            onClick={() => setSloganCollapsed(!sloganCollapsed)}
          >
            {sloganCollapsed ? "Read More" : "Show less"}{" "}
            {sloganCollapsed ? (
              <KeyboardArrowDownIcon />
            ) : (
              <KeyboardArrowUpIcon />
            )}
          </div>
        )}
      </div>
      {/* TODO: REMOVE HARDCODED VALUE */}
      {(params.name === "another-1" || params.name === "eywa") && (
        <NetfowrkInfoSection network={"polygon"} />
      )}
      <div className={classes.saleInfo}>
        {params.name !== "another-1" && params.name !== "eywa" && (
          <div className={classes.line}></div>
        )}
        {/* TODO: REMOVE CONDITION */}
        <RoundDetail
          time_left={
            ido.current_round === "Preparing for sale"
              ? ido.time_until_launch
              : ido.time_left_in_current_round
          }
          current_round={
            ido.current_round === "Sale end" ? "Sale ended" : ido.current_round
          }
          ido={ido}
        />
        {progressBar(idoInfo.saleInfo)}
        {console.log("props", idoInfo, ido, media)}
        {launchDetaid(idoInfo.saleInfo, totalBUSDRaised, ido)}
      </div>

      <div className={classes.actions}>
        {/* {isLotteryWinner && depositedAmount === 0 && (
          <div className={classes.lotteryWinner}>
            <h2>Lottery Winner!</h2>
          </div>
        )} */}
        <div className={classes.actionBlock}>
          {isAllowedToParticipate && (
            // && depositedAmount === 0
            <>
              {/* <div className={classes.addToken}>
                                <button onClick={() => addToken()}>Add Token to Metamask</button>
                            </div> */}
              <div className={classes.buttonBlock}>
                {isWhitelistStage && (
                  <button
                    disabled={isRegistered}
                    data-tut={"whlitelist_button"}
                    onClick={() => {
                      if (!isRegistered) {
                        registerForSale();
                      }
                    }}
                  >
                    {isRegistered ? "Whitelisted" : "Get Whitelisted"}
                  </button>
                )}
                {isDepositStage && !isRegistered && (
                  <div className={classes.notWhitelisted}>
                    {" "}
                    You are not whitelisted for this Sale!{" "}
                  </div>
                )}
                {isDepositStage && isRegistered && (
                  <div className={classes.inputs} data-tut={"all-ido-inputs"}>
                    {isDepositStage && (
                      <div className={classes.inputFieldWrapper}>
                        {false && (
                          <div
                            className={classes.max}
                            onClick={() => setAmount(maxAmount)}
                          >
                            MAX
                          </div>
                        )}

                        <Tooltip
                          disableHoverListener
                          open={inputWarning}
                          title={"Keep in mind: You can only deposit once!"}
                          componentsProps={{
                            tooltip: {
                              sx: {
                                bgcolor: "rbga(0, 0, 0, 0.7)",
                                "& .MuiTooltip-arrow": {
                                  color: "rbga(0, 0, 0, 0.7)",
                                },
                                color: "rgb(255, 250, 250)",
                                fontSize: "10pt",
                                fontFamily: "Montserrat",
                                fontWeight: "600",
                              },
                            },
                          }}
                        >
                          <input
                            type="number"
                            value={isParticipated ? depositedAmount : amount}
                            disabled={isParticipated}
                            min={0}
                            className={classes.inputField}
                            onChange={(e) => {
                              setAmount(parseFloat(e.target.value));
                            }}
                            onFocus={() => {
                              setInputWarning(true);
                            }}
                            onBlur={() => {
                              setInputWarning(false);
                            }}
                          />
                        </Tooltip>
                        <label>USDT</label>
                      </div>
                    )}

                    {allowance >= amount * 10 ** 18 && (
                      <>
                        <button
                          onClick={() => {
                            participateSale();
                          }}
                          style={{
                            // backgroundColor: isParticipated ? '#bfff80' : '#ffd24d',
                            whiteSpace: "nowrap",
                          }}
                          data-tut={"ido-deposit-button"}
                        >
                          {isParticipated ? "Your Deposit" : "Deposit Tokens"}
                        </button>
                      </>
                    )}

                    {(allowance < amount * 10 ** 18 || isNaN(amount)) && (
                      <button
                        onClick={() => {
                          approve();
                        }}
                        // style={{ backgroundColor: '#ffd24d' }}
                        data-tut={"deposit-approve-button"}
                      >
                        Approve
                      </button>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
          {account === admins[params.name] && (
            <div style={{ marginTop: "10px" }} className={classes.buttonBlock}>
              {chainId ===
              parseInt(
                process.env.REACT_APP_SUPPORTED_CHAIN_IDS.split(",")[1] //check if user is connected to the right network to interact with the sale contract
              ) ? (
                <div className={classes.inputs}>
                  {!isTokensDeposited && distributionAllowance > 0 && (
                    <>
                      <button
                        onClick={() => {
                          distributionDepositTokens();
                        }}
                        style={{
                          // backgroundColor: isParticipated ? '#bfff80' : '#ffd24d',
                          whiteSpace: "nowrap",
                        }}
                        data-tut={"ido-deposit-button"}
                      >
                        Deposit Sale Tokens
                      </button>
                    </>
                  )}

                  {isTokensDeposited && (
                    <h3>You have already deposited tokens</h3>
                  )}

                  {distributionAllowance === 0 && (
                    <button
                      onClick={() => {
                        distributionAllow();
                      }}
                      data-tut={"deposit-approve-button"}
                    >
                      Approve
                    </button>
                  )}
                </div>
              ) : (
                <>
                  {/* <button
                    className={classes.switchNetworksButton}
                    onClick={() => {
                      onChangeNetwork(
                        parseInt(
                          process.env.REACT_APP_SUPPORTED_CHAIN_IDS.split(
                            ","
                          )[1]
                        )
                      );
                    }}
                  >
                    Switch to Polygon Network
                  </button> */}
                </>
              )}
            </div>
          )}

          {showVerify && !kycBypassers.some((e) => e === account) && (
            <div className={classes.kyc}>
              {stakingBalance > 1000 ? (
                <p>Please complete the KYC verification process</p>
              ) : (
                <p>
                  You have to stake at least a 1000 PEAK tokens in order to
                  participate in sales.{" "}
                  <a onClick={() => navigate("/allocation-staking")}>
                    Go to staking
                  </a>
                </p>
              )}
            </div>
          )}
        </div>
        {isDepositStage && account && isRegistered && (
          <div className={classes.additionalSaleInfo}>
            <div>
              Minimum Deposit:{" "}
              <span className={classes.colorInsert}>10 USDT</span>
            </div>
            <div className={classes.blackSquare}></div>
            <div>
              Maximum Deposit:{" "}
              <span className={classes.colorInsert}>unlimited</span>
            </div>
            <div>
              Your estimated allocation based on the number of whitelisted
              users:
              <span className={classes.colorInsert}>
                ${tierAllocation[userTier]}
              </span>
            </div>
          </div>
        )}

        {/* {
                    <>
                        <div className={classes.line} ></div>

                        <div className={classes.tierInfo}>
                            <div className={classes.infoItem}>
                                <h1>Tier Level</h1>
                                <h2>{userTier}</h2>
                            </div>

                            {depositedAmount > 0 &&
                                <div className={classes.fancyInfoItem}>
                                    <h1>Your Allocation <img src={ArrowRight} /></h1>
                                    <h2>{depositedAmount}</h2>
                                </div>
                            }


                        </div>
                    </>
                } */}
      </div>
      <ErrorDialog
        show={showError}
        setError={setShowError}
        customMessage={errorMessage}
      />
      <ErrorDialogStake
        show={showErrorStake}
        setError={setShowErrorStake}
        customMessage={errorMessage}
      />
      <DialogBase
        show={showMessage}
        setShow={setShowMessage}
        message={message}
        icon={messageIcon}
        buttonText={"OK"}
      />
      <ConfimrationDialog
        show={showConfirm}
        setError={setShowConfirm}
        callback={callback}
        message={confirmMessage}
      />
    </div>
  );
};

export default IdoBlock;

function priceDetail(props) {
  return (
    <div className={classes.priceDetail}>
      <div className={classes.text}> Price </div>
      <div className={classes.price}> ${props.price} </div>
    </div>
  );
}

function textToShow(text, value) {
  return (
    <div className={classes.textToShow}>
      <div className={classes.text}>{text}</div>
      <div className={classes.value}>{value}</div>
    </div>
  );
}

function progressBar(props) {
  return (
    <div className={classes.progressBarWrapper}>
      <div className={classes.progressBar}>
        <div className={classes.backPart}></div>
        <div
          style={{ width: `${props.info.sale_progres}%` }}
          className={classes.topPart}
        ></div>
      </div>

      <div
        style={{
          marginLeft: `calc(${Math.min(props.info.sale_progres, 100)}% - 0.5em`,
        }}
      >
        <p>
          Sale <b>{Math.min(Math.round(props.info.sale_progres), 100)}%</b>
        </p>
      </div>
    </div>
  );
}

function RoundDetail({ time_left, current_round, ido }) {
  let timer;
  const [iTimeLeft, setITimeLeft] = useState(time_left);

  const updateCount = () => {
    timer =
      !timer &&
      setInterval(() => {
        setITimeLeft((prevCount) => prevCount - 1); // new
      }, 1000);
  };

  const roundNamesMapper = (roundName) => {
    if (roundName === "Registration round") {
      return "Whitelisting";
    } else if (roundName === "Sale round") {
      return "Sale";
    }

    return roundName;
  };

  useEffect(() => {
    updateCount();

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={classes.roundDetail}>
      <div className={classes.block}>
        <div className={classes.text}></div>
        <div className={classes.text}> Time left </div>
      </div>
      <div className={classes.block}>
        <div className={classes.roundInfo}>
          {" "}
          {roundNamesMapper(current_round)}{" "}
        </div>
        <div className={classes.timeInfo}> {timeLeft(iTimeLeft)} </div>
      </div>
    </div>
  );
}

function launchDetaid(props, totalBUSDRaised, ido) {
  console.log("lol", props, totalBUSDRaised, ido);
  return (
    <div className={classes.roundDetail}>
      <div className={classes.block}>
        <div className={classes.text}> Tokens for Sale</div>
        {props.info.time_until_launch === "Launched" && (
          <div className={classes.text}> Total Raise </div>
        )}
      </div>
      <div className={classes.block}>
        <div className={classes.roundInfo}>
          {" "}
          {numberWithCommas(props.info.token_distribution)}{" "}
        </div>
        {props.info.time_until_launch === "Launched" && (
          <div className={classes.roundInfo}>
            {" "}
            $
            {numberWithCommas(
              ido?.token?.read_from_db
                ? parseInt(
                    parseInt(ido?.token?.token_distribution) *
                      ido?.token?.token_price_in_usd
                  ).toFixed(2)
                : props.totalRaised.toFixed(2)
            )}{" "}
          </div>
        )}
      </div>
    </div>
  );
}
