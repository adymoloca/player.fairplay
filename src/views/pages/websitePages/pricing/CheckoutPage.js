import React, { useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Box, Typography } from '@mui/material';
import CardSecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { ArrowBackIosNewTwoTone } from '@mui/icons-material';
import CheckoutForm from './pricingComponents/CheckoutForm';

// translation
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

const PricingTables = () => {
	const { t } = useTranslation();
    const navigate = useNavigate();
    const productId = useSelector((state)=> state?.utilsState?.utils?.productId)

    useEffect(() => {
        !productId && navigate('/pricing')
    }, [productId, navigate])
    
    return (
        <>
            <MainCard title="CHECKOUT" secondary={<CardSecondaryAction icon={<ArrowBackIosNewTwoTone/>} title={t('backTooltip')} link={'/card-page'} />}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '74vh', width: '100%'}}>
                    <CheckoutForm />
                    <Typography sx={{ maxWidth: '850px', mt: '30px'}}> {t('cardDataInfo')}</Typography>
                </Box>
            </MainCard>
        </>   
    )
}

export default PricingTables;