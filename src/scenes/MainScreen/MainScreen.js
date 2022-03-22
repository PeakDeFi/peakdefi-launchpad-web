import {useState} from "react";
import classes from './MainScreen.module.scss'
import InfoBlock from './components/InfoBlock/Info'
import IDO from './components/IDOBlock/IDO'
import { useNavigate } from "react-router-dom";
import GiveAwayPanel from "./components/GiveawayPanel/GiveawayPanel";


const MainScreen = () => {
    const [mainText, setMainText] = useState(<>Enter the gateway<br></br> of Blockchain Projects</>);

    const [showGiveaway, setShowGiveaway] = useState(true);
    const navigate = useNavigate();
    
    return (<div className={classes.MainSCreen}>
        <div className={classes.mainText}>
            {mainText}
        </div>
        <div className={classes.infoButton} onClick={() => { navigate('/sales')}}>
            Go to sales
        </div>

        <InfoBlock />
        <IDO />
        <GiveAwayPanel show={showGiveaway} setShow={setShowGiveaway}/>
    </div>);
}

export default MainScreen;