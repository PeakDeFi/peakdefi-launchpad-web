import { FaCheck } from 'react-icons/fa';
import classes from './EbookBanner.module.scss';
import EbookCrpyto from './images/EbookCrypto.png'
import { forwardRef,useEffect, useState, useImperativeHandle } from 'react';
import Backdrop from '@mui/material/Backdrop';
import zIndex from '@mui/material/styles/zIndex';
import { CircularProgress } from '@mui/material';

function getWindowSize() {
  const {innerWidth, innerHeight} = window;
  return {innerWidth, innerHeight};
}


const EbookBanner = forwardRef((props, ref) => {

    const [showingPopup, setShowingPopup] = useState(false);
    const [addedScript, setAddedScript] = useState();

    const [windowSize, setWindowSize] = useState(getWindowSize());

    useEffect(() => {
        if (windowSize > 800) {
            const wrappers = document.getElementsByClassName("grwf2-wrapper");
            if (wrappers.length > 0) {
                wrappers[0].style = 'position: fixed !important; display:' + (showingPopup ? 'block' : 'none') + ';';
            }
        }
    })

    useEffect(() => {
        function handleWindowResize() {
        setWindowSize(getWindowSize());
        }

        window.addEventListener('resize', handleWindowResize);


        const observer = new MutationObserver((event) => {
            const wrappers = document.getElementsByClassName("grwf2-wrapper wf2-embedded");
            if (wrappers.length > 0) {
                if (!wrappers[0].style.position.includes('fixed')) {
                    if (windowSize < 800) {
                        wrappers[0].style = 'position: fixed !important; display: flex';
                    } else {
                        wrappers[0].style = `display: flex;
                                            justify-content: center;
                                            position: fixed !important;
                                            top: 5%;
                                            left: -8%;`;
                    }
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

         return () => {
        window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    useEffect(() => {
        const wrappers = document.getElementsByClassName("grwf2-wrapper");
        if (wrappers.length > 0) {
             if (windowSize < 800) {
                    wrappers[0].style = 'position: fixed !important; display:' + (showingPopup ? 'block' : 'none') + ';';
                }
                else {
                        wrappers[0].style = `display: ${showingPopup ? 'flex' : 'none'};
                                            justify-content: center;
                                            position: fixed !important;
                                            top: 5%;
                                            left: -8%;`;
                    }
        }
    }, [showingPopup])

    const activateScript = () => {
        // setShowingPopup(true);
        const boxes = document.getElementById('sendx-modal-fLasrVpAxU7jL2RJuE4PZ6');
        if (false) {
            boxes.forEach(box => {
                box.style.display = "block";
                box.style.position = "fixed !important";
            });
        } else {

            const wrappers = document.getElementById('sendx-modal-fLasrVpAxU7jL2RJuE4PZ6');
            console.log( windowSize)
            if (wrappers) {
                

                if (windowSize.innerWidth < 800) {
                    wrappers.classList = 'animated slideInUp'
                    wrappers.style = 'display: block'
                    wrappers.childNodes[1].childNodes[3].childNodes[3].style = 'display: table !important;padding: 20px !important;display: flex !important;flex-direction: column;'
                    wrappers.childNodes[1].childNodes[3].childNodes[3].childNodes[1].style = 'height: 200px !important; width: 170px !important;background-image: url(https://cdn.sendx.io/prod/upload/img/23/01/04/10/15058/full.jpg) !important; background-position: center !IMPORTANT; background-size: cover !IMPORTANT; display: table-cell !important; align-self: center;'
                    wrappers.childNodes[1].childNodes[3].style = `top: 80px !important; left: 0px !important; display: block !important;`
                }
                else {
                    wrappers.classList = 'animated slideInUp'
                    wrappers.style = 'display: block'
                    // wrappers.style = 'position: fixed !important; display:' + (showingPopup ? 'block' : 'none') + ';';
                    wrappers.childNodes[1].childNodes[3].childNodes[3].style = 'display: table !important;padding: 20px !important;'
                    wrappers.childNodes[1].childNodes[3].childNodes[3].childNodes[1].style = 'height: 200px !important; width: 170px !important;background-image: url(https://cdn.sendx.io/prod/upload/img/23/01/04/10/15058/full.jpg) !important; background-position: center !IMPORTANT; background-size: cover !IMPORTANT; display: table-cell !important;'
               
                    wrappers.childNodes[1].childNodes[3].style = `top: ${(windowSize.innerHeight - 404)/2}px !important; left: ${(windowSize.innerWidth-600)/2}px !important; display: block !important;`
                }
                    
            }

        }

    }

    useImperativeHandle(ref, () => ({

        getAlert() {
            activateScript()
        },
        hideAlert() {
            handleClickAway()
        }


    }));

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
        <div 
            className={[classes.gradientDiv, "sendx-content-upgrade"].join(' ')} 
            onClick={activateScript}
            // data-href="#fLasrVpAxU7jL2RJuE4PZ6" 
        >
            <img src={EbookCrpyto} alt={'Book cover'}/>
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
                <button >FREE DOWNLOAD</button>
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
})

export default EbookBanner;