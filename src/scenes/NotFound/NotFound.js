import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setShort, setSuperShort } from '../../features/bgSlice';
import classes from './NotFound.module.scss'

const NotFound = () => {

    const dispatch = useDispatch();
    const navigate=useNavigate();

    useEffect(()=>{
        dispatch(setSuperShort(true));

        return ()=>{
            dispatch(setSuperShort(false));
        }
    }, [])

    return (<div className={classes.NotFound}>
        <header>
            <h1 className={classes.c404}>404</h1>
            <h1>Page not found</h1>
            <p>The page you were looking for could not be found. It Might have been removed, renamed or did not exist in the first place.</p>
            <button onClick={()=>navigate('/')} className={classes.goHome}>Go to homepage</button>
        </header>

    </div>);
}
 
export default NotFound;