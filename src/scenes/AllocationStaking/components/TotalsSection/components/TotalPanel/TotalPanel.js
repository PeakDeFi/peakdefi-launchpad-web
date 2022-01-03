import InfoIcon from '../../../StakingStats/images/InfoIcon.svg'

import classes from './TotalPanel.module.scss'

const TotalPanel = ({info}) => {
    return (<div className={classes.totalPanel}>
        <div className={classes.header}>
            <div className={classes.title}>{info.title}</div>
            <img src={InfoIcon} />
        </div>
        <div className={classes.body}>
            <div className={classes.value}>{info.value.value} {info.value.append} <span className={classes.valueSubappend}>{info.value.subappend}</span></div>
            <div className={classes.subvalue}> {info.subvalue.prepend}{info.subvalue.value}</div>
        </div>
    </div>);
}
 
export default TotalPanel;