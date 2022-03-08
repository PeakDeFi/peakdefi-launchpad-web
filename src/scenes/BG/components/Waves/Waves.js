import classes from './Waves.module.scss'

const Waves = ({bgimg, isProjectDetails}) => {
    return (<div 
        className={classes.waveContainer} 
        style={{
            background: isProjectDetails ? `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${bgimg})`: ''
        }}
        >
        <svg className={classes.waves} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
            <defs>
                <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
            </defs>
            <g className={classes.parallax}>
                {!isProjectDetails && <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />}
                {!isProjectDetails && <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />}
                {!isProjectDetails && <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />}
                {true && <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" /> }
            </g>
        </svg>
    </div>);
}

export default Waves;