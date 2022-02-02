import UpcomingTable from '../AdminPanel/components/UpcomingTable/UpcomingTable';
import Table from './../MainScreen/components/Table/Table'
import classes from './SalesPage.module.scss'

const SalesPage = () => {
    return (<div className={classes.salesPage}>
        <h1 className={classes.pageHeader}>Sales</h1>
        <div>
            <h1>Completed IDOs</h1>
            <Table></Table>
        </div>
        <div>
            <h1 className={classes.upcomingHeader}>Upcoming IDOs</h1>
            <UpcomingTable />
        </div>
    </div>);
}

export default SalesPage;