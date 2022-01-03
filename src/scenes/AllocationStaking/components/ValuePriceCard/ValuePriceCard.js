import classes from './ValuePriceCard.module.scss'
import tvl from './images/tvl.svg'
import priceIco from './images/price.svg'

const ValuePriceCard = ({ totalValueLocked, price }) => {
    return (
        <div className={classes.valuePriceCard}>
        
            <div className={classes.subsection}>
                <div className={classes.iconDiv}>
                    <img className={classes.icons} src={tvl} />
                </div>
                <div>
                    <div classes={classes.subsectionTitle}>
                        Total Value Locked
                    </div>
                    <div className={classes.subsectionContent}>
                        {'$' + totalValueLocked}
                    </div>
                </div>
            </div>


            <div className={classes.subsection}>
                <div className={classes.iconDiv}>
                    <img className={classes.icons} src={priceIco} />
                </div>
                <div>
                    <div classes={classes.subsectionTitle}>
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