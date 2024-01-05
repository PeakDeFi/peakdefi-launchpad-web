import { useState } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Waves from './images/waves.svg'
import CloseIcon from '@mui/icons-material/Close';

import classes from './ConfirmationDialog.module.scss'
import { Checkbox } from '@mui/material';

const ConfirmationDialog = ({ open, setOpen, callback, amount}) => {

    const [agree, setAgree] = useState(false)

    return (<>
        <Dialog
            onClose={() => setOpen(false)}
            open={open}
            maxWidth="md"
        >
            <DialogTitle className={classes.dialogTitle}>
                <IconButton onClick={() => setOpen(false)}>
                    <CloseIcon style={{ color: 'black' }} />
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.content}>
                <h1>Claim Rewards</h1>
                <p>If you want to claim your rewards and unstake all of your PEAK tokens, you simply have to withdraw all tokens. Please be aware that the cooldown period restarts once you claim your rewards.</p>
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