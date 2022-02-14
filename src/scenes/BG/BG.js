import React, { useEffect, useState } from "react";
import classes from "./BG.module.scss"
import BG_img from '../../resources/bg_gradient.svg'
import BG2_img from '../../resources/bg2_gradient.svg'

const BG = () => {
    const [bgimg, setbgImg] = useState(BG_img);

    useEffect(()=>{
        if(window.location.href.indexOf('project-details')>=0){
            setbgImg(BG2_img);

        }else{
            setbgImg(BG_img);
        }
    }, [window.location.href])

    return ( 
        <div className={classes.BG}>
            <img src={bgimg} alt="" />
        </div>
     );
}
 
export default BG;