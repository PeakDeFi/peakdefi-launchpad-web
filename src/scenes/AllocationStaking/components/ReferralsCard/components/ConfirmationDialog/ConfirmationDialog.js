import { useState } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Waves from './images/waves.svg'
import CloseIcon from '@mui/icons-material/Close';

import classes from './ConfirmationDialog.module.scss'
import { Checkbox } from '@mui/material';

const ConfirmationDialog = ({ open, setOpen, callback, amount, title, text}) => {

    const [agree, setAgree] = useState(false)
    return (<>
        <Dialog
            onClose={() => setOpen(false)}
            open={open}
            maxWidth="lg"
        >
            <DialogTitle className={classes.dialogTitle}>
                <IconButton onClick={() => setOpen(false)}>
                    <CloseIcon style={{ color: 'black' }} />
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.content}>
                <div style={title === "Unstake PEAK and Claim rewards" ? {
                    background: "linear-gradient(180deg,#0aa7f5,#3ce7ff)", borderRadius:'5px', padding:'10px', boxShadow: "0 8px 16px rgba(0,0,0,.1)"
                } : {}}>
                    <h1>{ title }</h1>
                    <p>{ text }</p>
                </div>
                <p>Please check this box in order to agree to proceed. <span><Checkbox checked={agree} onChange={(e)=>setAgree(e.target.checked)}/></span></p>
  
                <h2>Claim Amount</h2>
                <h3>{parseFloat(amount).toFixed(2)} PEAK</h3>

                <button disabled={!agree} className={classes.claimButton} onClick={callback}>Claim</button>

            </DialogContent>
            <img src={Waves} className={classes.waves} />

        </Dialog>
    </>);
}

export default ConfirmationDialog;