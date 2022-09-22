import { useState } from 'react'
import classes from './AlertsPanel.module.scss'
import { create_subscription } from './API/subscribe';
import Arrow from './image/arrow.svg'

const AlertsPanel = () => {

    const [email, setEmail] = useState('');

    const handleSubscribe = (e)=>{

        //preventing default event due to kol.js script interfering with 
        //this form submit event
        e.preventDefault();
        e.stopPropagation();

        create_subscription(email);

    }

    return (<div className={classes.AlertsPanel}>
        <div className={classes.gradientDiv}>
            <h1>Get Alerts for new Sales</h1>
            <form className={classes.inputSection} onSubmit={handleSubscribe}>
                <div className={classes.prepend}>
                    @
                </div>
                <input 
                    className={classes.emailInput} 
                    type="email"
                    placeholder="Enter Your Email"
                    onChange={(e)=>setEmail(e.target.value)}
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