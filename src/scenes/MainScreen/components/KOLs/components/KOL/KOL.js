import classes from './KOL.module.scss'
import ArrowRight from './../../images/ArrowRight.svg'

const KOL = ({title, subtitle, icon, ctaText, link, mainText}) => {
    return (<div className={classes.KOL}>
        <header>
            <div className={classes.title}>
                <img src = {icon} />
                <div className={classes.titles}>
                    <h1>{title}</h1>
                    <h2>{subtitle}</h2>
                </div>
            </div>

            <div className={classes.cta} onClick={()=>window.open(link, "_blank")}>
                {ctaText}
                <img src={ArrowRight}/>
            </div>
        </header>
        <main>
            <p>{mainText}</p>
        </main>
    </div>);
}
 
export default KOL;