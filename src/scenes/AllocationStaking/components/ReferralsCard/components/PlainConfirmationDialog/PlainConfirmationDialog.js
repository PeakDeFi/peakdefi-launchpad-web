import { useState } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Waves from './images/waves.svg'
import CloseIcon from '@mui/icons-material/Close';

import classes from './PlainConfirmationDialog.module.scss'

const PlainConfirmationDialog = ({ open, setOpen, callback, amount}) => {


    return (<>
        <Dialog
            onClose={() => setOpen(false)}
            open={open}
        >
            <DialogTitle className={classes.dialogTitle}>
                <IconButton onClick={() => setOpen(false)}>
                    <CloseIcon style={{ color: 'black' }} />
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.content}>
                <h1>Request update</h1>
                <p>Warning! Creating an update request has a fixed fee. Keep it in mind before proceeding</p>
        
  
                <h2>Request fee</h2>
                <h3>{amount} PEAK</h3>

                <button className={classes.claimButton} onClick={()=>{
                    callback();
                    setOpen(false);
                }}>Update</button>

            </DialogContent>
            <img src={Waves} className={classes.waves} />

        </Dialog>
    </>);
}

export default PlainConfirmationDialog;