import { useState } from "react";
import classes from './MainScreen.module.scss'
import InfoBlock from './components/InfoBlock/Info'
import IDO from './components/IDOBlock/IDO'
import { useNavigate } from "react-router-dom";
import BuyPeak from "./components/BuyPeak/BuyPeak";
import GiveAwayPanel from "./../Header/components/GiveawayPanel/GiveawayPanel"



const MainScreen = () => {
    const [mainText, setMainText] = useState(<>Enter the gateway<br></br> of Blockchain Projects</>);
    const navigate = useNavigate();

    const [showGiveaway, setShowGiveaway] = useState(false);

    return (<div className={classes.MainSCreen}>
        <div className={classes.mainText}>
            {mainText}
        </div>
        <div className={classes.buttons}>
            <div className={classes.infoButton} onClick={() => { navigate('/sales') }}>
                Launchpad
            </div>


            <div className={classes.winButton} onClick={() => setShowGiveaway(true)}>
                Win 100'000 PEAK
            </div>



        </div>
        <BuyPeak />

        <InfoBlock />
        <IDO />
        <GiveAwayPanel show={showGiveaway} setShow={setShowGiveaway} />
    </div>);
}

export default MainScreen;