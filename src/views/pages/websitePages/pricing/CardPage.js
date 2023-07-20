import { ArrowBackIosNewTwoTone, ReportProblem } from '@mui/icons-material';
import { Box, CircularProgress, Grid, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/styles';
import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { getCards } from 'store/actions/paymentActions';
import StyledButton from 'ui-component/button/button';
import CardSecondaryAction from 'ui-component/cards/CardSecondaryAction';
import MainCard from 'ui-component/cards/MainCard';
import CardComp from './pricingComponents/CardComponent';

// translation
import { useTranslation } from 'react-i18next';

const CardPage = () => {

	const theme = useTheme();
	const matchDownXL = useMediaQuery(theme.breakpoints.down("xl"));
	const matchDownMD = useMediaQuery(theme.breakpoints.down("md"));
	const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

	const { t } = useTranslation();
    const cards = useSelector((state) => state?.paymentState?.cards)
    const errorCard = useSelector((state) => state?.paymentState?.error?.status)
    const loading = useSelector((state) => state?.paymentState?.loading)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const productId = useSelector((state)=> state?.utilsState?.utils?.productId)

    useEffect(() => {
        !productId && navigate('/pricing')
    }, [productId, navigate])

    useEffect(() => {
        dispatch(getCards())
    }, [dispatch])

    return (
        <>
            <MainCard title={t('cardsTitle')} secondary={<CardSecondaryAction icon={<ArrowBackIosNewTwoTone />} title={t('pricing')} link={'/pricing'} />} contentSX={{ p: matchDownMD && 0, m: matchDownMD && 0}}>
                <Grid item container xs={12} minHeight={'74vh'} p={ matchDownXL ? '35px 8px' : 5} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                    {cards?.length < 1 ?
                        <Box sx={{ minHeight: '12vh', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2 }} >
                            {loading ? <CircularProgress size={'60px'} /> : <>
                                <ReportProblem fontSize='large' sx={{ color: `${theme.palette.primary.main}`, width: '44px', height: '44px' }} />
                                <Typography fontSize={'22px'} >{errorCard ? `Oops there was an error! Please try again later.` : (cards?.length < 1 && `You don't have any card saved!`)}</Typography>
                            </>}
                        </Box>
                        :
                        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: matchDownSM? 'center' : 'start', justifyContent: 'start', gap: '20px', mb:3 }} >
                            {cards?.map((card, index) => {
                                return (
                                    <Fragment key={card?.cardId?.iv + index}>
                                        <CardComp number={card?.cardNumber} cardName={card?.cardName} expMonth={card?.cardExpMonth} expYear={card?.cardExpYear} cardId={card?.cardId} cardObjectId={card?._id} />
                                    </Fragment>
                                )
                            })}
                        </Box>
                    }
                    <Box sx={{ display: 'flex', justifyContent: matchDownSM ? 'center' : 'start', width: '100%', m: matchDownSM ? 0 : '20px 20px 0 20px', pl: matchDownSM ? 0 : 2, alignItems: 'center' }} >
                        <StyledButton name='add-card' label={t('addCardButton')} disabled={errorCard} handleClick={() => navigate('/checkout')} width={matchDownSM ? '200px' : '300px'} />
                    </Box>
                </Grid>
            </MainCard>
        </>
    )
}

export default CardPage;