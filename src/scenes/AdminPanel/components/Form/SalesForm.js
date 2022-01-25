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
import { createIDO, updateIDO } from "../../API/idos.js";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setSelectedIDO, setToUpdate } from "../../../../features/adminPageSlice";




const SalesForm = () => {

    const selectedIDO = useSelector(state=>state.adminPage.selectedIDO)
    const dispatch = useDispatch();

    const { handleSubmit, reset, control, setValue } = useForm({
        defaultValues: {
            img_url: '',
            //social_media: {url: '', type: 'fb'}
        }
    });

    useEffect(()=>{
        dispatch(setSelectedIDO(null));
    }, []);

    useEffect(()=>{
        if(!selectedIDO)
            return; 
        
        if(!isNaN(selectedIDO.endAt)){
            const endAt = new Date(selectedIDO.endAt*1000);
            setValue('sale_end', endAt.toISOString().split('T')[0]);
        }

        setValue('name', selectedIDO.name);
        setValue('img_url', selectedIDO.img_url);
        setValue('symbol', selectedIDO.symbol);
        setValue('ido_price', selectedIDO.idoPrice);
        setValue('current_price', selectedIDO.currentPrice);
        setValue('ath', selectedIDO.ath);
        setValue('participants', selectedIDO.partisipants);
        setValue('total_raised', selectedIDO.totalRaised);
        setValue('tokens_sold', selectedIDO.totalTokenSold);
    }, [selectedIDO]);


    const onSubmit = (data) => {
        
        if(selectedIDO){
            updateIDO({...data, img_url: 'https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-superJumbo.jpg?quality=75&auto=webp'}, selectedIDO.id).then(()=>dispatch(setToUpdate(true)));
        }else{
            createIDO({...data, img_url: 'https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-superJumbo.jpg?quality=75&auto=webp'}).then(()=>dispatch(setToUpdate(true)));
        }
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
                    {selectedIDO ? 'Update IDO' : 'Create IDO' }
                </Button>

                <Button 
                    onClick={() => {
                        dispatch(setSelectedIDO(null));
                        reset({
                            name: '',
                            img_url: ' ',
                            symbol: '',
                            ido_price: '',
                            current_price: '', 
                            ath: '',
                            participants: '', 
                            total_raised: '',
                            tokens_sold: '',
                            sale_end: ''
                        });
                    }}
                    variant="outlined"
                >
                    Clear
                </Button>
            </div>

        </form>
    </>);
}

export default SalesForm;