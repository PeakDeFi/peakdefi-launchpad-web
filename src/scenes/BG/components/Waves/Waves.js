import classes from './Waves.module.scss'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Waves = ({bgimg, isProjectDetails}) => {
    
    const location = useLocation();
    const [heightStyle, setHeightStyle] = useState({height: '20vh', marginTop: '55vh'})
    const isShort = useSelector(state=>state.bg.short);
    const isSuperShort = useSelector(state=>state.bg.superShort);

    useEffect(()=>{
        
        if(isShort){
            setHeightStyle({height: '10vh', marginTop: '25vh'})
        }
        else if(isSuperShort){
            setHeightStyle({height: '2vh', marginTop: '15vh'})
        }
        else{
            setHeightStyle({height: '20vh', marginTop: '55vh'});
        }
    }, [isShort, isSuperShort])
    
    return (<div 
        className={classes.waveContainer} 
        style={{
            background: isProjectDetails ? `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${bgimg})`: '',
            backgroundSize: 'cover',
            backgroundPosition: '50% 50%',

        }}
        >
        <svg className={classes.waves} style={heightStyle} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto"
            ref={(node) => {
                if (node) {
                    if(isShort)
                        node.style.setProperty("margin-top", "35vh", "important");
                    if(isSuperShort){
                        if(window.innerWidth<1000)
                            node.style.setProperty("margin-top", "9vh", "important");
                        else
                            node.style.setProperty("margin-top", "15vh", "important");
                    }
                }
              }}
        >
            <defs>
                <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                <path id="uneven-wave" d="M0,288L48,288C96,288,192,288,288,282.7C384,277,480,267,576,240C672,213,768,171,864,176C960,181,1056,235,1152,250.7C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
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