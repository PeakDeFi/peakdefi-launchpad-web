import { Dialog } from '@mui/material';
import classes from './ProviderDialog.module.scss';
import MetamaskLogo from './images/metamask_logo.png';
import WalletConnectLogo from './images/walletconnect_logo.png'
import { useWeb3React } from '@web3-react/core';
import { injected, walletconnect } from '../../../connector';

const ProviderDialog = ({show, setShow}) => {
    const { activate, deactivate, account } = useWeb3React();


    return (<>
        <Dialog
            open={show}
            onClose={()=>setShow(false)}
        >
            <div className={classes.ProviderDialog}>
                <button 
                    className={classes.providerButton}
                    onClick={()=>{
                        activate(injected);
                        setShow(false);
                    }}
                >
                    <img className = {classes.inlineLogo} src={MetamaskLogo} />Metamask
                </button>

                <button 
                    className={classes.providerButton}
                    onClick={()=>{
                        activate(walletconnect);
                        setShow(false);
                    }}
                >
                    <img className = {classes.inlineLogo} src={WalletConnectLogo} />WalletConnect
                </button>
            </div>
        </Dialog>
    </>);
}
 
export default ProviderDialog;