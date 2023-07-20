import React from 'react';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Typography, useMediaQuery } from '@mui/material';
import playerAvatar from '../../assets/images/users/userAvatar.svg'
import { useNavigate } from 'react-router';
import { Schedule } from '@mui/icons-material';

// translation
import { useTranslation } from 'react-i18next';
import { SET_MENU } from 'store/actions';

const PlayerAvatar = () => {

    const navigate = useNavigate();
	const { t } = useTranslation();
    const theme = useTheme();
    const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));

    // Handle left drawer
    const leftDrawerOpened = useSelector((state) => state.customization.opened);
    const dispatch = useDispatch();
    const handleLeftDrawerToggle = () => {
        dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
    };

    const player = useSelector((state) => state?.playerState?.player);

    const avatarHandler = () => {
        navigate('/player-profile');
        matchDownMD && handleLeftDrawerToggle();
    }

    const pricingHandler = () => {
        navigate('/pricing');
        matchDownMD && handleLeftDrawerToggle();
    }

    return (
        <>
        <Box sx={{width: '100%', display: 'flex', flexDirection: 'column', alignItems:'center'}}>
            <Box width={'100%'} height={'100%'} display={'flex'} justifyContent={'center'}>
                <Box 
                    onClick={()=> avatarHandler()}
                    component= 'img' 
                    src={Boolean(player?.avatar && player?.avatar !== 'avatar') ? player?.avatar : playerAvatar} 
                    alt='player avatar image' 
                    sx={{ width: {xs: '100px' ,md: '120px'}, height: {xs: '100px' ,md: '120px'}, border: `3px solid ${theme.palette.primary.main}`, borderRadius: '50%', objectFit: 'cover', objectPosition:'center', cursor: 'pointer'}} 
                />
            </Box>
            <Typography variant='body1' sx={{width: '100%', textAlign: 'center', fontSize: '16px', fontWeight: '600', paddingTop:'15px'}}>
            {`${player?.firstName} ${player?.lastName}`}
            </Typography>
            <Box display={'flex'} sx={{width: '100%', flexDirection: 'row', justifyContent:'start', marginTop: '10px',  background: 'linear-gradient(270deg, #FF9601 0%, #FF5701 100%)',
                height: '26px', borderRadius: '20px'}}
            >
                <Schedule sx={{ color: 'rgba(255, 255, 255, 0.53)', fontSize: '32px', m: '-3px'}}/>
                <Box display={'flex'} alignItems={'center'} gap={'5px'} justifyContent={'center'} width={'100%'} pr={'5px'} >
                    <Typography textAlign={'center'} sx={{fontSize: `${String(player?.gameplayHours)?.length < 3 && Number(player?.gameplayHours) > 100 ? '20px' : '14px'}`, fontWeight: '700', color: '#fff'}}>
                        {String(player?.gameplayHours)?.length < 3 || Number(player?.gameplayHours) > 100 ? String(player?.gameplayHours).split('.')[0] : (Math.round(Number(player?.gameplayHours) * 100) / 100).toFixed(2)}
                    </Typography>
                    <Typography textAlign={'center'} sx={{fontSize: '14px', fontWeight: '700', color: '#fff'}}>{t('hoursOf')}</Typography>
                    <Typography textAlign={'center'} sx={{fontSize: '14px', fontWeight: '700', color: '#fff'}}>{t('playtime')}</Typography>
                </Box>
            </Box>
            <Typography textAlign={'center'} onClick={()=> pricingHandler()}
                sx={{fontSize: '13px', fontWeight: '700', color: '#FF5701', mt:1, cursor:'pointer'}}>
                    {t('seePricing')}
            </Typography>
        </Box>
        </>
    )
}

export default PlayerAvatar;