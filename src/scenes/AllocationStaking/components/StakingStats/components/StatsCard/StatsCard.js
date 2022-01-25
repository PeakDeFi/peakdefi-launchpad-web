import { useSelector } from 'react-redux';
import InfoIcon from '../../images/InfoIcon.svg'

import classes from './StatsCard.module.scss'

function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

const StatsCard = ({ info }) => {
    const decimals = useSelector(state=>state.userWallet.decimal);

    return (<div className={classes.statsCard}>
        <div className={classes.statsTitle}>
            <div>{info.title}</div> 
            <img src={InfoIcon} className={classes.titleIcon}/>
        </div>

        <div className={classes.contents}>
            {info.value &&
                <div>
                    <div className={classes.val}>
                        {info.append==='PEAK' ? (info.value/Math.pow(10, decimals)).toFixed(2) : info.value} {info.append}
                    </div>

                    {info.subvalue && 
                        <div className={classes.subvalue}>
                            {'~' + info.subvalue.append + numberWithCommas(info.append==='PEAK' ? info.subvalue.value/Math.pow(10, decimals) : info.subvalue.value )}
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