import React, { useEffect, useState } from "react";
import classes from "./IDO.module.scss";
import TestImg from "./test_img.svg";
import { IdoBlock } from "./components/IdoBlock/IdoBlock";
import { UpcomingIdoBlock } from "./components/UpcomingIdoBlock/UpcomingIdoBlock";
import { OngoingIdo } from "./components/OngoingIdo/OngoingIdo";
import Table from "../Table/Table";
import {
  getUpcomingIdos,
  getCompletedPRODIdos,
  getMyIdos,
} from "./API/upcomingIDOs";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import {
  Link,
  Button,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";

import BlurredTBA1 from "../IDOBlock/images/card_1.png";
import BlurredTBA2 from "../IDOBlock/images/card_2.png";
import { useWeb3React } from "@web3-react/core";

const IDO = ({ props }) => {
  const { account } = useWeb3React();
  const [idos, setIdos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [upcomingIdos, setUpcomingIdos] = useState([]);
  const [endedIdos, setEndedIdos] = useState([]);
  const [ongoingIdos, setOngoingIdos] = useState([]);
  const [myIdos, setMyIdos] = useState([]);
  const navigate = useNavigate();
  const [displayIndex, setDisplayIndex] = useState(0);

  const showMobileCompleted = window.innerWidth < 1000; //set to true if you want to return completed IDOs tab on the main screen

  useEffect(() => {
    setIsLoading(true);
    getUpcomingIdos().then((response) => {
      setIsLoading(false);
      setUpcomingIdos([
        ...response.data.upcoming.map((e) => {
          return {
            id: e.id,
            sale_contract_address: e.contract_address,
            heading_text: e.heading_text,
            website: e.website_url,
            socials: e.socials,
            short_description: e.short_description,
            token: {
              name: e.token.name,
              symbol: e.token.symbol,
              img: e.logo_url,
              price: parseFloat(e.token.token_price_in_usd),
              token_distribution: parseInt(e.token.token_distribution),
            },
            saleInfo: {
              totalRaised: e.target_raised,
              raised: parseFloat(e.token.total_raise).toFixed(2),
              partisipants: e.number_of_participants,
              start_date: new Date(e.timeline.sale_start * 1000),
              token_price: e.current_price,
              time_until_launch: e.time_until_launch,
              end_date: e.timeline.sale_ends,

              info: {
                time_until_launch: null,
                token_sold: Math.round(parseFloat(e.token.total_tokens_sold)),
                token_distribution: e.token.token_distribution,
                sale_progres: e.percent_raised,
              },
            },
            bg_image: e.project_detail.project_bg,
            timeline: e.timeline,
          };
        }),
        { blank_img: BlurredTBA1 },
        { blank_img: BlurredTBA2 },
      ]);

      setOngoingIdos(
        response.data.ongoing.map((e) => {
          return {
            id: e.id,
            sale_contract_address: e.contract_address,
            is_private_sale: e.is_private_sale,
            token: {
              name: e.token.name,
              symbol: e.token.symbol,
              img: e.logo_url,
              price: parseFloat(e.token.token_price_in_usd),
              token_distribution: parseInt(e.token.token_distribution),
            },
            saleInfo: {
              totalRaised: e.target_raised,
              raised: parseFloat(e.token.total_raise).toFixed(2),
              partisipants: e.number_of_participants,
              start_date: new Date(e.timeline.sale_start * 1000),
              token_price: e.current_price,
              time_until_launch: e.time_until_launch,
              end_date: e.timeline.sale_ends,
              sale_price: e.token.token_price_in_usd
                ? e.token.token_price_in_usd
                : 0,

              info: {
                time_until_launch: null,
                token_sold: Math.round(parseFloat(e.token.total_tokens_sold)),
                token_distribution: e.token.token_distribution,
                sale_progres: e.percent_raised,
              },
            },
            bg_image: e.project_detail.project_bg,
            timeline: e.timeline,
          };
        })
      );

      setIdos(
        response.data.upcoming.map((e) => {
          return {
            id: e.id,
            socials: e.socials,
            website: e.website_url,
            heading_text: e.heading_text,
            is_private_sale: e.is_private_sale,
            token: {
              name: e.token.name,
              symbol: e.token.symbol,
              img: e.logo_url,
              price: parseFloat(e.token.current_token_price),
            },
            saleInfo: {
              totalRaised: e.target_raised,
              raised: parseFloat(e.token.total_raise).toFixed(2),
              partisipants: e.number_of_participants,
              start_date: new Date(e.timeline.sale_start * 1000),
              token_price: e.current_price,
              time_until_launch: e.time_until_launch,
              end_date: e.timeline.sale_ends,

              info: {
                time_until_launch: null,
                token_sold: Math.round(parseFloat(e.token.total_tokens_sold)),
                token_distribution: e.token.token_distribution,
                sale_progres: e.percent_raised,
              },
            },
            bg_image: e.project_detail.project_bg,
            timeline: e.timeline,
          };
        })
      );
    });

    getCompletedPRODIdos().then((response) => {
      setEndedIdos(
        response.data.ended.map((e) => {
          return {
            id: e.id,
            sale_contract_address: e.contract_address,
            is_private_sale: e.is_private_sale,
            token: {
              name: e.token.name,
              symbol: e.token.symbol,
              img: e.logo_url,
              price: parseFloat(e.token.token_price_in_usd),
              token_distribution: parseInt(e.token.token_distribution),
              total_raise: e.token.total_raise,
            },
            saleInfo: {
              totalRaised: e.target_raised,
              raised: parseFloat(e.token.total_raise).toFixed(2),
              partisipants: e.number_of_participants,
              start_date: new Date(e.timeline.sale_start * 1000),
              token_price: e.current_price,
              time_until_launch: e.time_until_launch,
              end_date: e.timeline.sale_ends,

              info: {
                time_until_launch: null,
                token_sold: Math.round(parseFloat(e.token.total_tokens_sold)),
                token_distribution: e.token.token_distribution,
                sale_progres: e.percent_raised,
              },
            },
            bg_image: e.project_detail.project_bg,
            timeline: e.timeline,
          };
        })
      );
    });
  }, []);

  useEffect(() => {
    if (account) {
      getMyIdos(account).then((response) => {
        setMyIdos(
          response.data.user_idos.map((e) => {
            return {
              id: e.id,
              sale_contract_address: e.contract_address,
              is_private_sale: e.is_private_sale,
              token: {
                name: e.token.name,
                symbol: e.token.symbol,
                img: e.logo_url,
                price: parseFloat(e.token.token_price_in_usd),
                token_distribution: parseInt(e.token.token_distribution),
                total_raise: e.token.total_raise,
              },
              saleInfo: {
                totalRaised: e.target_raised,
                raised: parseFloat(e.token.total_raise).toFixed(2),
                partisipants: e.number_of_participants,
                start_date: new Date(e.timeline.sale_start * 1000),
                token_price: e.current_price,
                time_until_launch: e.time_until_launch,
                end_date: e.timeline.sale_ends,

                info: {
                  time_until_launch: null,
                  token_sold: Math.round(parseFloat(e.token.total_tokens_sold)),
                  token_distribution: e.token.token_distribution,
                  sale_progres: e.percent_raised,
                },
              },
              bg_image: e.project_detail.project_bg,
              timeline: e.timeline,
            };
          })
        );
      });
    }
  }, [account]);

  return (
    <div style={{ marginBottom: "40px" }} data-tut={"projects_section"}>
      <Element name="ongoingSale">
        {ongoingIdos.length > 0 && (
          <div className={classes.ongoing}>
            <h1 className={classes.title}>Ongoing IDOs</h1>

            <div className={classes.ongoingIdos}>
              {ongoingIdos.map((ido_data, index) => {
                if (window.screen.width <= 1000) {
                  return (
                    <IdoBlock
                      props={ido_data}
                      key={"ido_data" + index}
                    ></IdoBlock>
                  );
                }

                return (
                  <OngoingIdo
                    props={ido_data}
                    key={"ido_data" + index}
                  ></OngoingIdo>
                );
              })}
            </div>
          </div>
        )}
      </Element>

      <div className={classes.menu}>
        <div
          onClick={() => {
            setIdos([...upcomingIdos]);
            setDisplayIndex(0);
          }}
          className={
            displayIndex === 0 ? classes.menuElementActive : classes.menuElement
          }
        >
          Upcoming IDOs
          <div
            className={displayIndex === 0 ? classes.line : classes.clear}
          ></div>
        </div>
        {!showMobileCompleted && (
          <div
            onClick={() => {
              setIdos([...endedIdos]);
              setDisplayIndex(1);
            }}
            className={
              displayIndex === 1
                ? classes.menuElementActive
                : classes.menuElement
            }
          >
            Completed IDOs
            <div
              className={displayIndex === 1 ? classes.line : classes.clear}
            ></div>
          </div>
        )}
        {account && (
          <div
            onClick={() => {
              setIdos([...myIdos]);
              setDisplayIndex(2);
            }}
            className={
              displayIndex === 2
                ? classes.menuElementActive
                : classes.menuElement
            }
          >
            Your IDOs
            <div
              className={displayIndex === 2 ? classes.line : classes.clear}
            ></div>
          </div>
        )}
      </div>

      <div
        className={displayIndex === 1 ? classes.idos : classes.upidos}
        style={{
          justifyContent:
            idos.length < 3 ? "flex-start !important" : "space-between",
        }}
      >
        {displayIndex !== 0 && (
          <>
            {idos.map((ido_data, index) => {
              return (
                <IdoBlock
                  props={{ ...ido_data, type: "completed" }}
                  key={"ido_data" + index}
                ></IdoBlock>
              );
            })}
            <div className={classes.emptyArrays}>
              {idos.length === 0 && <p>No IDOs to display</p>}
            </div>
          </>
        )}

        {displayIndex === 0 &&
          [...upcomingIdos].map((ido_data, index) => {
            return (
              <UpcomingIdoBlock
                props={ido_data}
                key={"ido_data" + index}
              ></UpcomingIdoBlock>
            );
          })}
      </div>

      {showMobileCompleted && (
        <>
          <div className={classes.menu}>
            <div className={classes.menuElementActive}>
              Completed IDOs
              <div className={classes.line}></div>
            </div>
          </div>
          <div
            className={displayIndex === 1 ? classes.idos : classes.upidos}
            style={{
              justifyContent:
                idos.length < 3 ? "flex-start !important" : "space-between",
            }}
          >
            {endedIdos.length === 0 && (
              <div className={classes.emptyArrays}>
                {isLoading && <CircularProgress color="inherit" />}
                {!isLoading && <p>No IDOs to display</p>}
              </div>
            )}

            {endedIdos.map((ido_data, index) => {
              return (
                <IdoBlock props={ido_data} key={"ido_data" + index}></IdoBlock>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default IDO;
