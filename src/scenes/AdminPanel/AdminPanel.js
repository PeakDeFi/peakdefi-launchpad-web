import classes from './AdminPanel.module.scss'
import SalesForm from './components/Form/SalesForm';

const AdminPanel = () => {
    return (<div className={classes.adminPanel}>
        <header>
            <h1 className={classes.mainText}>ADMIN PANEL</h1>
        </header>
        <SalesForm />
    </div>);
}

export default AdminPanel;