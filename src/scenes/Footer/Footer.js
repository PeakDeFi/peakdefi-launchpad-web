import React from "react";
import classes from './Footer.module.scss'
import Logo from '../../resources/logo_dark.svg'
export function Footer(props) {
    
    return (<div className={classes.Footer}>
        <div className={classes.logo}>
            <img alt="Dark Logo" src={Logo} />
        </div>
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent:"center"
        }}>
            <div className={classes.blockInfo}>
                <div className={classes.link}> Terms of Services </div>
                <div className={classes.link}> Privacy Policy </div>
            </div>
        </div>
        <div className={classes.platform}>
            © PeakDefi Launchpad 2021
        </div>
    </div>)
}