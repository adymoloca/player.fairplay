import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@mui/styles';
import { Box, Typography } from '@mui/material';
import { AccessTime, CalendarMonth, CheckCircleOutline, LocationOn, Stadium } from '@mui/icons-material';
import CustomModal from 'ui-component/modal/CustomModal';
import StyledButton from 'ui-component/button/button';
import { useDispatch } from 'react-redux';
import { acceptInvitation, declineInvitation, getInvitationRequest } from 'store/actions/invitePlayerActions';

// translation
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

const MobileReceivedCard = (props) => {
    const { matchDuration, matchName, matchDate, matchHours, matchAddress, matchField, invitationId, requesterName, requesterAvatar, loading } = props

    const theme = useTheme();

    const dispatch = useDispatch();
    const navigate = useNavigate();
	const { t } = useTranslation();

    const handleAccept = useCallback ((matchInvitationId)=>{
        dispatch(acceptInvitation(matchInvitationId, ()=> navigate('/')))
    }, [dispatch, navigate])

    const handleDecline = useCallback ((matchInvitationId)=>{
        dispatch(declineInvitation(matchInvitationId, ()=> dispatch(getInvitationRequest())))
    }, [dispatch])

    return (
        <Box sx={{ maxWidth: '300px', minHeight: '200px', backgroundColor: '#fff', borderRadius: '10px', display: 'flex', flexDirection: 'column', p: 2, gap: 1}}>
            <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1}} >
                <Box component={'img'} sx={{ width:'60px', height:'60px', objectFit:'cover', objectPosition: 'center', borderRadius: '10px'}} src={requesterAvatar} alt={'requester-photo'}/>
                <Typography sx={{ width: '130px', fontSize:'16px'}}>
                    {requesterName}
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
                    <Typography sx={{ color: `${theme.palette.secondary.dark}`, fontSize: '12px' }} >{matchHours} - {matchDuration} h</Typography>
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
            <Box display={'flex'} flex={'row'} columnGap={2} justifyContent={'center'} mt={2}>
                <CustomModal buttonTitle={t('acceptButton')} modalTitle={t('invitationModalTitle')} 
                        modalContent={<Typography>{matchDuration} {t('joinMessage')}</Typography>}
                        handleSubmit={()=>handleAccept(invitationId)} loading={loading} 
                        confirmButtonTitle={t('confirmButton')} buttonWidth={'60px'} buttonIcon={<CheckCircleOutline />}
                    />
                <StyledButton
                    loading={loading}
                    handleClick={() => handleDecline(invitationId)}
                    variant={'danger'}
                    width={"150px"}
                    label={t('declineButton')}
                    name={"button"}
                />
            </Box>
        </Box>
    )
}

MobileReceivedCard.propTypes = {
    matchDuration: PropTypes.number,
    matchName: PropTypes.string,
    matchHours: PropTypes.string,
    matchDate: PropTypes.string,
    matchAddress: PropTypes.string,
    matchField: PropTypes.string,
    invitationId: PropTypes.string,
    requesterAvatar: PropTypes.string,
    requesterName: PropTypes.string,
    loading: PropTypes.bool,
}

export default MobileReceivedCard;