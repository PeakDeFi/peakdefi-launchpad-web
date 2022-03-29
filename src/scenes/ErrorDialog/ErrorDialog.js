import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect } from 'react';
import ErrorIcon from './resources/warning.png'

import classes from './ErrorDialog.module.scss';

const ErrorDialog = ({ show, customMessage, message, setError }) => {
    const handleClose = ()=>{
        setError({
            show: false,
            message: ''
        })
    }
    
    return (<>
        <Dialog
            open={show}
            onClose={()=>handleClose()}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth={true}
            maxWidth={'xs'}

        >
            <div className={classes.warningIconDiv}>
                <img src={ErrorIcon} />
            </div>
            <DialogContent>
                {!!customMessage && <>
                    <p className={classes.customErrorMessage}>
                        {customMessage}
                    </p>
                    <p className={classes.originalMessageHeader}>Original message: </p>
                    <p className={classes.originalMessage}>
                        {message+""}
                    </p>
                </>}

                {!customMessage &&<>
                    <p className={classes.customErrorMessage}>
                        {message}
                    </p>
                </>}
            </DialogContent>
            <div className={classes.buttonDiv} onClick={()=>handleClose()}>
                <button>Dismiss</button>
            </div>
        </Dialog>
    </>);
}

export default ErrorDialog;