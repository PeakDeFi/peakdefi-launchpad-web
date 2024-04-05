/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from "react";
import classes from "./IdoDetail.module.scss";
import { MainInfo } from "./components/MainInfo/MainInfo";
import IdoBlock from "./components/IdoBlock/IdoBlock";
import DetailTable from "./components/DetailTable/DetailTable";
import { ethers } from "ethers";

import { SALE_ABI, TOKEN_ABI } from "../../consts/abi";

// Image imports
import TestImg from "../MainScreen/components/IDOBlock/test_img.svg";
import Telegram from "./img/telegram.svg";
import Twitter from "./img/twitter.svg";
import Mediun from "./img/medium.svg";
import Img1 from "./img/img1.svg";
import Img2 from "./img/img2.svg";
import Img3 from "./img/img3.svg";
import Img4 from "./img/img4.svg";
import CheckedImg from "./img/Checked_IMG.svg";
import {
  getSingleIdo,
  getSingleIdoByName,
  getSingleProdIdoByName,
} from "../MainScreen/components/Table/API/idos";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setBG } from "../../features/projectDetailsSlice";
import { useNavigate } from "react-router-dom";
import { RpcProvider } from "../../consts/rpc";
import SubscribePanel from "./components/SubscribePanel/SubscribePanel";
import { useParams } from "react-router-dom";
import EbookBanner from "../MainScreen/components/EbookBanner/EbookBanner";
import moment from "moment/moment";
import "moment-timezone";
import { useProviderHook } from "hooks/useProviderHook/useProviderHook";
import WhitelistNetworkSwitcher from "./components/WhitelistNetworkSwitcher/WhitelistNetworkSwitcher";

const IdoDetail = (props) => {
  const provider = useProviderHook();
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const currentBg = useSelector((state) => state.projectDetails.bg_image);

  const projectName = useMemo(() => {
    if (params.name === "rivals" || params.name === "rival") {
      return encodeURI("bit rivals");
    }
    return params.name;
  }, [params?.name]);

  const [totalBUSDRaised, setTotalBUSDRaised] = useState(0);
  const [title, setTitle] = useState(
    "A Fully-Decentralized Play-and-Earn Idle Game"
  );
  const [text, setText] = useState(
    "Crabada is an exciting play-and-earn NFT game based in a world filled with fierce fighting Hermit-Crabs called Crabada (the NFTs)."
  );
  const [media, setMedia] = useState([
    {
      link: "",
      img: Telegram,
      imgMobile:
        "https://cdn-icons.flaticon.com/png/512/3670/premium/3670044.png?token=exp=1639986909~hmac=7e5f006cead8d6588bd91b5e6e9da32a",
    },
    {
      link: "",
      img: Twitter,
      imgMobile:
        "https://cdns.iconmonstr.com/wp-content/assets/preview/2012/240/iconmonstr-twitter-4.png",
    },
    {
      link: "",
      img: Mediun,
      imgMobile:
        "https://cdns.iconmonstr.com/wp-content/assets/preview/2018/240/iconmonstr-medium-4.png",
    },
  ]);
  const [idoInfo, setIdoInfo] = useState({
    token: {
      name: "",
      symbol: "",
      price: "",
      peakPrice: 0,
      img: null,
    },
    saleInfo: {
      totalRaised: 0,
      raised: 0,
      partisipants: 0,
      start_date: 0,
      end_date: 0,
      token_price: 0,
      info: {
        time_until_launch: null,
        token_sold: 0,
        token_distribution: 0,
        sale_progres: 0,
      },
    },
  });
  const [dataToShowParticipate, setDataToShowParticipate] = useState([
    {
      img: Img1,
      title: "Whitelisting opens",
      text1: "",
      text2: "",
      UTCTime: "",
      date: new Date(Date.now()),
    },
    {
      img: Img2,
      title: "Whitelisting closes",
      text1: "",
      text2: "",
      UTCTime: "",
      date: new Date(Date.now()),
      isNewDate: projectName === "another-1",
    },
    {
      img: Img3,
      title: "Sale starts",
      text1: "",
      text2: "",
      UTCTime: "",
      date: new Date(Date.now()),
      isNewDate: projectName === "another-1",
    },
    {
      img: Img4,
      title: "Sale ends",
      text1: "",
      text2: "",
      UTCTime: "",
      date: new Date(Date.now()),
      isNewDate: projectName === "another-1",
    },
  ]);
  const [saleContract, setSaleContract] = useState();
  const [tokenContract, setTokenContract] = useState();

  const [ido, setIdo] = useState();

  useEffect(async () => {
    if (params.type && params.type === "completed") {
      getSingleProdIdoByName(projectName).then(async (response) => {
        const selectedIdo = response.data.ido;

        dispatch(setBG(response.data.ido.project_detail.project_bg));

        let tDataToShowParticipate = [...dataToShowParticipate];

        tDataToShowParticipate[0].date = new Date(
          selectedIdo.timeline.registration_start * 1000
        );
        tDataToShowParticipate[0].text1 = new Date(
          selectedIdo.timeline.registration_start * 1000
        ).toLocaleString("en-US", { dateStyle: "long" });
        tDataToShowParticipate[0].text2 =
          new Date(
            selectedIdo.timeline.registration_start * 1000
          ).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }) +
          " " +
          moment.tz(moment.tz.guess()).zoneAbbr();
        tDataToShowParticipate[0].UTCTime = new Date(
          selectedIdo.timeline.registration_start * 1000
        ).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

        tDataToShowParticipate[1].date = new Date(
          selectedIdo.timeline.registration_end * 1000
        );
        tDataToShowParticipate[1].text1 = new Date(
          selectedIdo.timeline.registration_end * 1000
        ).toLocaleString("en-US", { dateStyle: "long" });
        tDataToShowParticipate[1].text2 =
          new Date(
            selectedIdo.timeline.registration_end * 1000
          ).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }) +
          " " +
          moment.tz(moment.tz.guess()).zoneAbbr();
        tDataToShowParticipate[1].UTCTime =
          (
            "0" +
            new Date(selectedIdo.timeline.registration_end * 1000).getUTCHours()
          ).slice(-2) +
          ":" +
          (
            "0" +
            new Date(
              selectedIdo.timeline.registration_end * 1000
            ).getUTCMinutes()
          ).slice(-2);

        tDataToShowParticipate[2].date = new Date(
          selectedIdo.timeline.sale_start * 1000
        );
        tDataToShowParticipate[2].text1 = new Date(
          selectedIdo.timeline.sale_start * 1000
        ).toLocaleString("en-US", { dateStyle: "long" });
        tDataToShowParticipate[2].text2 =
          new Date(selectedIdo.timeline.sale_start * 1000).toLocaleTimeString(
            "en-US",
            { hour: "2-digit", minute: "2-digit" }
          ) +
          " " +
          moment.tz(moment.tz.guess()).zoneAbbr();
        tDataToShowParticipate[2].UTCTime =
          (
            "0" + new Date(selectedIdo.timeline.sale_start * 1000).getUTCHours()
          ).slice(-2) +
          ":" +
          (
            "0" +
            new Date(selectedIdo.timeline.sale_start * 1000).getUTCMinutes()
          ).slice(-2);

        tDataToShowParticipate[3].date = new Date(
          selectedIdo.timeline.sale_end * 1000
        );
        tDataToShowParticipate[3].text1 = new Date(
          selectedIdo.timeline.sale_end * 1000
        ).toLocaleString("en-US", { dateStyle: "long" });
        tDataToShowParticipate[3].text2 =
          new Date(selectedIdo.timeline.sale_end * 1000).toLocaleTimeString(
            "en-US",
            { hour: "2-digit", minute: "2-digit" }
          ) +
          " " +
          moment.tz(moment.tz.guess()).zoneAbbr();
        tDataToShowParticipate[3].UTCTime =
          (
            "0" + new Date(selectedIdo.timeline.sale_end * 1000).getUTCHours()
          ).slice(-2) +
          ":" +
          (
            "0" + new Date(selectedIdo.timeline.sale_end * 1000).getUTCMinutes()
          ).slice(-2);

        setDataToShowParticipate([...tDataToShowParticipate]);
        let tIdoInfo = { ...idoInfo };

        setIdo(selectedIdo);
        setTitle(selectedIdo.title);
        setText(selectedIdo.heading_text);

        let Salecontract;
        let contractSaleInfo = null;
        try {
          const Salecontract = new ethers.Contract(
            selectedIdo.contract_address,
            SALE_ABI,
            provider
          );

          contractSaleInfo = await Salecontract.sale();
        } catch (error) {
          console.log("IAMHERE LOL", error);
        }

        tIdoInfo.token = {
          name: selectedIdo.token.name,
          symbol: selectedIdo.token.symbol,
          price: parseFloat(selectedIdo.token.token_price_in_usd),
          peakPrice: parseFloat(selectedIdo.token.token_price_in_avax),
          img: selectedIdo.logo_url,
        };
        console.log(
          "My Local info",
          selectedIdo.token.read_from_db
            ? parseFloat(selectedIdo.token.total_tokens_sold) *
                parseFloat(selectedIdo.token.token_price_in_usd)
            : Number(contractSaleInfo?.totalBUSDRaised) / 10 ** 18
        );
        tIdoInfo.saleInfo = {
          totalRaised: selectedIdo.token.read_from_db
            ? parseFloat(selectedIdo.token.total_tokens_sold) *
              parseFloat(selectedIdo.token.token_price_in_usd)
            : Number(contractSaleInfo?.totalBUSDRaised) / 10 ** 18,
          raised: selectedIdo.total_raised,
          partisipants: selectedIdo.number_of_participants,
          start_date: selectedIdo.timeline.sale_start,
          end_date: selectedIdo.timeline.sale_ends,
          token_price: parseFloat(selectedIdo.token.price_in_avax),
          info: {
            time_until_launch: selectedIdo.time_until_launch,
            token_sold: parseFloat(selectedIdo.token.total_tokens_sold),
            token_distribution: parseFloat(
              selectedIdo.token.token_distribution
            ),
            sale_progres:
              params.type && params.type === "completed"
                ? 100
                : isNaN(
                    ((100 *
                      (contractSaleInfo?.totalBUSDRaised /
                        contractSaleInfo?.tokenPriceInBUST)) /
                      parseFloat(selectedIdo.target_raised)) *
                      selectedIdo.token.token_price_in_usd
                  )
                ? (100 * selectedIdo.token.total_raise) /
                  parseFloat(selectedIdo.target_raised)
                : ((100 *
                    (contractSaleInfo?.totalBUSDRaised /
                      contractSaleInfo?.tokenPriceInBUST)) /
                    parseFloat(selectedIdo.target_raised)) *
                  selectedIdo.token.token_price_in_usd,
          },
        };

        setIdoInfo({ ...tIdoInfo });

        setTotalBUSDRaised(contractSaleInfo?.totalBUSDRaised / 10 ** 18);

        setSaleContract(Salecontract);

        try {
          const t_tokenContract = new ethers.Contract(
            selectedIdo.token.token_address,
            TOKEN_ABI,
            provider
          );
          setTokenContract(t_tokenContract);
        } catch (error) {}

        setMedia(
          selectedIdo.socials.map((e) => {
            return {
              link: e.url,
              img: e.logo_url,
              imgMobile: e.logo_url,
            };
          })
        );
      });
    } else {
      getSingleIdoByName(projectName).then(async (response) => {
        const selectedIdo = response.data.ido;

        dispatch(setBG(response.data.ido.project_detail.project_bg));

        let tDataToShowParticipate = [...dataToShowParticipate];

        tDataToShowParticipate[0].date = new Date(
          selectedIdo.timeline.registration_start * 1000
        );
        tDataToShowParticipate[0].text1 = selectedIdo.timeline.show_text
          ? selectedIdo.timeline.sale_timeline_text
          : new Date(
              selectedIdo.timeline.registration_start * 1000
            ).toLocaleString("en-US", { dateStyle: "long" });
        tDataToShowParticipate[0].text2 = selectedIdo.timeline.show_text
          ? selectedIdo.timeline.sale_timeline_text
          : new Date(
              selectedIdo.timeline.registration_start * 1000
            ).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            }) +
            " " +
            moment.tz(moment.tz.guess()).zoneAbbr();
        tDataToShowParticipate[0].UTCTime = selectedIdo.timeline.show_text
          ? selectedIdo.timeline.sale_timeline_text
          : new Date(
              selectedIdo.timeline.registration_start * 1000
            ).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            });

        tDataToShowParticipate[1].date = new Date(
          selectedIdo.timeline.registration_end * 1000
        );
        tDataToShowParticipate[1].text1 = selectedIdo.timeline.show_text
          ? selectedIdo.timeline.sale_timeline_text
          : new Date(
              selectedIdo.timeline.registration_end * 1000
            ).toLocaleString("en-US", { dateStyle: "long" });
        tDataToShowParticipate[1].text2 = selectedIdo.timeline.show_text
          ? selectedIdo.timeline.sale_timeline_text
          : new Date(
              selectedIdo.timeline.registration_end * 1000
            ).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            }) +
            " " +
            moment.tz(moment.tz.guess()).zoneAbbr();
        tDataToShowParticipate[1].UTCTime = selectedIdo.timeline.show_text
          ? selectedIdo.timeline.sale_timeline_text
          : (
              "0" +
              new Date(
                selectedIdo.timeline.registration_end * 1000
              ).getUTCHours()
            ).slice(-2) +
            ":" +
            (
              "0" +
              new Date(
                selectedIdo.timeline.registration_end * 1000
              ).getUTCMinutes()
            ).slice(-2);

        tDataToShowParticipate[2].date = new Date(
          selectedIdo.timeline.sale_start * 1000
        );
        tDataToShowParticipate[2].text1 = selectedIdo.timeline.show_text
          ? selectedIdo.timeline.sale_timeline_text
          : new Date(selectedIdo.timeline.sale_start * 1000).toLocaleString(
              "en-US",
              { dateStyle: "long" }
            );
        tDataToShowParticipate[2].text2 = selectedIdo.timeline.show_text
          ? selectedIdo.timeline.sale_timeline_text
          : new Date(selectedIdo.timeline.sale_start * 1000).toLocaleTimeString(
              "en-US",
              { hour: "2-digit", minute: "2-digit" }
            ) +
            " " +
            moment.tz(moment.tz.guess()).zoneAbbr();
        tDataToShowParticipate[2].UTCTime = selectedIdo.timeline.show_text
          ? selectedIdo.timeline.sale_timeline_text
          : (
              "0" +
              new Date(selectedIdo.timeline.sale_start * 1000).getUTCHours()
            ).slice(-2) +
            ":" +
            (
              "0" +
              new Date(selectedIdo.timeline.sale_start * 1000).getUTCMinutes()
            ).slice(-2);

        tDataToShowParticipate[3].date = new Date(
          selectedIdo.timeline.sale_end * 1000
        );
        tDataToShowParticipate[3].text1 = selectedIdo.timeline.show_text
          ? selectedIdo.timeline.sale_timeline_text
          : new Date(selectedIdo.timeline.sale_end * 1000).toLocaleString(
              "en-US",
              { dateStyle: "long" }
            );
        tDataToShowParticipate[3].text2 = selectedIdo.timeline.show_text
          ? selectedIdo.timeline.sale_timeline_text
          : new Date(selectedIdo.timeline.sale_end * 1000).toLocaleTimeString(
              "en-US",
              { hour: "2-digit", minute: "2-digit" }
            ) +
            " " +
            moment.tz(moment.tz.guess()).zoneAbbr();
        tDataToShowParticipate[3].UTCTime = selectedIdo.timeline.show_text
          ? selectedIdo.timeline.sale_timeline_text
          : (
              "0" + new Date(selectedIdo.timeline.sale_end * 1000).getUTCHours()
            ).slice(-2) +
            ":" +
            (
              "0" +
              new Date(selectedIdo.timeline.sale_end * 1000).getUTCMinutes()
            ).slice(-2);

        setDataToShowParticipate([...tDataToShowParticipate]);
        let tIdoInfo = { ...idoInfo };

        setIdo(selectedIdo);
        setTitle(selectedIdo.title);
        setText(selectedIdo.heading_text);

        let Salecontract;
        let contractSaleInfo = null;
        try {
          const Salecontract = new ethers.Contract(
            selectedIdo.contract_address,
            SALE_ABI,
            provider
          );
          console.log("contractSaleInfo", contractSaleInfo);
          contractSaleInfo = await Salecontract.sale();
        } catch (error) {
          console.log("WTF", error);
        }

        tIdoInfo.token = {
          name: selectedIdo.token.name,
          symbol: selectedIdo.token.symbol,
          price: parseFloat(selectedIdo.token.token_price_in_usd),
          peakPrice: parseFloat(selectedIdo.token.token_price_in_avax),
          img: selectedIdo.logo_url,
        };
        console.log(
          "My Local info 1",
          selectedIdo.token.read_from_db
            ? parseFloat(selectedIdo.token.total_tokens_sold) *
                parseFloat(selectedIdo.token.token_price_in_usd)
            : Number(contractSaleInfo?.totalBUSDRaised) / 10 ** 18
        );
        tIdoInfo.saleInfo = {
          totalRaised: selectedIdo.token.read_from_db
            ? parseFloat(selectedIdo.token.total_tokens_sold) *
              parseFloat(selectedIdo.token.token_price_in_usd)
            : Number(contractSaleInfo?.totalBUSDRaised ?? 0) / 10 ** 18,
          raised: selectedIdo.total_raised,
          partisipants: selectedIdo.number_of_participants,
          start_date: selectedIdo.timeline.sale_start,
          end_date: selectedIdo.timeline.sale_ends,
          token_price: parseFloat(selectedIdo.token.price_in_avax),
          info: {
            time_until_launch: selectedIdo.time_until_launch,
            token_sold: parseFloat(selectedIdo.token.total_tokens_sold),
            token_distribution: parseFloat(
              selectedIdo.token.token_distribution
            ),
            sale_progres: isNaN(
              ((100 *
                (contractSaleInfo?.totalBUSDRaised /
                  contractSaleInfo?.tokenPriceInBUST)) /
                parseFloat(selectedIdo.target_raised)) *
                selectedIdo.token.token_price_in_usd
            )
              ? 0
              : (contractSaleInfo?.totalBUSDRaised /
                  contractSaleInfo?.tokenPriceInBUST /
                  parseFloat(selectedIdo.target_raised)) *
                100,
          },
        };

        setIdoInfo({ ...tIdoInfo });

        setTotalBUSDRaised(contractSaleInfo?.totalBUSDRaised / 10 ** 18);

        setSaleContract(Salecontract);

        try {
          const t_tokenContract = new ethers.Contract(
            selectedIdo.token.token_address,
            TOKEN_ABI,
            provider
          );
          setTokenContract(t_tokenContract);
        } catch (error) {}

        setMedia(
          selectedIdo.socials.map((e) => {
            return {
              link: e.url,
              img: e.logo_url,
              imgMobile: e.logo_url,
            };
          })
        );
      });
    }

    const { ethereum } = window;
    if (ethereum) {
      let lidoInfo = {
        token: {
          name: "",
          symbol: "",
          price: "",
          peakPrice: 0,
          img: TestImg,
        },
        saleInfo: {
          totalRaised: 0,
          raised: 0,
          partisipants: 0,
          start_date: 0,
          end_date: 0,
          token_price: 0,
          info: {
            time_until_launch: null,
            token_sold: 0,
            token_distribution: 0,
            sale_progres: 0,
          },
          user: {},
        },
      };
    }
  }, [projectName, params.type]);

  if (ido === undefined) return <></>;

  return (
    <div className={classes.idoDetail}>
      <div className={classes.firstBlock}>
        <IdoBlock
          idoInfo={idoInfo}
          ido={ido}
          media={media}
          projectName={projectName}
        />

        <MainInfo
          title={title}
          text={text}
          media={media}
          saleContract={saleContract}
          tokenContract={tokenContract}
          ido={ido}
        />
      </div>

      <div className={classes.participateBlocks}>
        {dataToShowParticipate.map((data) => {
          return participateBlock(data);
        })}
      </div>

      <div className={classes.tableDetail}>
        <DetailTable ido={ido} />
      </div>

      <div className={classes.subscribeSection}>
        <EbookBanner />
      </div>
    </div>
  );
};

export default IdoDetail;

function participateBlock(props) {
  return (
    <div key={props.title} className={classes.participateBlock}>
      <div className={classes.imgBlock}>
        {props.date.getTime() > Date.now() && props.isNewDate && (
          <div className={classes.newDateBadge}>New date!</div>
        )}
        <img
          alt=""
          src={props.date.getTime() > Date.now() ? props.img : CheckedImg}
        />
      </div>
      <div className={classes.title}> {props.title} </div>
      <div className={classes.text}> {props.text1} </div>
      <div className={classes.text}> {props.text2} </div>
      {/* <div className={classes.text} > ({props.UTCTime} UTC)  </div> */}
    </div>
  );
}
