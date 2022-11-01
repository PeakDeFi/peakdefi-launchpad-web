import { FaCheck } from 'react-icons/fa';
import classes from './EbookBanner.module.scss';
import EbookCrpyto from './images/EbookCrypto.png'
import { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import zIndex from '@mui/material/styles/zIndex';
import { CircularProgress } from '@mui/material';


const EbookBanner = () => {

    const [showingPopup, setShowingPopup] = useState(false);
    const [addedScript, setAddedScript] = useState();

    useEffect(() => {
        const wrappers = document.getElementsByClassName("grwf2-wrapper");
        if (wrappers.length > 0) {
            wrappers[0].style = 'position: fixed !important; display:' + (showingPopup ? 'block' : 'none') + ';';
        }

    })

    useEffect(() => {

        //potential hazardous point here
        const observer = new MutationObserver((event) => {
            const wrappers = document.getElementsByClassName("grwf2-wrapper wf2-embedded");
            if (wrappers.length > 0) {
                if (!wrappers[0].style.position.includes('fixed')) {
                    wrappers[0].style = 'position: fixed !important; display: block';
                }

            }
        });

        const body = document.querySelector("body");

        const config = {
            attributes: true,
            childList: true,
            subtree: true,
        };
        observer.observe(body, config);
    }, []);

    useEffect(() => {
        const wrappers = document.getElementsByClassName("grwf2-wrapper");
        if (wrappers.length > 0) {
            wrappers[0].style = 'position: fixed !important; display:' + (showingPopup ? 'block' : 'none') + ';';
        }
    }, [showingPopup])

    const activateScript = () => {
        setShowingPopup(true);
        const boxes = document.querySelectorAll('.grwf2-wrapper');
        if (boxes.length > 0) {
            boxes.forEach(box => {
                box.style.display = "block";
                box.style.position = "fixed !important";
            });
        } else {
            const script = document.createElement('script');
            script.async = true;
            script.src = "https://app.getresponse.com/view_webform_v2.js?u=zqt1e&webforms_id=zFhTb";
            script.type = "text/javascript";
            document.body.appendChild(script);


            const wrappers = document.getElementsByClassName("grwf2-wrapper");
            if (wrappers.length > 0) {
                wrappers[0].style = 'position: fixed !important; display:' + (showingPopup ? 'block' : 'none') + ';';
            }

        }

    }

    const handleClickAway = () => {
        setShowingPopup(false);
        //document.body.removeChild(addedScript);

        //removing the popup
        //potential issues as i'm accessing dom directly and removing div with the popup
        const boxes = document.querySelectorAll('.grwf2-wrapper');
        boxes.forEach(box => {
            box.style.display = "none";
        });
    }

    return (<section className={classes.EbookBanner}>
        <div className={classes.gradientDiv}><img src={EbookCrpyto} alt={'Book cover'} />
            <div className={classes.texts}>
                <h1>Free 5 Steps Checklist</h1>
                <div className={classes.checklist}>
                    <div className={classes.checklistItem}>
                        <div className={classes.bullet}>
                            <FaCheck className={classes.checkIcon} />
                        </div>
                        <p>Recognize the best IDO projects in 5 easy steps</p>
                    </div>
                    <div className={classes.checklistItem}>
                        <div className={classes.bullet}>
                            <FaCheck className={classes.checkIcon} />
                        </div>
                        <p>Don't miss 100X opportunities any more</p>
                    </div>
                </div>
                <button onClick={activateScript}>FREE DOWNLOAD</button>
            </div>
        </div>

        <Backdrop
            open={showingPopup}
            onClick={handleClickAway}
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
            <CircularProgress />
        </Backdrop>
    </section>);
}

export default EbookBanner;