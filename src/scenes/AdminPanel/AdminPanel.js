import Table from '../MainScreen/components/Table/Table';
import classes from './AdminPanel.module.scss'
import SalesForm from './components/Form/SalesForm';
import { BsChevronDown } from "react-icons/bs";
import { Button } from '@mui/material';
import { useState } from 'react';
import Collapsible from 'react-collapsible';
import UpcomingTable from './components/UpcomingTable/UpcomingTable';

const AdminPanel = () => {

    const [showCompleted, setShowCompleted] = useState(false);
    const [showUpcoming, setShowUpcoming] = useState(false);


    return (<div className={classes.adminPanel}>

        <header>
            <h1 className={classes.mainText}>ADMIN PANEL</h1>
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

    </div>);
}

export default AdminPanel;