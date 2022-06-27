import { useState } from 'react';
import classes from './MediaLinks.module.scss'
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const MediaLinks = () => {

    const [mediaLinks, setMediaLinks] = useState([
        {
            icon: "https://peakdefi.com/assets/img/icons/telegram.svg",
            link: "https://t.me/peakdefi_official"
        },

        {
            icon: "https://peakdefi.com/assets/img/icons/discord.svg",
            link: "https://discord.gg/3ENv5QCtcs"
        },

        {
            icon: "https://peakdefi.com/assets/img/icons/twitter.svg",
            link: "https://twitter.com/peakdefi"
        },

        {
            icon: "https://peakdefi.com/assets/img/icons/medium.svg",
            link: "https://medium.com/@PeakDeFi"
        },

        {
            icon: "https://peakdefi.com/assets/img/icons/github.svg",
            link: "https://github.com/peakdefi"
        },

        {
            icon: "https://peakdefi.com/assets/img/icons/defipulse.svg",
            link: "https://defipulse.com/"
        }
    ])

    return (<div className={classes.MediaLinks}>
        <h6>© 2022 PEAK Labs</h6>
        <div className={classes.media}>
            {mediaLinks.map(media =>
                <a key={media.link} href={media.link} target="_blank"><img src={media.icon} /></a>
            )}

            <div className={classes.verticalSeparator}></div>

        </div>
    </div>);
}

export default MediaLinks;