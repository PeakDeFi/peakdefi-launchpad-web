import { Controller, useForm } from "react-hook-form";

import TextField from '@mui/material/TextField';

const TextInput = ({ name, control, label, type }) => {
    return (<>
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => (
                <TextField onChange={onChange} value={value} label={label} type={type}/>
            )}
        />
    </>);
}

export default TextInput;