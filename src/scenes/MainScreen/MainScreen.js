import { useState } from "react";
import classes from './MainScreen.module.scss'
import InfoBlock from './components/InfoBlock/Info'
import IDO from './components/IDOBlock/IDO'
import { useNavigate } from "react-router-dom";
import BuyPeak from "./components/BuyPeak/BuyPeak";
import GiveAwayPanel from "./../Header/components/GiveawayPanel/GiveawayPanel"
import { AnimationOnScroll } from 'react-animation-on-scroll';
import AlertsPanel from "./components/AlertsPanel/AlertsPanel";
import WestHamUnitedLogo from './images/WHUFC-Crest_21-Full-Colour_RGB.png'
import KOLs from "./components/KOLs/KOLs";


const MainScreen = () => {
    const [mainText, setMainText] = useState(<>Join the next crypto unicorns.</>);
    const navigate = useNavigate();

    const [showGiveaway, setShowGiveaway] = useState(false);

    return (<div className={classes.MainSCreen}>
        <div className={classes.mainText}>
            {mainText}
        </div>
        <div className={classes.buttons}>
            {/* <div className={classes.infoButton} onClick={() => { navigate('/sales') }}>
                Launchpad
            </div> */}


            <div className={classes.winButton} onClick={() => setShowGiveaway(true)}>
                Win 500'000 PEAK
            </div>

            <div className={classes.winButton} onClick={() => { navigate("/admin-panel") }}>
                Admin panel
            </div>

        </div>
        <BuyPeak />

        <div className={classes.sponsorRow}>Decentralised asset manager partner from: <img src={WestHamUnitedLogo}/></div>

        <InfoBlock />
        <AnimationOnScroll animateIn="animate__fadeInUp" animateOut="animate__fadeOutDown" animateOnce={true}>
            <IDO />
        </AnimationOnScroll>

        <AnimationOnScroll animateIn="animate__fadeInUp" animateOut="animate__fadeOutDown" animateOnce={true}>
            <KOLs />
        </AnimationOnScroll>

        <AnimationOnScroll animateIn="animate__fadeInUp" animateOut="animate__fadeOutDown" animateOnce={true}>
            <AlertsPanel />
        </AnimationOnScroll>

        

        <GiveAwayPanel show={showGiveaway} setShow={setShowGiveaway} />
    </div>);
}

export default MainScreen;