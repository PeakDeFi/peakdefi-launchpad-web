import {useDispatch, useSelector} from 'react-redux'

import classes from './ThankYouPage.module.scss'
import Deposit from './images/Deposit.svg'
import Register from './images/Register.svg'
import { useEffect } from 'react'
import {setShort} from '../../features/bgSlice';
import { useNavigate } from 'react-router-dom'

const ThankYouPage = () => {
    const actionData = useSelector(state=>state.thankYouPage);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        dispatch(setShort(true))
    }, []);

    const handleDone = ()=> {
        dispatch(setShort(false));
        navigate(-1);
    }


    return (<div className={classes.ThankYouPage}>
        <img src={actionData.register ? Register : Deposit} className={classes.icon}/>
        {
            actionData.register &&
            <h1>Thank you! You are now whitelisted for the IDO sale {actionData.projectName}</h1>
        }

        {
            actionData.deposit &&
            <h1>Thank you! You successfully deposited {actionData.amount} BUSD for the {actionData.projectName} IDO.</h1>
        }

        {
            actionData.staking && 
            <h1>Thank you for staking {actionData.amount} PEAK</h1>
        }

        <button className={classes.doneButton} onClick={handleDone}>Done</button>

    </div>);
}
 
export default ThankYouPage;