import { ethers, providers } from 'ethers';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { REFERRAL_ABI as abi } from '../../../../consts/abi';
import { rpcWalletConnectProvider } from '../../../../consts/walletConnect';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import classes from './ReferralsCard.module.scss'

const ReferralsCard = () => {

    const [invitedCount, setInvitedCount] = useState(0);
    const [receiveAmount, setReceiveAmount] = useState(0);
    const walletAddress = useSelector(state => state.userWallet.address);
    const decimals = useSelector(state => state.userWallet.decimal);
    const [contract, setContract] = useState(null);

    useEffect(() => {
        const { ethereum } = window;

        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum)
            const signer = provider.getSigner();
            const tcontract = new ethers.Contract(process.env.REACT_APP_REFERRAL_CONTRACT_ADDRESS, abi, signer);

            setContract({...tcontract});
            tcontract.userInfo(walletAddress).then(data => {
                setInvitedCount(data.numberOfRefferal.toString());
                setReceiveAmount(data.reward / 10 ** decimals);
            }).catch(error => {
                console.log("Error when fetching data about refferals");
            })
        } else if (walletAddress) {

            const web3Provider = new providers.Web3Provider(rpcWalletConnectProvider);
            const signer = web3Provider.getSigner();
            const tcontract = new ethers.Contract(process.env.REACT_APP_REFERRAL_CONTRACT_ADDRESS, abi, signer);

            setContract({...tcontract});
            tcontract.userInfo(walletAddress).then(data => {
                setInvitedCount(data.numberOfRefferal.toString());
                setReceiveAmount(data.reward / 10 ** decimals);
            }).catch(error => {
                console.log("Error when fetching data about refferals");
            })
        }
    }, []);

    const claim = () => {
        contract.claimReward().then(data => {
            const transaction = data.wait();
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

    const createLink = ()=>{
        navigator.clipboard.writeText(window.location.href+"?referrer_wallet_address="+walletAddress); 

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

    return (<div className={classes.ReferralsCard}>
        <header>
            <h1>
                Referrals
            </h1>
        </header>

        <main>
            <div className={classes.infoRow}>
                <div className={classes.infoSubsection}>
                    <h2>Invited</h2>
                    <h1>{invitedCount}</h1>
                </div>

                <div className={classes.infoSubsection}>
                    <h2>You receive</h2>
                    <h1>${receiveAmount}</h1>
                </div>
            </div>
        </main>

        <footer>
            <button onClick={claim}>Claim</button>
            <button className={classes.buttonLight} onClick={createLink}>Create referral link</button>
        </footer>
    </div>);
}

export default ReferralsCard;