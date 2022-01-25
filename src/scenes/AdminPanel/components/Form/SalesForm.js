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
import { createIDO } from "../../API/idos.js";




const SalesForm = () => {

    const { handleSubmit, reset, control } = useForm({
        defaultValues: {
            img_url: '',
            //social_media: {url: '', type: 'fb'}
        }
    });
    const onSubmit = (data) => {
        createIDO({...data, img_url: 'https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-superJumbo.jpg?quality=75&auto=webp', sale_end: Date.parse(data.sale_end)/1000});
    };

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
                    name="name"
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
                    name="participants"
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
                    name="tokens_sold"
                    control={control}
                    type="number"
                />

            </div>

            <hr />

            <div className={classes.formRow}>
                <TextInput
                    label="Sale ends at"
                    name="sale_end"
                    control={control}
                    type="date"
                />

            </div>

            <hr></hr>

            {false &&<div className={classes.formRow}>
                
                <TextInput
                    label="Social media"
                    name="social_media"
                    control={control}
                    type="social"
                />

            </div>}

            <div>

                <Button onClick={handleSubmit(onSubmit)} variant="contained" style={{marginRight: '1em'}}>
                    Create IDO
                </Button>

                <Button onClick={() => reset()} variant="outlined">
                    Clear
                </Button>
            </div>


        </form>
    </>);
}

export default SalesForm;