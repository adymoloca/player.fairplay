import React from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@mui/material';
import { AccessTime, CalendarMonth, LocationOn, Stadium } from '@mui/icons-material';

// translation
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/styles';

const MatchStatisticsMobile = (props) => {

    const {matchName, matchDate, matchHour, matchField, matchPrivate, matchLocation, matchStatistics} = props;

	const theme = useTheme();
	const { t } = useTranslation();

    return (
        <>
            <Box display="flex" flexDirection="column" width={'100%'} gap={"10px"} justifyContent={'center'} my={'30px'}>
                <Typography fontSize={"18px"} fontWeight={"500"} noWrap textOverflow={'ellipsis'}>
                    {matchName}
                </Typography>
                <Box display="flex" flexDirection="row" gap={1} flexWrap={'wrap'} alignItems={'center'}  >
                    <CalendarMonth style={{ fill: `${theme.palette.secondary.dark}` }} />
                    <Typography color={`${theme.palette.secondary.dark}`} fontSize={"16px"} fontWeight={"500"} mr={1}>
                        {matchDate}
                    </Typography>
                    <AccessTime style={{ fill: `${theme.palette.secondary.dark}` }} />
                    <Typography color={`${theme.palette.secondary.dark}`} fontSize={"16px"} fontWeight={"500"} mr={1}>
                        {matchHour}
                    </Typography>
                    <Typography fontSize={"16px"} fontWeight={"400"} color={'#969696'}>
                        {matchPrivate ? `${t('privateMatch')}` : `${t('publicMatch')}`}
                    </Typography>
                </Box>
                <Box display="flex" flexDirection="row" gap={1} alignItems={'center'}  >
                    <Stadium style={{ fill: `${theme.palette.secondary.dark}` }} />
                    <Typography fontSize={"16px"} fontWeight={"500"} noWrap textOverflow={'ellipsis'} pt={'5px'}>
                        {matchField}
                    </Typography>
                </Box>
                <Box display="flex" flexDirection="row" gap={1} alignItems={'center'}  >
                    <LocationOn style={{ fill: `red` }} />
                    <Typography fontSize={"16px"} fontWeight={"400"}>
                        {matchLocation}
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', my: 1}} >
                { matchStatistics?.map((el, index)=>{
                    return (
                        <Box key={`${el?.title}`} sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', bgcolor: `${ index % 2 === 0 ? '#F9F9FC' : '#fff'}`, p:1}}>
                            <Typography fontSize={'12px'}>{t(el?.title)}</Typography>
                            <Typography fontSize={'14px'}>{el?.value}</Typography>
                        </Box>
                    )
                })}
            </Box>
        </>
    )
}

MatchStatisticsMobile.propTypes = {
    matchName: PropTypes.string,
    matchField: PropTypes.string,
    matchDate: PropTypes.string,
    matchHour: PropTypes.string,
    matchLocation: PropTypes.string,
    matchPrivate: PropTypes.bool,
    matchStatistics: PropTypes.array,
}

export default MatchStatisticsMobile;