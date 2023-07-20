import React from 'react'
import PropTypes from 'prop-types'
import { Box, Grid, Typography, useMediaQuery } from '@mui/material';

// translation
import { useTranslation } from 'react-i18next';

import CollapseComp from 'ui-component/collapse/CollapseComp';
import fieldCover from 'assets/images/ilustrations/cover.png'

import { useTheme } from '@mui/styles';
import { Groups, Stadium } from '@mui/icons-material';

const mobileSx = {
    display: 'flex', flexDirection: 'row', justifyContent: 'space-between', p: 1
}

const bgGray = { backgroundColor: '#F9F9FC' }

const MatchesMobileCard = (props) => {

    const { matchAddress, matchCategory, numberOfTeams, teamSize, matchSchedule, fieldName, matchName, fieldCoverPhoto, matchSpots, buttonComp } = props;
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

    const { t } = useTranslation();

    const detailsGrid = () => {
        return ( 
            <>
                <Grid item xs={12} md={4} sx={ mobileSx }>
                    <Typography sx={{ fontSize: '14px', mb: '3px', minWidth: '60px'}}>{t('addressLabel')} :</Typography>
                    <Typography noWrap textOverflow={'ellipsis'} sx={{ fontSize: '14px', }}>
                        {matchAddress}
                    </Typography>
                </Grid>
                 <Grid item xs={12} md={4} sx={[mobileSx, bgGray]}>
                    <Typography sx={{ fontSize: '14px', mb: '3px' }}>{t('categoryLabel')} :</Typography>
                    <Typography sx={{ fontSize: '14px', }}>{matchCategory}</Typography>
                </Grid>
                <Grid item xs={12} md={4} sx={ mobileSx } >
                    <Typography sx={{ fontSize: '14px', mb: '3px' }}>{t('teamsLabel')} :</Typography>
                    <Typography sx={{ fontSize: '14px', }}>{numberOfTeams}</Typography>
                </Grid>
                <Grid item xs={12} md={4} sx={[mobileSx, bgGray]}>
                    <Typography sx={{ fontSize: '14px', mb: '3px' }}>{t('teamSizeLabel')} :</Typography>
                    <Typography sx={{ fontSize: '14px', }}>{teamSize} X {teamSize}</Typography>
                </Grid>
                <Grid item xs={12} md={4} sx={ mobileSx }>
                    <Typography sx={{ fontSize: '14px', mb: '3px' }}>{t('durationLabel')} :</Typography>
                    <Typography sx={{ fontSize: '14px', }}>{matchSchedule}</Typography>
                </Grid>
            </> 
        )
    }

    return (
        <Grid item container xs={12} sx={{ height: 'auto', minHeight: '200px', backgroundColor: '#fff', mb: 3, borderRadius: '10px'}}>
            <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', p: '10px 10px 0 20px'}} >
                <Typography sx={{ fontSize: '16px', fontWeight: 600}} noWrap textOverflow={'ellipsis'} > {matchName}</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', height: '30px', gap: 1}} >
                    <Stadium sx={{ color: `${theme.palette.secondary.dark}`}}/>
                    <Typography sx={{ fontSize: '16px', pt: 1}} noWrap textOverflow={'ellipsis'} > {fieldName}</Typography>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column', alignContent: 'center', p: '8px 16px', gap: 1}} >
                <Box sx={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '10px', display: 'flex', alignSelf: 'center',
                     backgroundImage: `url(${fieldCoverPhoto?.length > 20 ? fieldCoverPhoto : fieldCover })`,
                     backgroundSize: "cover", backgroundPosition: "center", alignItems:'end'
                }} >
                    <Box sx={{ width: '100%', height: '30px', display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 1,
                        backgroundColor: 'rgba(55, 174, 15, 0.76)', borderRadius: '0 0 10px 10px', alignItems: 'center'
                    }}>
                        <Groups sx={{ color: '#fff'}} />
                        <Typography sx={{ color: '#fff', fontSize: '13px', fontWeight: 600}}>{matchSpots}</Typography>
                    </Box>
                </Box>
                <Box display={'flex'} width={'100%'} flexDirection={"row"} justifyContent={'center'} gap={1}>
                    {buttonComp}
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} >
                { matchDownSM ? 
                    <CollapseComp  title={t('detailsTooltip')} collapsedContent={detailsGrid()}/>
                :
                    <Grid container item xs={12} md={10} flexDirection={'row'}>
                        {detailsGrid()}
                    </Grid>
                }
            </Grid>
        </Grid>
    )
}

MatchesMobileCard.propTypes = {
    matchData: PropTypes.object,
    buttonComp: PropTypes.object
}

export default MatchesMobileCard;