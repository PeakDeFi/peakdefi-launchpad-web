import {useEffect} from 'react';
import { Controller } from "react-hook-form";


import TextField from '@mui/material/TextField';
import Box from '@material-ui/core/Box';
import InputAdornment from '@mui/material/InputAdornment';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

import { ErrorMessage } from "@hookform/error-message";


import classes from './TextInput.module.scss'

const createEndAdornment = (onChange, value) => {
    return (
        <InputAdornment position="end">
            <Select disableUnderline value={value.type} variant="standard" onChange={(e) => onChange({ ...value, type: e.target.value })}>

                <MenuItem key="fb" value="fb">
                    <FacebookIcon />
                </MenuItem>

                <MenuItem key="tw" value="tw">
                    <TwitterIcon />
                </MenuItem>

                <MenuItem key="ig" value="ig">
                    <InstagramIcon />
                </MenuItem>

            </Select>
        </InputAdornment>
    );
};



const TextInput = ({ name, control, label, type, value_data, onChangeGlobal, errors, rules }) => {
    
    return (<>

        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { onChange, value, ref}}) => {
        
                return (

                    <Box pr={1}>
                        <TextField
                            fullWidth
                            inputRef={ref}
                            onChange={onChangeGlobal ? onChangeGlobal : type === "social" ? (e) => onChange({ ...value, url: e.target.value }) : type === 'number' || type === 'money' ? (e) => onChange(parseFloat(e.target.value)) : onChange}
                            value={value_data ? value_data : type === "social" ? value.url : value}
                            label={label}
                            type={type === 'money' ? 'number' : type}
                            className={classes.inputField}
                            error={!errors ? false :  !!errors[name]}
                            InputLabelProps={
                                {
                                    shrink: true,
                                }
                            }
                            InputProps={
                                {
                                    endAdornment: type === "social" ? createEndAdornment(onChange, value) : null,
                                    startAdornment: type === "money" ? <InputAdornment position="start">$</InputAdornment> : null
                                }
                            }
                        />

                    </Box>
                )
            }}
        />
    </>);
}

export default TextInput;