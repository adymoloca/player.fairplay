import React, { Fragment, useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Grid, useMediaQuery } from '@mui/material';
import CardSecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { ArrowBackIosNewTwoTone, PaymentOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from 'store/actions/paymentActions';
import PaymentCard from 'ui-component/cards/paymentCard/PaymentCard';

// translation
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/styles';

const PricingTables = () => {

	const theme = useTheme();
	const matchDownMD = useMediaQuery(theme.breakpoints.down("md"));

	const { t } = useTranslation();
    const dispatch = useDispatch();
    const products = useSelector((state)=>state?.paymentState?.products)

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])
    

    return (
        <>
            <MainCard title={t('pricing')} secondary={<CardSecondaryAction icon={<ArrowBackIosNewTwoTone/>} title={t('backTooltip')} link={'/'} />} contentSX={{ p: matchDownMD && 0, m: matchDownMD && 0}}>
                <Grid item container gap={matchDownMD ? '30px' : '40px'} xs={12} sx={{ justifyContent: 'center'}}>
                    { products?.map((item)=>{
                        return (
                            <Fragment key={item?._id}>
                                <PaymentCard title={`${item?.gameplayHours} ${item?.gameplayHours > 1 ? t('hours') : t('hour')}`} headingTitle={item?.productName} description={item?.productDescription}
                                price={Number(Math.floor(item?.finalPrice * 100)/100)} discount={`${item?.discount?.discountValue}${item?.discount?.discountType === 0 ? '' : '%'}`} buttonName={t('buyNowButton')} packageId={item?._id}
                                icon={<PaymentOutlined fontSize="large"/>} initialPrice={item?.initialPrice}
                                />
                            </Fragment>
                        )
                    })
                    }
                </Grid>
            </MainCard>
        </>   
    )
}

export default PricingTables;