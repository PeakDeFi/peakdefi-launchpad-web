import React from "react";
import classes from "./BG.module.scss"
import BG_img from '../../resources/bg_gradient.svg'
class BG extends React.PureComponent{
    constructor(props) {
        super(props)
    }

    render() {
        return (<div className={classes.BG}>
            <img src={BG_img} alt="" />
        </div>)
    }
}

export default BG