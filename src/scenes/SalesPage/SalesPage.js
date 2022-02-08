import UpcomingTable from '../AdminPanel/components/UpcomingTable/UpcomingTable';
import Table from './../MainScreen/components/Table/Table'
import classes from './SalesPage.module.scss'

const SalesPage = () => {
    return (<div className={classes.salesPage}>
        <h1 className={classes.pageHeader}>Sales</h1>
        <div>
            <h1 >Upcoming IDOs</h1>
            <Table upcoming={true} />
        </div>
        
        <div>
            <h1 className={classes.upcomingHeader}>Completed IDOs</h1>
            <Table></Table>
        </div>
        
    </div>);
}

export default SalesPage;