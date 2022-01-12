import TotalPanel from './components/TotalPanel/TotalPanel';
import classes from './TotalSection.module.scss'

const TotalsSection = ({ content }) => {
    return (
        <div className={classes.totalSection}>
            {content.map(info=><TotalPanel info={info} />)}
        </div>
    );
}

export default TotalsSection;