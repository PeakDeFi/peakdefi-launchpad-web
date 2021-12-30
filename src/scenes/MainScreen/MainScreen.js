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

    componentDidMount() {    
    this.loadBlockpassWidget()
  }

    loadBlockpassWidget = () => {
        const blockpass = new window.BlockpassKYCConnect(
        'peak_16051', // service client_id from the admin console
        )

        blockpass.startKYCConnect()

        blockpass.on('KYCConnectSuccess', (user) => {
            console.log("connetcted", user)
        })
    }


    render() {
        
        return (
            <div className={classes.MainSCreen}>
                <button id="blockpass-kyc-connect">
                Verify with Blockpass
            </button>
                {/* <div className={classes.mainText}>
                    {this.state.mainText}
                </div>

                <InfoBlock />
                <IDO /> */}
            </div>
        )
    }
}

export default MainScreen