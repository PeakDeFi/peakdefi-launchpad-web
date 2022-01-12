import React from "react";
import classes from './MainScreen.module.scss'
import InfoBlock from './components/InfoBlock/Info'
import IDO from './components/IDOBlock/IDO'

class MainScreen extends React.PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            mainText: "Enter the gateway of Blockchain Projects"
        }
    }

    render() {
        
        return (
            <div className={classes.MainSCreen}>
                <div className={classes.mainText}>
                    {this.state.mainText}
                </div>

                <InfoBlock />
                <IDO />
            </div>
        )
    }
}

export default MainScreen
