import classes from './Leaderboard.module.scss'
import StarIcon from './images/StarIcon.svg'
import Table from '../Table/Table';
import { useEffect, useState } from 'react';
import { getLeaderboardData } from '../../API/staking';

const Leaderboard = () => {

    const columns = [
        { name: 'no', title: '#' },
        { name: 'wallet', title: 'Nickname' },
        { name: 'number_of_referrals', title: 'Number of Referrals' },
        { name: 'number_of_rewards', title: 'Number of Rewards' },
    ]

    const [leaderBoardData, setLeaderboardData] = useState([]);

    useEffect(() => {
        getLeaderboardData().then((response) => {
            setLeaderboardData(response.data.leaders.map(e => {
                return { no: e[0], wallet: e[1], number_of_referrals: e[2], number_of_rewards: e[3] }
            }))
        })
    }, [])


    return (<div className={classes.Leaderboard}>
        {leaderBoardData.length > 0 && <>
            <header>
                <img src={StarIcon} />
                <h1>Leaderboard</h1>
            </header>
            <main>
                <div className={classes.table}>
                    <Table columns={columns} data={leaderBoardData} />
                </div>
            </main>

        </>}


    </div>);
}

export default Leaderboard;