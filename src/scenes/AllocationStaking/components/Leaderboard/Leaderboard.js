import classes from './Leaderboard.module.scss'
import StarIcon from './images/StarIcon.svg'

const Leaderboard = () => {
    return (<div className={classes.Leaderboard}>
        <header>
            <img src={StarIcon} />
            <h1>Leaderboard</h1>
        </header>
        <main>
            <div className={classes.table}>
            </div>
        </main>
    </div>);
}

export default Leaderboard;