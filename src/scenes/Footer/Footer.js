import React from "react";
import classes from './Footer.module.scss'
import Logo from '../../resources/logo_dark.svg'
import UsefulLinks from "./components/UsefulLinks/UsefulLinks";
import MediaLinks from "./components/MediaLinks/MediaLinks";
import Disclaimer from "./components/Disclaimer/Disclaimer";
export function Footer(props) {
    
    return (<footer className={classes.Footer}>
        <div className={classes.container}>
            <UsefulLinks />
            <div className={classes.separator} />
            <MediaLinks />
            <Disclaimer />
        </div>
    </footer>)
}