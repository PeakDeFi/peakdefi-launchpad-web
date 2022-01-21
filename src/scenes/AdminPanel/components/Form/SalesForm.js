import { Controller, useForm } from "react-hook-form";

import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

import classes from './SalesForm.module.scss'
import { useEffect } from 'react';
import TextInput from "./components/TextInput/TextInput";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';



const SalesForm = () => {
    const { handleSubmit, reset, control } = useForm({
        defaultValues: {
            social_media: {url: '', type: 'fb'}
        }
    });
    const onSubmit = (data) => console.log(data);

    return (<>
        <form className={classes.formPanel}>
            <div>
                <h1>
                    Sale information
                </h1>
            </div>
            <div className={classes.formRow}>
                <TextInput
                    label="Project name"
                    name="project_name"
                    control={control}
                    type="text"
                />

                <TextInput
                    label="Symbol"
                    name="symbol"
                    control={control}
                    type="text"
                />
            </div>

            <hr />

            <div className={classes.formRow}>
                <TextInput
                    label="IDO Price"
                    name="ido_price"
                    control={control}
                    type="money"
                />

                <TextInput
                    label="Current price"
                    name="current_price"
                    control={control}
                    type="money"
                />

                <TextInput
                    label="ATH"
                    name="ath"
                    control={control}
                    type="money"
                />

            </div>

            <hr />

            <div className={classes.formRow}>
                <TextInput
                    label="Participants"
                    name="partisipants"
                    control={control}
                    type="number"
                />


                <TextInput
                    label="Total raised"
                    name="total_raised"
                    control={control}
                    type="money"
                />


                <TextInput
                    label="Total tokens sold"
                    name="total_tokens_sold"
                    control={control}
                    type="number"
                />

            </div>

            <hr />

            <div className={classes.formRow}>
                <TextInput
                    label="Sale ends at"
                    name="sale_ends_at"
                    control={control}
                    type="date"
                />

            </div>

            <hr></hr>

            <div className={classes.formRow}>
                
                <TextInput
                    label="Social media"
                    name="social_media"
                    control={control}
                    type="social"
                />

            </div>

            <div>

                <Button onClick={handleSubmit(onSubmit)} variant="contained" style={{marginRight: '1em'}}>
                    SUBMIT
                </Button>

                <Button onClick={() => reset()} variant="outlined">
                    Clear
                </Button>
            </div>


        </form>
    </>);
}

export default SalesForm;