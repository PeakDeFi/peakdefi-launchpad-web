import {useDispatch, useSelector} from 'react-redux'

import classes from './EbookThankYou.module.scss'
import Deposit from './images/Deposit.svg'
import Register from './images/Register.svg'
import { useEffect } from 'react'
import {setShort} from '../../features/bgSlice';
import { useNavigate } from 'react-router-dom'

const EbookThankYou = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setShort(true))
        return ()=>{
            dispatch(setShort(false));
        };
    }, []);

    const handleDone = ()=> {

        navigate('/');
    }


    return (<div className={classes.EbookThankYou}>
        <img src={Register} className={classes.icon}/>
        <h1>Thank you for downloading our free checklist</h1>

        <button className={classes.doneButton} onClick={handleDone}>Back to homepage</button>

    </div>);
}
 
export default EbookThankYou;