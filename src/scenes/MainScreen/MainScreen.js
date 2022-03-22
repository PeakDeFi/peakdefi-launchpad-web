import {useState} from "react";
import classes from './MainScreen.module.scss'
import InfoBlock from './components/InfoBlock/Info'
import IDO from './components/IDOBlock/IDO'
import { useNavigate } from "react-router-dom";



const MainScreen = () => {
    const [mainText, setMainText] = useState(<>Enter the gateway<br></br> of Blockchain Projects</>);
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
    </div>);
}

export default MainScreen;