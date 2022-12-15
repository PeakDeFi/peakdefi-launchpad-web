import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect } from 'react';

import classes from './DialogBase.module.scss';

const DialogBase = ({ show, setShow, message, icon, buttonText }) => {
    const handleClose = () => {
        setShow(false);
    }
    return (<>
        <Dialog
            open={show}
            onClose={() => handleClose()}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth={true}
            maxWidth={'md'}
        >
            <div className={classes.warningIconDiv}>
                <img src={icon} />
            </div>
            <DialogContent>

               <div className={classes.customErrorMessage} dangerouslySetInnerHTML={{__html: message}}></div>

            </DialogContent>
            <div className={classes.buttonDiv} onClick={() => handleClose()}>
                <button>{buttonText}</button>
            </div>
        </Dialog>
    </>);
}

export default DialogBase;