import InfoIcon from '../../../StakingStats/images/InfoIcon.svg'

import classes from './TotalPanel.module.scss'

function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

const TotalPanel = ({info}) => {
    return (<div className={classes.totalPanel}>
        <div className={classes.header}>
            <div className={classes.title}>{info.title}</div>
            <img src={InfoIcon} className={classes.infoIcon}/>
        </div>
        <div className={classes.body}>
            <div className={classes.value}>{numberWithCommas(info.value.value)} {info.value.append} <span className={classes.valueSubappend}>{info.value.subappend}</span></div>
            <div className={classes.subvalue}> ~{info.subvalue.prepend}{numberWithCommas(parseFloat(info.subvalue.value.toFixed(2)))}</div>
        </div>
    </div>);
}
 
export default TotalPanel;