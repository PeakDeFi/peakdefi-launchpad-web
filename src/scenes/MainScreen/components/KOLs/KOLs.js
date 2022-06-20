import KOL from './components/KOL/KOL';
import classes from './KOLs.module.scss'

import Instagram from './images/Instagram.svg';
import YouTube from './images/YouTube.svg';

const KOLs = () => {

    const kols = [
        {
            title: 'altcoindaily',
            subtitle: '502k Followers',
            icon: Instagram,
            ctaText: 'Go to Post',
            link: 'https://www.instagram.com/p/Cc0gi4XN-N-/',
            mainText: <>TAKEOFF<br /> AT<br /> PEAKDEFI</>
        },

        {
            title: 'Crypto Grizzly',
            subtitle: '200k Followers',
            icon: YouTube,
            ctaText: 'Go to Video',
            link: 'https://www.youtube.com/watch?v=9AmOloZ_g0I',
            mainText: 'PEAKDEFI is the #1 defi ecosystem to grow your wealth!!'
        },

        {
            title: 'AJC',
            subtitle: '75k Followers',
            icon: YouTube,
            ctaText: 'Go to Video',
            link: 'https://www.youtube.com/watch?v=YRiaB5C1hdE',
            mainText: 'PEAKDEFI is the next big crypto project!'
        }
    ]

    return (<div className={classes.KOLs}>
        <h1>KOLs About Us</h1>
        <div className={classes.KOLsSection}>
            {
                kols.map(kol =>
                    <KOL
                        title={kol.title}
                        subtitle={kol.subtitle}
                        icon={kol.icon}
                        ctaText={kol.ctaText}
                        link={kol.link}
                        mainText={kol.mainText}
                    />
                )
            }
        </div>
    </div>);
}

export default KOLs;