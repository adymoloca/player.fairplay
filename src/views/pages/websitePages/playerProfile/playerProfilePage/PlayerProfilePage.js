import React from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import 'assets/scss/style.scss';

import MainCard from 'ui-component/cards/MainCard';
import CardSecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { Box, Grid, Typography, useMediaQuery } from '@mui/material';
import { ManageAccountsTwoTone } from '@mui/icons-material';

import FieldArena from '../../../../../assets/images/ilustrations/FieldArena.svg'
import userAvatar from '../../../../../assets/images/users/userAvatar.svg'
import Romania from '../../../../../assets/images/ilustrations/romania.svg'
import { playerProfile } from './playerProfileComponent/playerProfileTest';
import PlayerProfileSlider from './playerProfileComponent/playerProfileSlider/PlayerProfileSlider';

// translation
import { useTranslation } from 'react-i18next';

const mobileSx = {
    display: 'flex', flexDirection: 'row', justifyContent:'space-between', px: 4, py: 1
}

const bgGray = { backgroundColor: '#F9F9FC'}

const PlayerProfilePage = () => {

    const theme = useTheme();
	const matchDownMD = useMediaQuery(theme.breakpoints.down("md"));

    const customization = useSelector((state) => state.customization);
    const { t } = useTranslation();

    function displayAge(birthDate) {
        const today = new Date();
        const bornDate = new Date(birthDate);
        let age = today.getFullYear() - bornDate.getFullYear();
        let m = today.getMonth() - bornDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < bornDate.getDate())) {
            age--;
        }
        return age;
    }

    const player = useSelector((state) => state?.playerState?.player);

    return (
        <>
            <MainCard title={t('profilePageTitle')} secondary={<CardSecondaryAction icon={<ManageAccountsTwoTone />} title={t('editProfileTitle')} link={'/edit-player-profile'}/>} 
                contentSX={{p: matchDownMD && 0, m: matchDownMD && 0 }} transparent>
                <Grid container item justifyContent={'center'} alignItems={'center'} flexDirection={'column'} sx={{ backgroundColor: '#f0f0f0', m: 0, p: 0, mt: matchDownMD && 2 }}>
                    
                    {/* **********************| COVER PHOTO |************************ */}
                    
                    <Grid container item xs={12} height={'260px'}>
                        <Box component={'img'} src={player?.coverPicture && player?.coverPicture?.length > 50 ? player?.coverPicture : FieldArena} width={'100%'} height={'260px'} 
                            sx={{ objectFit: 'cover', objectPosition: 'center', borderRadius: `${matchDownMD ? '20px' : 0}` }} />
                    </Grid>

                    {/* **********************| HERO SECTION |************************ */}

                    <Grid container item xs={12} md={11} minHeight={'72vh'} flexDirection={'column'} alignContent={'center'} position={'relative'}>
                        <Grid item container xs={12} minHeight={'150px'} paddingLeft={matchDownMD ? '0':' 50px'} justifyContent={'space-between'} width={'100%'} mt={2} position={matchDownMD ? 'relative' : 'absolute'}
                            top={matchDownMD ? '0' : '-80px'} sx={{ backgroundColor: '#fff', borderRadius: `${customization.borderRadius}px` }} py={2} mb={2}>
                            <Grid item container xs={12} md={6} sx={{ borderRight: ' 1px solid #f0f0f0' }} justifyContent={'space-between'} flexWrap={'wrap'}>
                                <Grid item container xs={6} sm={4} position={'relative'} justifyContent={'center'} >
                                    <Box component='img'
                                        src={Boolean(player?.avatar && player?.avatar !== 'avatar') ? player?.avatar : userAvatar}
                                        alt='player avatar image'
                                        sx={{ width: `${matchDownMD? '110px' : '140px'}`, height: `${matchDownMD? '110px' : '140px'}`, border: `3px solid ${theme.palette.primary.main}`, borderRadius: '50%' ,objectPosition: 'center', objectFit:'cover',
                                        position: `${matchDownMD ? 'relative' : 'absolute'}`, top: `${matchDownMD ? '0' : '-40px'}`
                                        }}
                                    />
                                </Grid>
                                <Grid item container xs={6} sm={7} alignContent={'center'}>
                                    <Grid item container xs={12}>
                                        <Typography variant='body1' width={'100%'} display={'flex'} alignItems={'center'} sx={{ textAlign: 'left', fontSize: '16px', fontWeight: '600' }}>
                                            {`${player?.firstName} ${player?.lastName}`}
                                            <Box component={'img'} width={'24px'} height={'24px'} sx={{ objectFit: 'contain', ml: '10px' }} src={Romania} />
                                        </Typography>
                                    </Grid>
                                    <Grid item container xs={12} height={'18px'}>
                                        <Typography textAlign={'center'} sx={{ fontSize: '14px', pr: '10px' }}>{player?.username}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>

                            {/* **********************| STATISTICS SECTION |************************ */}

                            <Grid item container xs={12} md={6} pl={matchDownMD? 0 : 3} marginTop={matchDownMD && 2} justifyContent={'center'} alignContent={'center'} rowGap={matchDownMD? 0 : 2}>
                                <Grid container item xs={12} md={10} flexDirection={'row'}>
                                    <Grid item xs={12} md={4} sx={ matchDownMD ? [mobileSx, bgGray] : {}}>
                                        <Typography sx={{ fontSize: '14px', mb: '3px' }}>{t('ageLabel')} :</Typography>
                                        <Typography sx={{ fontSize: '14px', }}>{displayAge(player?.birthDate)}</Typography>
                                    </Grid>
                                    <Grid item xs={12} md={4} sx={ matchDownMD ? mobileSx : {}}>
                                        <Typography sx={{ fontSize: '14px', mb: '3px' }}>{t('heightLabel')} :</Typography>
                                        <Typography sx={{ fontSize: '14px', }}>{player?.height}</Typography>
                                    </Grid>
                                    <Grid item xs={12} md={4} sx={ matchDownMD ? [mobileSx, bgGray] : {}}>
                                        <Typography sx={{ fontSize: '14px', mb: '3px' }}>{t('roleLabel')} :</Typography>
                                        <Typography sx={{ fontSize: '14px', }}>{player?.position?.length <1 ? player?.position : player?.position?.join(', ')}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} md={10} flexDirection={'row'}>
                                    <Grid item xs={12} md={4} sx={ matchDownMD ? mobileSx : {}}>
                                        <Typography sx={{ fontSize: '14px', mb: '3px' }}>{t('cityLabel')} :</Typography>
                                        <Typography sx={{ fontSize: '14px', }}>{player?.location?.address?.city}</Typography>
                                    </Grid>
                                    <Grid item xs={12} md={4} sx={ matchDownMD ? [mobileSx, bgGray] : {}}>
                                        <Typography sx={{ fontSize: '14px', mb: '3px' }}>{t('weightLabel')} :</Typography>
                                        <Typography sx={{ fontSize: '14px', }}>{player?.weight}</Typography>
                                    </Grid>
                                    <Grid item xs={12} md={4} sx={ matchDownMD ? mobileSx : {}}>
                                        <Typography sx={{ fontSize: '14px', mb: '3px' }}>{t('footLabel')} :</Typography>
                                        <Typography sx={{ fontSize: '14px', }}>{player?.foot?.length <1 ? player?.foot : player?.foot?.join(', ')}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* *********************PLAYER PROFILE PHOTO SLIDER*********************** */}

                        <Grid item container xs={12} mt={matchDownMD ? '12px' : '120px'} sx={{backgroundColor: '#fff', px:2, borderRadius: `${customization.borderRadius}px`}} minHeight={'40vh'}>

                            <PlayerProfileSlider arr={playerProfile?.slideImge} />

                            <Grid item container xs={12} my={3} sx={{borderTop: '1px solid #f0f0f0', py: 3}} justifyContent={'space-between'}>
                                <Grid item xs={12} md={4}>
                                    <Typography variant='body1' textAlign={'start'}>{t('descriptionLabel')} </Typography>
                                </Grid>
                                <Grid item xs={12} md={7} sx={{ minHeight: '30vh', mt: `${matchDownMD && '20px'}`}}>
                                    <Typography variant='body1' textAlign={'start'}>{player?.playerDescription}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </MainCard>
        </>
    )
}

export default PlayerProfilePage;