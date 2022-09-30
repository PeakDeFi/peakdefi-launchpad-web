import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect } from 'react';
import ErrorIcon from './resources/warning.png'
import { useNavigate } from 'react-router-dom'

import classes from './ErrorDialog.module.scss';

const ErrorDialog = ({ show, customMessage, message, setError }) => {

    const navigate = useNavigate();
    const handleClose = () => {
        setError(false);
    }

    const handleStaking = () => {
        setError(false);
        navigate('/allocation-staking');
    }

    return (<>
        <Dialog
            open={show}
            onClose={() => handleClose()}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth={true}
            maxWidth={'xs'}

        >
            <div className={classes.warningIconDiv}>
                <img src={ErrorIcon} />
            </div>
            <DialogContent>
                {!!customMessage && !!message && <>
                    <p className={classes.customErrorMessage}>
                        {customMessage}
                    </p>
                    {/*original message(removed) */}

                    {/*<p className={classes.originalMessageHeader}>Original message: </p>
                        <p className={classes.originalMessage}>
                        {message + ""}
                    </p>*/}
                </>}

                {/* purely original message(removed) */}
                {!customMessage && false && <>
                    <p className={classes.customErrorMessage}>
                        {message}
                    </p>
                </>}

                {!message &&
                    <p className={classes.customErrorMessage}>
                        {customMessage}
                    </p>
                }
            </DialogContent>
            <div className={classes.buttonDiv} onClick={() => handleStaking()}>
                <button>Go to Staking</button>
            </div>
        </Dialog>
    </>);
}

export default ErrorDialog;