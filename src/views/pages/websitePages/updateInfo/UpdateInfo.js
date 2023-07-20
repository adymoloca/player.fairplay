import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import MainCard from 'ui-component/cards/MainCard';
import CardSecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';
import { ArrowBackIosNewTwoTone } from '@mui/icons-material';

import UpdateInfoForm from './UpdateInfoForm';

const UpdateInfo = () => {

    const playerRed = useSelector((state) => state?.playerState?.player);

    const [player, setPlayer] = useState(playerRed);

    return (
        <>
            <MainCard title="Update player ionformation" secondary={<CardSecondaryAction icon={<ArrowBackIosNewTwoTone/>} title={'Back'} link={'/dashboard'} />}>
                <Grid item xs={12} minHeight={'72vh'} >
                    <Grid container spacing={gridSpacing} marginTop={2} justifyContent={'center'}>
                        <UpdateInfoForm values={player} setValues={setPlayer} type={'Edit'} />
                    </Grid>
                </Grid>
            </MainCard>
        </>   
    )
}

export default UpdateInfo;