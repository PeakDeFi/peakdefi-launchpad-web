import TotalPanel from './components/TotalPanel/TotalPanel';
import classes from './TotalSection.module.scss'

const TotalsSection = ({ content }) => {
    return (
        <div className={classes.totalSection}>
            {content.map((info, index)=><TotalPanel info={info} key={"total_panel"+index} />)}
        </div>
    );
}

export default TotalsSection;