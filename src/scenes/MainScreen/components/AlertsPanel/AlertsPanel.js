import classes from './AlertsPanel.module.scss'
import Arrow from './image/arrow.svg'

const AlertsPanel = () => {
    return (<div className={classes.AlertsPanel}>
        <div className={classes.gradientDiv}>
            <h1>Get Alerts For New Sales</h1>
            <form className={classes.inputSection}>
                <div className={classes.prepend}>
                    @
                </div>
                <input 
                    className={classes.emailInput} 
                    type="email"
                    placeholder="Enter Your Email"
                />
                    
                <button type="submit" className={classes.submitButton}>
                    Subscribe 
                    <img src={Arrow} className={classes.arrow}/>
                </button>
                    
            </form>
        </div>
    </div>);
}
 
export default AlertsPanel;