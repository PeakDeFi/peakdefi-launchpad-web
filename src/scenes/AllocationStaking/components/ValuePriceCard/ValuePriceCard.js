import classes from './ValuePriceCard.module.scss'
import tvl from './images/tvl.svg'
import priceIco from './images/price.svg'

function numFormatter(num) {
    if(num > 999 && num < 1000000){
        return (num/1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million 
    }
    else if(num > 1000000 && num < 10**9){
        return (num/1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million 
    }
    else if(num > 10**9){
        return((num/(10**9)).toFixed(2)+'B');
    }
    else if(num < 900){
        return num.toFixed(2); // if value < 1000, nothing to do
    }
}

const ValuePriceCard = ({ totalValueLocked, price }) => {
    return (
        <div className={classes.valuePriceCard}>
        
            <div className={classes.subsection}>
                <div className={classes.iconDiv}>
                    <img className={classes.icons} src={tvl} />
                </div>
                <div>
                    <div className={classes.subsectionTitle}>
                        Total Value Locked
                    </div>
                    <div className={classes.subsectionContent}>
                        {'$' + numFormatter(totalValueLocked)}
                    </div>
                </div>
            </div>

            <div className={classes.verticalSplitter}></div>


            <div className={classes.subsection}>
                <div className={classes.iconDiv}>
                    <img className={classes.icons} src={priceIco} />
                </div>
                <div>
                    <div className={classes.subsectionTitle}>
                        PEAKDEFI Price
                    </div>
                    <div className={classes.subsectionContent}>
                        {'$' + price}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ValuePriceCard;