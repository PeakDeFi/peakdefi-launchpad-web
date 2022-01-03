import InfoIcon from '../../images/InfoIcon.svg'

import classes from './StatsCard.module.scss'

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
                            {info.subvalue.value + info.subvalue.append}
                        </div>
                    }
                </div>
            }

            {info.action &&
                <div>
                    {info.action.buttonText &&
                        <button className={classes.actionButton}>{info.action.buttonText}</button>
                    }
                </div>
            }
        </div>
    </div>);
}

export default StatsCard;