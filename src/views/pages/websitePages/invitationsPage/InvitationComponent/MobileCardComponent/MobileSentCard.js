import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@mui/styles';
import { Box, Typography } from '@mui/material';
import { AccessTime, CalendarMonth, LocationOn, Stadium } from '@mui/icons-material';
import StyledButton from 'ui-component/button/button';
import { useDispatch } from 'react-redux';

// translation
import { useTranslation } from 'react-i18next';
import { getSentInvitation, revoqueInvitation } from 'store/actions/invitePlayerActions';

const MobileSentCard = (props) => {
    const { matchTime, matchName, matchDate, matchAddress, matchField, invitationId, receiverName, receiverAvatar, loading } = props

    const theme = useTheme();

    const dispatch = useDispatch();
	const { t } = useTranslation();

    const handleRevoque = useCallback ((matchInvitationId)=>{
        dispatch(revoqueInvitation(matchInvitationId, ()=> dispatch(getSentInvitation())))
    }, [dispatch])

    return (
        <Box sx={{ maxWidth: '300px', minHeight: '200px', backgroundColor: '#fff', borderRadius: '10px', display: 'flex', flexDirection: 'column', p: 2, gap: 1}}>
            <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1}} >
                <Box component={'img'} sx={{ width:'60px', height:'60px', objectFit:'cover', objectPosition: 'center', borderRadius: '10px'}} src={receiverAvatar} alt={'requester-photo'}/>
                <Typography sx={{ width: '130px', fontSize:'16px'}}>
                    {receiverName}
                </Typography>
            </Box>
            <Typography sx={{ fontSize: "16px", pt: 1, maxWidth: '350px', fontWeight: '500' }} >
                {matchName}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px', mt:1 }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'end', gap: '5px' }}>
                    <CalendarMonth sx={{ color: `${theme.palette.secondary.dark}`, fontSize: '20px' }} />
                    <Typography sx={{ color: `${theme.palette.secondary.dark}`, fontSize: '12px' }} >{matchDate}</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'end', gap: '5px' }}>
                    <AccessTime sx={{ color: `${theme.palette.secondary.dark}`, fontSize: '20px' }} />
                    <Typography sx={{ color: `${theme.palette.secondary.dark}`, fontSize: '12px' }} >{matchTime}</Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '5px', alignItems: 'center' }}>
                <Stadium sx={{ color: `${theme.palette.secondary.dark}`, fontSize: '20px' }}/>
                <Typography sx={{ fontSize: "14px", pt: 1, maxWidth: '350px'}} >
                    {matchField}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '5px',  alignItems: 'center' }}>
                <LocationOn sx={{ color: 'red'}}/>
                <Typography sx={{ fontSize: "14px", pt: 1, maxWidth: '350px'}} >
                    {matchAddress}
                </Typography>
            </Box>
            <Box display={'flex'} justifyContent={'center'} mt={2}>
                <StyledButton
                    loading={loading}
                    handleClick={() => handleRevoque(invitationId)}
                    variant={'danger'}
                    width={"230px"}
                    label={t('revokInvitation')}
                    name={"button"}
                />
            </Box>
        </Box>
    )
}

MobileSentCard.propTypes = {
    matchName: PropTypes.string,
    matchTime: PropTypes.string,
    matchDate: PropTypes.string,
    matchAddress: PropTypes.string,
    matchField: PropTypes.string,
    invitationId: PropTypes.string,
    receiverAvatar: PropTypes.string,
    receiverName: PropTypes.string,
    loading: PropTypes.bool,
}

export default MobileSentCard;