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


    return (<div className={classes.ThankYouPage}>
        <img src={actionData.register ? Register : Deposit} className={classes.icon}/>
        {
            actionData.register &&
            <h1>Thank you for participating in sale {actionData.projectName}</h1>
        }

        {
            actionData.deposit &&
            <h1>Thank you for making a payment of {actionData.amount} BUSD for sale {actionData.projectName}</h1>
        }

        <button className={classes.doneButton} onClick={()=>navigate(-1)}>Done</button>

    </div>);
}
 
export default ThankYouPage;