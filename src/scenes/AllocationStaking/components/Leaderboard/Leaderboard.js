import classes from './Leaderboard.module.scss'
import StarIcon from './images/StarIcon.svg'
import Table from '../Table/Table';

const Leaderboard = () => {

    const columns = [
        {name: 'no', title: '#'},
        {name: 'wallet', title: 'Wallet'},
        {name: 'number_of_referrals',  title: 'Number of Referrals'},
        {name: 'number_of_rewards', title: 'Number of Rewards'},
    ]

    const data = [
        {no: 1, wallet: '0x000045345', number_of_referrals: 12, number_of_rewards: 2000},
        {no: 2, wallet: '0x000045345', number_of_referrals: 12, number_of_rewards: 2000},
        {no: 3, wallet: '0x000045345', number_of_referrals: 12, number_of_rewards: 2000},
        {no: 4, wallet: '0x000045345', number_of_referrals: 12, number_of_rewards: 2000},
        {no: 5, wallet: '0x000045345', number_of_referrals: 12, number_of_rewards: 2000},
        {no: 6, wallet: '0x000045345', number_of_referrals: 12, number_of_rewards: 2000},
        {no: 7, wallet: '0x000045345', number_of_referrals: 12, number_of_rewards: 2000},
        {no: 8, wallet: '0x000045345', number_of_referrals: 12, number_of_rewards: 2000},
        {no: 9, wallet: '0x000045345', number_of_referrals: 12, number_of_rewards: 2000},
        {no: 10, wallet: '0x000045345', number_of_referrals: 12, number_of_rewards: 2000},
        {no: 11, wallet: '0x000045345', number_of_referrals: 12, number_of_rewards: 2000},
        {no: 12, wallet: '0x000045345', number_of_referrals: 12, number_of_rewards: 2000},
        {no: 13, wallet: '0x000045345', number_of_referrals: 12, number_of_rewards: 2000},
        {no: 14, wallet: '0x000045345', number_of_referrals: 12, number_of_rewards: 2000},
        {no: 15, wallet: '0x000045345', number_of_referrals: 12, number_of_rewards: 2000},
        {no: 16, wallet: '0x000045345', number_of_referrals: 12, number_of_rewards: 2000},
        {no: 17, wallet: '0x000045345', number_of_referrals: 12, number_of_rewards: 2000},
        {no: 18, wallet: '0x000045345', number_of_referrals: 12, number_of_rewards: 2000},
        {no: 19, wallet: '0x000045345', number_of_referrals: 12, number_of_rewards: 2000},
        {no: 20, wallet: '0x000045345', number_of_referrals: 12, number_of_rewards: 2000},
        {no: 21, wallet: '0x000045345', number_of_referrals: 12, number_of_rewards: 2000},
        {no: 22, wallet: '0x000045345', number_of_referrals: 12, number_of_rewards: 2000},
        {no: 23, wallet: '0x000045345', number_of_referrals: 12, number_of_rewards: 2000},
        {no: 24, wallet: '0x000045345', number_of_referrals: 12, number_of_rewards: 2000},
        {no: 25, wallet: '0x000045345', number_of_referrals: 12, number_of_rewards: 2000},
        {no: 26, wallet: '0x000045345', number_of_referrals: 12, number_of_rewards: 2000},
        {no: 27, wallet: '0x000045345', number_of_referrals: 12, number_of_rewards: 2000},
        {no: 1, wallet: '0x000045345', number_of_referrals: 12, number_of_rewards: 2000},
        {no: 1, wallet: '0x000045345', number_of_referrals: 12, number_of_rewards: 2000},
        {no: 1, wallet: '0x000045345', number_of_referrals: 12, number_of_rewards: 2000},
        {no: 1, wallet: '0x000045345', number_of_referrals: 12, number_of_rewards: 2000},
        {no: 1, wallet: '0x000045345', number_of_referrals: 12, number_of_rewards: 2000},
        {no: 1, wallet: '0x000045345', number_of_referrals: 12, number_of_rewards: 2000}
    ]

    return (<div className={classes.Leaderboard}>
        <header>
            <img src={StarIcon} />
            <h1>Leaderboard</h1>
        </header>
        <main>
            <div className={classes.table}>
                <Table columns={columns} data={data}/>
            </div>
        </main>
    </div>);
}

export default Leaderboard;