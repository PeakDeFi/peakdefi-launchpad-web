import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect } from 'react';

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
        >
            <DialogTitle>
                <h1>Error</h1>
            </DialogTitle>
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
            <DialogActions>
                <Button onClick={()=>handleClose()} autoFocus>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    </>);
}

export default ErrorDialog;