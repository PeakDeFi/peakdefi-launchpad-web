import { useState } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Waves from './../../images/waves.svg'
import LightWaves from './../../images/light_waves.svg'
import At from './../../images/at.svg';

import CloseIcon from '@mui/icons-material/Close';

import classes from './IDOSubscribeDialog.module.scss'
import { create_subscription } from '../../API/subscribe';

const IDOSubscribeDialog = ({ open, setOpen }) => {

    const [sayThankYou, setSayThankYou] = useState(false);
    const [email, setEmail] = useState('');

    const handleSubscribe = (e) => {
        e.preventDefault();
        e.stopPropagation();
        create_subscription(email).then(response=>{
            setSayThankYou(true);
        });
    }

    return (<>
        <Dialog
            onClose={() => setOpen(false)}
            open={open}
            PaperProps={{
                style: {
                    background: sayThankYou ? "linear-gradient(180deg, #0AA7F5 0%, #3CE7FF 100%)" : 'white'
                },
            }}
        >
            <DialogTitle className={classes.dialogTitle}>

                <IconButton onClick={() => setOpen(false)}>
                    {
                        !sayThankYou &&
                        <CloseIcon style={{ color: 'black' }} />
                    }

                    {
                        sayThankYou &&
                        <CloseIcon style={{ color: 'white' }} />
                    }
                    
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.content}>

                {
                    sayThankYou && <>
                        <h1 className={classes.thankHeader}>Thank you!</h1>
                    </>
                }

                {!sayThankYou && <>
                    <h1>Subscribe to updates</h1>
                    <p>Enter your email below:</p>
                    <form className={classes.inputs} onSubmit={handleSubscribe} id='subformido'>
                        <div className={classes.emailInput}>
                            <img src={At} />
                            <input
                                type="email"
                                placeholder="example@mail.com"
                                onChange={(e)=>setEmail(e.target.value)}
                            />

                        </div>
                        <button type="submit" className={classes.submitButton}>
                            Subscribe
                        </button>
                    </form>
                </>}


            </DialogContent>
            {
                !sayThankYou &&
                <img src={Waves} className={classes.waves} />
            }

            {
                sayThankYou &&
                <img src={LightWaves} className={classes.waves} />
            }

        </Dialog>
    </>);
}

export default IDOSubscribeDialog;