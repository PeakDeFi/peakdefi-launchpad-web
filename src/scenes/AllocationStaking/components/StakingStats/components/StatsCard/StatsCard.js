import InfoIcon from '../../images/InfoIcon.svg'

import classes from './StatsCard.module.scss'

function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

const StatsCard = ({ info }) => {
    return (<div className={classes.statsCard}>
        <div className={classes.statsTitle}>
            {info.title} 
            <img src={InfoIcon} className={classes.titleIcon}/>
        </div>

        <div className={classes.contents}>
            {info.value &&
                <div>
                    <div className={classes.value}>
                        {info.value + ' ' + info.append}
                    </div>

                    {info.subvalue && 
                        <div className={classes.subvalue}>
                            {'~' + info.subvalue.append + numberWithCommas(info.subvalue.value)}
                        </div>
                    }
                </div>
            }

            {info.action &&
                <div>
                    {info.action.buttonText &&
                        <button className={classes.actionButton} disabled={!info.action.buttonActive} onClick={info.action.buttonCallback}>{info.action.buttonText} </button>
                    }
                </div>
            }
        </div>
    </div>);
}

export default StatsCard;