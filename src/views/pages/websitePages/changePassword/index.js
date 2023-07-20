import React from 'react';

import MainCard from 'ui-component/cards/MainCard';
import { Grid } from '@mui/material';
import CardSecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { ArrowBackIosNewTwoTone } from '@mui/icons-material';
import ChangePasswordForm from './ChangePasswordForm';

// translation
import { useTranslation } from 'react-i18next';

const ChangePassword = () => {
	const { t } = useTranslation();

    return(
        <>
        <MainCard title={t('changePasswordMenu')} secondary={<CardSecondaryAction icon={<ArrowBackIosNewTwoTone/>} title={'Dashboard'} link={'/dashboard'} />}>
                <Grid container item xs={12} minHeight={'72vh'} alignContent={'center'} justifyContent={'center'}>
                    <ChangePasswordForm />
                </Grid>
            </MainCard>
        </>
    )
}

export default ChangePassword;