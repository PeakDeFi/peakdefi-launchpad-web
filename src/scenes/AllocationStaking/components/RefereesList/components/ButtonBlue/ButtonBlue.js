import React from "react";

import classes from './ButtonBlue.module.scss';

 
const ButtonBlue= ({onClick, children, className }) => {
    return (<button onClick={onClick} className={classes.ButtonLight + ' ' + className}>
        {children}
    </button>);
}
 
export default ButtonBlue;