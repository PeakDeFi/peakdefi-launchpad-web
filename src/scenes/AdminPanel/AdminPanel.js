import Table from '../MainScreen/components/Table/Table';
import classes from './AdminPanel.module.scss'
import SalesForm from './components/Form/SalesForm';
import { BsChevronDown } from "react-icons/bs";
import { Button } from '@mui/material';
import { useState } from 'react';
import Collapsible from 'react-collapsible';
import UpcomingTable from './components/UpcomingTable/UpcomingTable';
import AuthDialog from './components/AuthDialog/AuthDialog';
import { logout } from './components/AuthDialog/API/adminPanelAuth';
import session from 'redux-persist/lib/storage/session';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {


    const [showDialog, setShowDialog] = useState(sessionStorage.getItem('adminAuth') ? sessionStorage.getItem('adminAuth')==='false' : true);
    const navigate = useNavigate();
    debugger;

    return (<>
        <div className={classes.adminPanel}>

            <header>
                <h1 className={classes.mainText}>ADMIN PANEL</h1>
                <div className={classes.infoButton} onClick={() => {
                    logout();
                    sessionStorage.setItem('adminAuth', false);
                    navigate('/');
                }}>
                    Log out
                </div>
            </header>

            <section>

                <div className={classes.formSection}>
                    <SalesForm />
                </div>

                <div className={classes.tablesSection}>
                    <div className={classes.tableDiv}>
                        <Collapsible
                            trigger={["Completed IDOs", <BsChevronDown />]}
                            triggerClassName={classes.collapsibleHeader}
                            triggerOpenedClassName={classes.collapsibleHeaderisOpen}
                            openedClassName={classes.collapsibleContent}
                        >
                            <Table />
                        </Collapsible>
                    </div>

                    <div className={classes.tableDiv}>
                        <Collapsible
                            trigger={["Upcoming IDOs", <BsChevronDown />]}
                            triggerClassName={classes.collapsibleHeader}
                            triggerOpenedClassName={classes.collapsibleHeaderisOpen}
                            openedClassName={classes.collapsibleContent}
                            
                        >
                            <UpcomingTable />
                        </Collapsible>
                    </div>
                </div>

            </section>

        </div>
        <AuthDialog show={showDialog} setDialog={setShowDialog}/>
    </>);
}

export default AdminPanel;