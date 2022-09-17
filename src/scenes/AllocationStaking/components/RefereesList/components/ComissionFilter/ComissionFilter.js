import classes from './ComissionFilter.module.scss';


const ComissionFilter = (props) => {
    const options = [
        { value: 1, label: '1%' },
        { value: 2.5, label: '2.5%' },
        { value: 3, label: '3%' },
        { value: 4, label: '4%' },
        { value: 5, label: '5%' },
        { value: 7.5, label: '7.5%' },
        { value: 10, label: '10%' },
        { value: 15, label: '15%' },
        { value: 25, label: '25%' },
    ];

    return (<div className={classes.ComissionFilter}>
        <select value={props.comissionFrom} onChange={(e) => props.setComissionFrom(parseFloat(e.target.value))}>
            {options.map((option) => {
                return <option value={option.value} disabled={option.value > props.comissionTo}>{option.label}</option>
            })}
        </select>
        <div className={classes.hyphen}>-</div>
        <select value={props.comissionTo} onChange={(e) => props.setComissionTo(parseFloat(e.target.value))}>
            {options.map((option) => {
                return <option value={option.value} disabled={option.value < props.comissionFrom}>{option.label}</option>
            })}
        </select>
    </div>);
}

export default ComissionFilter;