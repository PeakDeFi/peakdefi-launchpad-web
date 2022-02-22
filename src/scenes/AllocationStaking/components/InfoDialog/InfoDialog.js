import { forwardRef } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import classes from './InfoDialog.module.scss'

const DialogTransition = forwardRef(function Transition(props, ref) { return <Slide direction="up" ref={ref} {...props} />; });

const InfoDialog = ({ show, setShow}) => {
    return (
        <>
            <Dialog
                className={classes.dialog}
                open={show}
                TransitionComponent={DialogTransition}
            >
                <DialogTitle>
                    <h2 className={classes.dialogTitle}>
                        Allocation Staking
                    </h2>
                </DialogTitle>

                <DialogContent>
                    <p>
                        IDO Allocation Staking on PEAKDEFI Launchpad is similar to traditional farming, with the added benefit of earning both IDO allocation and platform fees, on top of ecosystem rewards.
                    </p>

                    <p>
                        When staking PEAK, your tokens will be rewarded in four ways:
                    </p>

                    <ol>
                        <li>Allocation in IDOs (optional)</li>
                        <li>Ecosystem rewards</li>
                        <li>Deposit Fees</li>
                        <li>Allocation Fees</li>
                    </ol>
                    <p>
                        <b>
                        You can think of this like single-sided staking (no impermanent loss), launchpad allocations and network fees, all rolled into one. Even if you can’t participate in sales, there is still plenty of reason to hold and stake PEAK.
                        </b>
                    </p>
                </DialogContent>

                <DialogActions className={classes.actions}>
                    <button className={classes.closeButton} onClick={()=>setShow(false)}>Close</button>
                </DialogActions>


            </Dialog>
        </>
    );
}

export default InfoDialog;