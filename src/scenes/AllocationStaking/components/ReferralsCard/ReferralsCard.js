import { ethers, providers } from 'ethers';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { REFERRAL_ABI as abi } from '../../../../consts/abi';
import { rpcWalletConnectProvider } from '../../../../consts/walletConnect';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CopyIcon from './images/Copy.svg'

import classes from './ReferralsCard.module.scss'
import ConfirmationDialog from './components/ConfirmationDialog/ConfirmationDialog';

const ReferralsCard = () => {

    const [invitedCount, setInvitedCount] = useState(0);
    const [receiveAmount, setReceiveAmount] = useState(0);
    const [totalEarned, setTotalEarned] = useState(0);
    const walletAddress = useSelector(state => state.userWallet.address);
    const decimals = useSelector(state => state.userWallet.decimal);
    const [contract, setContract] = useState(null);

    const [confirmationDialog, setConfirmationDialog] = useState(false);

    function numFormatter(num) {
        if (num > 999 && num < 1000000) {
            return (num / 1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million 
        }
        else if (num > 1000000 && num < 10 ** 9) {
            return (num / 1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million 
        }
        else if (num > 10 ** 9) {
            return ((num / (10 ** 9)).toFixed(1) + 'B');
        }
        else if (num < 900) {
            return num.toFixed(2); // if value < 1000, nothing to do
        }
    }

    useEffect(() => {
        const { ethereum } = window;

        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum)
            const signer = provider.getSigner();
            const tcontract = new ethers.Contract(process.env.REACT_APP_REFERRAL_CONTRACT_ADDRESS, abi, signer);

            setContract({ ...tcontract });
            tcontract.userInfo(walletAddress).then(data => {
                setInvitedCount(data.numberOfRefferal.toString());
                setReceiveAmount(data.reward / (10 ** decimals));
                setTotalEarned(data.totalEarned / (10 ** decimals))
            }).catch(error => {

            })
        } else if (walletAddress) {

            const web3Provider = new providers.Web3Provider(rpcWalletConnectProvider);
            const signer = web3Provider.getSigner();
            const tcontract = new ethers.Contract(process.env.REACT_APP_REFERRAL_CONTRACT_ADDRESS, abi, signer);

            setContract({ ...tcontract });
            tcontract.userInfo(walletAddress).then(data => {
                setInvitedCount(data.numberOfRefferal.toString());
                setReceiveAmount(data.reward / 10 ** decimals);
                setTotalEarned(data.totalEarned / (10 ** decimals))
            }).catch(error => {

            })
        }
    }, [walletAddress, decimals]);

    const claim = () => {
        contract.claimReward().then(data => {
            const transaction = data.wait();
            setConfirmationDialog(false);
            toast.promise(
                transaction,
                {
                    pending: 'Transaction pending',
                    success: 'Rewards claimed successfully',
                    error: 'Transaction failed'
                }
            )
        })
    }

    const createLink = () => {
        navigator.clipboard.writeText(window.location.href + "?referrer_wallet_address=" + walletAddress);

        toast.info('Referral link copied to clipboard', {
            icon: ({ theme, type }) => <ContentCopyIcon style={{ color: 'rgb(53, 150, 216)' }} />,
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    const requestUpdate = () => {
        if (walletAddress) {
            contract.requestUpdate().then(response => {
                const transaction = response.wait();
                toast.promise(
                    transaction,
                    {
                        pending: "Update request pending",
                        success: 'Update request completed',
                        error: 'Update request failed'
                    }
                );
            });
        }

    }

    return (<div className={classes.ReferralsCard}>
        <header>
            <h1>
                Referrals
            </h1>

            <div className={classes.requestUpdate} onClick={requestUpdate}>Request update</div>
        </header>

        <main>
            <div className={classes.infoRow}>
                <div className={classes.infoSubsection}>
                    <h2>Claim amount</h2>
                    <h1>{numFormatter(receiveAmount)} PEAK</h1>
                </div>
                <button className={classes.claimButton} onClick={() => setConfirmationDialog(true)}>Claim</button>
            </div>

            <div className={classes.infoRow}>
                <div className={classes.infoSubsection}>
                    <h2>Total rewards</h2>
                    <h1>{numFormatter(totalEarned)} PEAK</h1>
                </div>

                <div className={classes.infoSubsection}>
                    <h2>Referrals</h2>
                    <h1>{invitedCount}</h1>
                </div>
            </div>
        </main>

        <footer>
            <div className={classes.referralLinkSection}>
                <h2>Get Referral Link</h2>
                <div className={classes.referralLink}>
                    <div className={classes.link}>{window.location.href + "?referrer_wallet_address=" + walletAddress}</div>
                    <img src={CopyIcon} onClick={createLink} />
                </div>
            </div>
        </footer>

        <ConfirmationDialog open={confirmationDialog} setOpen={setConfirmationDialog} callback={claim} amount={receiveAmount} />
    </div>);
}

export default ReferralsCard;