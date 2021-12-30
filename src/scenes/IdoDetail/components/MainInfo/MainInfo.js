import React from "react";
import classes from "./MainInfo.module.scss"


export function MainInfo(props) {
    
    return (
        <div className={classes.mainInfo}>
            <div className={classes.textBlock}>
                <div className={classes.title}> {props.title} </div>
                <div className={classes.text}> {props.text} </div>
                <div className={classes.media}>
                    {props.media.map((media, id) => {
                        return <a key={id} href={media.link}> <img alt="" src={media.img} /> </a>
                    } )}
                </div>

                <div className={classes.mediaMobile}>
                    {props.media.map((media, id) => {
                        return <a key={id} href={media.link}> <img alt="" src={media.imgMobile} /> </a>
                    } )}
                </div>
            </div>
        </div>
    )
}
