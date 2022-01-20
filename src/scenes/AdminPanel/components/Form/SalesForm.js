import { Controller, useForm } from "react-hook-form";

import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

import classes from './SalesForm.module.scss'
import { useEffect } from 'react';
import TextInput from "./components/TextInput/TextInput";


const SalesForm = () => {
    const { handleSubmit, reset, control } = useForm();
    const onSubmit = (data) => console.log(data);

    return (<>
        <form className={classes.formPanel}>
            <div>
                <h1>
                    Sale information
                </h1>
            </div>
            <div>
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

            <div>
                <TextInput
                    label="IDO Price"
                    name="ido_price"
                    control={control}
                    type="number"
                />

                <TextInput
                    label="Current price"
                    name="current_price"
                    control={control}
                    type="number"
                />

                <TextInput
                    label="ATH"
                    name="ath"
                    control={control}
                    type="number"
                />

            </div>

            <div>
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
                    type="number"
                />


                <TextInput
                    label="Total tokens sold"
                    name="total_tokens_sold"
                    control={control}
                    type="number"
                />

            </div>

            <div>
                <TextInput
                    label="Sale ends at"
                    name="sale_ends_at"
                    control={control}
                    type="date"
                />

            </div>

            <div>
                <TextInput
                    label="Social media"
                    name="social_media"
                    control={control}
                    type="text"
                />

            </div>

            <div>

                <Button onClick={handleSubmit(onSubmit)}>
                    SUBMIT
                </Button>
            </div>


        </form>
    </>);
}

export default SalesForm;