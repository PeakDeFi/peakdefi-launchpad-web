import {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { getReferrer } from '../../API/staking';
import { ethers, providers } from 'ethers';
import {toast} from 'react-toastify';

import { REFERRAL_ABI as abi } from '../../../../consts/abi';
import { TOKEN_ABI } from '../../../../consts/abi';
import { rpcWalletConnectProvider } from '../../../../consts/walletConnect';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import { Button } from '../../../IdoDetail/components/ControlButton/ControlButton';
import ConfirmationDialog from './components/ConfirmationDialog/ConfirmationDialog';
import PlainConfirmationDialog from './components/PlainConfirmationDialog/PlainConfirmationDialog';
import classes from './ReferralsSection.module.scss';
import CopyIcon from './images/Copy.svg'

const ReferralsSection = () => {
    
    const [invitedCount, setInvitedCount] = useState(0);
    const [receiveAmount, setReceiveAmount] = useState(0);
    const [totalEarned, setTotalEarned] = useState(0);
    const walletAddress = useSelector(state => state.userWallet.address);
    const decimals = useSelector(state => state.userWallet.decimal);
    const [contract, setContract] = useState(null);
    const [timeToUpdate, setTimeToUdpate] =useState(14400);

    const [confirmationDialog, setConfirmationDialog] = useState(false);

    const [requestConfirmationDialog, setRequestConfirmationDialog] = useState(false);

    const [updateRequestFee, setUpdateRequestFee] = useState(0);
    const [allowance, setAllowance] = useState(false);

    const [referrerWalletAddress, setReferrerWalletAddress] = useState("");

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

    useEffect(()=>{
        //setting referral claim amount time update
        //counts down towards closest time that's divisible by 4
        const currentDate = new Date();
        currentDate.setMinutes(0);
        currentDate.setSeconds(0);
        if(currentDate.getHours() % 4 === 0){
            currentDate.setHours(currentDate.getHours() + 4)
            setTimeToUdpate(Math.floor((currentDate.getTime() - Date.now())/1000));
        }else{
            currentDate.setHours(currentDate.getHours()+(4-(currentDate.getHours() % 4)));
            setTimeToUdpate(Math.floor((currentDate.getTime() - Date.now())/1000));
        }
    }, [])

    useEffect(() => {
        const { ethereum } = window;

        getReferrer(walletAddress).then(response => {
            setReferrerWalletAddress(response.data.referrer == "You don't have a referrer" ? "You don't have a referrer yet" : response.data.referrer)
            setInvitedCount(response.data.referrals)
        })

        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum)
            const signer = provider.getSigner();
            const tcontract = new ethers.Contract(process.env.REACT_APP_REFERRAL_CONTRACT_ADDRESS, abi, signer);

            setContract({ ...tcontract });
            tcontract.userInfo(walletAddress).then(data => {
                // setInvitedCount(data.numberOfRefferal.toString());
                setReceiveAmount(data.reward / (10 ** decimals));
                setTotalEarned(data.totalEarned / (10 ** decimals))
            }).catch(error => {

            })

            const tokenContract = new ethers.Contract(process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS, TOKEN_ABI, signer);

            tokenContract.allowance(walletAddress, process.env.REACT_APP_REFERRAL_CONTRACT_ADDRESS).then((response) => {
                setAllowance(response > 0);
            }).catch((erorr) => {

            });


        } else if (walletAddress) {

            const web3Provider = new providers.Web3Provider(rpcWalletConnectProvider);
            const signer = web3Provider.getSigner();
            const tcontract = new ethers.Contract(process.env.REACT_APP_REFERRAL_CONTRACT_ADDRESS, abi, signer);

            setContract({ ...tcontract });
            tcontract.userInfo(walletAddress).then(data => {
                // setInvitedCount(data.numberOfRefferal.toString());
                setReceiveAmount(data.reward / 10 ** decimals);
                setTotalEarned(data.totalEarned / (10 ** decimals))
            }).catch(error => {

            })

            const tokenContract = new ethers.Contract(process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS, TOKEN_ABI, signer);

            tokenContract.allowance(walletAddress, process.env.REACT_APP_REFERRAL_CONTRACT_ADDRESS).then((response) => {
                setAllowance(response > 0);
            }).catch((erorr) => {

            });
        }
    }, [walletAddress, decimals]);

    useEffect(async () => {
        if (requestConfirmationDialog) {
            const test = await contract.updateCommission();
            setUpdateRequestFee((test / (10 ** decimals)).toFixed(4));
        }
    }, [requestConfirmationDialog]);

    function start_and_end(str) {
        if (str.length > 35) {
            return str.substr(0, 20) + '...' + str.substr(str.length - 10, str.length);
        }
        return str;
    }

    const claim = () => {
        const { ethereum } = window;
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner();
        const tcontract = new ethers.Contract(process.env.REACT_APP_REFERRAL_CONTRACT_ADDRESS, abi, signer);
        const gasPrice = provider.getGasPrice()

        const gasLimit = provider.estimateGas(tcontract.claimReward())

        tcontract.claimReward({gasLimit:gasLimit,gasPrice:gasPrice}).then(data => {
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
        navigator.clipboard.writeText(window.location.host + "?referrer_wallet_address=" + walletAddress);

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

    const approve = () => {
        const { ethereum } = window;
        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum)
            const signer = provider.getSigner();
            const tokenContract = new ethers.Contract(process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS, TOKEN_ABI, signer);

            tokenContract.approve(process.env.REACT_APP_REFERRAL_CONTRACT_ADDRESS, ethers.constants.MaxUint256).then(res => {
                let tran = res.wait().then((transaction) => {
                    setAllowance(ethers.constants.MaxUint256);
                });

                toast.promise(
                    tran,
                    {
                        pending: 'Approval pending',
                        success: 'Approval successful',
                        error: 'Approval failed'
                    }
                );
            })
        } else if (walletAddress) {
            const web3Provider = new providers.Web3Provider(rpcWalletConnectProvider);
            const signer = web3Provider.getSigner();
            const tokenContract = new ethers.Contract(process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS, TOKEN_ABI, signer);

            tokenContract.approve(process.env.REACT_APP_REFERRAL_CONTRACT_ADDRESS, ethers.constants.MaxUint256).then(res => {
                let tran = res.wait().then((transaction) => {
                    setAllowance(ethers.constants.MaxUint256);
                });

                toast.promise(
                    tran,
                    {
                        pending: 'Approval pending',
                        success: 'Approval successful',
                        error: 'Approval failed'
                    }
                );
            })
        }
    }

    useEffect(()=>{
        setInterval(()=>{
            setTimeToUdpate((prevState)=>prevState-1);
        }, 1000)
    }, [])

    function secondsToHms(d) {
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);
    
        var hDisplay = (h > 0 ? '0' + h + 'h:' : "");
        var mDisplay =  '0' + m + 'm';
        return hDisplay.slice(-4) + mDisplay.slice(-3); 
    }

    return (<div className={classes.ReferralsSection}>
        <h1>Referrals</h1>
        <div className={classes.referralValues}>
            <div className={classes.valueDiv}>
                <h2>Total Rewards</h2>
                <h1>{numFormatter(totalEarned)} PEAK</h1>
            </div>

            <div className={classes.valueDiv}>
                <h2>Referrals</h2>
                <h1>{invitedCount}</h1>
            </div>

            <div className={classes.valueDiv}>
                <h2>Claim Amount Update in</h2>
                <h1 className={classes.time}>{secondsToHms(timeToUpdate)}</h1>
            </div>

            <div className={classes.valueDiv}>
                <h2>Claim Amount</h2>
                <h1>{numFormatter(receiveAmount)} PEAK</h1>
            </div>
            
            <button className={classes.claimButton} onClick={()=>setConfirmationDialog(true)}>Claim</button>
        </div>

        <div className={classes.separator} />

        <div className={classes.linkInfo}>
            <div className={classes.valueDiv}>
                <h2>Referrer Wallet Address</h2>
                <h1 className={classes.referrerWalletAddress}>{referrerWalletAddress}</h1>
            </div>

            <div className={classes.valueDiv}>
                <h2>Get Referral Link</h2>
                <div className={classes.referralLink}>
                    <div className={classes.link}>{window.location.host + "?referrer_wallet_address=" + walletAddress}</div>
                    <img src={CopyIcon} onClick={createLink} />
                </div>
            </div>
        </div>

        <ConfirmationDialog open={confirmationDialog} setOpen={setConfirmationDialog} callback={claim} amount={receiveAmount} />
    </div>);
}
 
export default ReferralsSection;