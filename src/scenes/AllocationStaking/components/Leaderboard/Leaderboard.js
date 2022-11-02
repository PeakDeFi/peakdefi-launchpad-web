import classes from './Leaderboard.module.scss'
import StarIcon from './images/StarIcon.svg'
import Table from '../Table/Table';
import { useEffect, useState } from 'react';
import { getLeaderboardData } from '../../API/staking';

const Leaderboard = () => {

    const columns = [
        { name: 'no', title: '#' },
        { name: 'wallet', title: 'Nickname' },
        { name: 'number_of_rewards', title: 'Number of Rewards' },
        { name: 'number_of_referrals', title: 'Number of Referrals' },
    ]

    const [leaderBoardData, setLeaderboardData] = useState([]);


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
        getLeaderboardData().then((response) => {
            setLeaderboardData(
                response.data.leaders
                    .sort((a, b) => b[3] - a[3])
                    .map(e => {
                        return { no: e[0], wallet: e[1], number_of_referrals: e[2], number_of_rewards: numFormatter(e[3]) }
                    })
            )
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