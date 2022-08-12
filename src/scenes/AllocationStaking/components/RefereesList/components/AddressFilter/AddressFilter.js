import { useState } from "react";
import classes from './AddressFilter.module.scss';
import { CgClose } from 'react-icons/cg'



const AddressFilter = ({ filterAddresses, setFilterAddresses }) => {

    const [inputValue, setInputValue] = useState('');

    const enterKeypressHandler = (e) => {
        if (e.key === "Enter") {
            setFilterAddresses([...filterAddresses, inputValue])
            setInputValue('');
        }
    }

    const handleSingleItemDelete = (index) => {
        setFilterAddresses([...filterAddresses.slice(0, index), ...filterAddresses.slice(index+1)])
    }

    return (<div className={classes.AddressFilter}>
        <input
            placeholder="Type the Address and press Enter"
            type="text"
            onKeyDown={enterKeypressHandler}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
        />
        <div className={classes.enteredAddresses}>
            {filterAddresses.map((e, index) =>
                <div className={classes.enteredAddress}>
                    {e}
                    <CgClose
                        className={classes.icon}
                        onClick={() => handleSingleItemDelete(index)}
                    />
                </div>
            )}
        </div>
    </div>);
}

export default AddressFilter;