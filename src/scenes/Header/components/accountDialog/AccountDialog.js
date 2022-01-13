import {useState, useEffect} from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import WalletIcon from './images/WalletIcon.svg'
import TextField from '@mui/material/TextField';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Snackbar from '@mui/material/Snackbar';

import classes from './../accountDialog/AccountDialog.module.scss'

const AccountDialog = ({ show, setShow, address, disconnect }) => {
    const theme = useTheme();
    const [showSnack, setShowSnack] = useState({show: false, message: ''});

    return (
        <>
            <Dialog
                onClose={() => { setShow(false) }}
                open={show}
                className={classes.dialog}
                fullWidth={true}
                maxWidth={'sm'}
            >
                <DialogTitle>
                    <div className={classes.dialogHeader}>
                        <div>
                            Account
                        </div>

                        <CloseIcon className={classes.closeIcon} onClick={() => { setShow(false) }} />
                    </div>
                </DialogTitle>
                <DialogContent>
                    {false && <div className={classes.walletInfo}>
                        <img src={WalletIcon} className={classes.walletIcon} />
                        <div className={classes.infoContainer}>
                            <div>
                                <h4>Balance</h4>
                                <p>{13.69} PEAK</p>
                            </div>

                            <div>
                                <h4>Network </h4>
                                <p>{'Avalance'}</p>
                            </div>

                            <div>
                                <h4>Wallet</h4>
                                <p>{'Metamask'}</p>
                            </div>
                        </div>
                    </div>}

                    <div className={classes.addressField}>
                        <TextField
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth
                            variant="filled"
                            label="Wallet address"
                            defaultValue={address}
                        />
                    </div>

                    <div className={classes.actions}>
                        <div className={classes.element} onClick={() => { navigator.clipboard.writeText(address); setShowSnack({show: true, message: 'Address copied to clipboard'}) }}>
                            <ContentCopyIcon />
                            <div>
                                Copy Address
                            </div>
                        </div>

                        <div className={classes.element} onClick={() => { setShow(false); disconnect(); setShowSnack({show: true, message: 'Wallet successfully disconnected'}) }}>
                            <ExitToAppIcon />
                            <div>
                                Disconnect wallet
                            </div>
                        </div>

                    </div>
                </DialogContent>
            </Dialog>
            <Snackbar
                open={showSnack.show}
                autoHideDuration={4000}
                onClose={()=>{setShowSnack({...showSnack, show: false})}}
                message={showSnack.message}
            />
        </>
    );
}

export default AccountDialog;