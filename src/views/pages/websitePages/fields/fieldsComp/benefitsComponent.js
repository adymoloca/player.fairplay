import { Fastfood, Key, Lightbulb, LocalParking, Shower, Wifi } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { t } from 'i18next';

const all_benefits = [
<Box display="flex" flexDirection="row" gap={"10px"} alignItems={'center'} width={'auto'}>
    <Shower style={{ fill: '#fff' }} />
    <Typography color={"#FFF"} fontSize={"16px"} fontWeight={"500"} >
        {t('showerBenefits')}
    </Typography>
</Box>,
<Box display="flex" flexDirection="row" gap={"10px"} alignItems={'center'} width={'auto'}>
    <Lightbulb style={{ fill: '#fff' }} />
    <Typography color={"#FFF"} fontSize={"16px"} fontWeight={"500"} >
        {t('lightBenefits')}
    </Typography>
</Box>,
    <Box display="flex" flexDirection="row" gap={"10px"} alignItems={'center'} width={'auto'}>
    <Fastfood style={{ fill: '#fff' }} />
    <Typography color={"#FFF"} fontSize={"16px"} fontWeight={"500"} >
        {t('shopBenefits')}
    </Typography>
</Box>,
<Box display="flex" flexDirection="row" gap={"10px"} alignItems={'center'} width={'auto'}>
    <Key style={{ fill: '#fff' }} />
    <Typography color={"#FFF"} fontSize={"16px"} fontWeight={"500"} >
        {t('lockerBenefits')}
    </Typography>
</Box>,
<Box display="flex" flexDirection="row" gap={"10px"} alignItems={'center'} width={'auto'}>
    <LocalParking style={{ fill: '#fff' }} />
    <Typography color={"#FFF"} fontSize={"16px"} fontWeight={"500"} >
        {t('parkingBenefits')}
    </Typography>
</Box>,
<Box display="flex" flexDirection="row" gap={"10px"} alignItems={'center'} width={'auto'}>
    <Wifi style={{ fill: '#fff' }} />
    <Typography color={"#FFF"} fontSize={"16px"} fontWeight={"500"} >
        {t('wiFiBenefits')}
    </Typography>
</Box>]

const BenefitsComponent = () => {

    const benefits = useSelector(state=>state?.fieldsState?.field?.benefits);

    return (<>
        {benefits?.map((el)=> <Fragment key={`benefits-${el}`}>
            {all_benefits[el]}
        </Fragment>)}
    </>)
}

export default BenefitsComponent;