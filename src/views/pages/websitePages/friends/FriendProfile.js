import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import 'assets/scss/style.scss';

import MainCard from 'ui-component/cards/MainCard';
import CardSecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { Box, CircularProgress, Grid, Typography, useMediaQuery } from '@mui/material';
import { Group } from '@mui/icons-material';

import FieldArena from '../../../../assets/images/ilustrations/FieldArena.svg'
import userAvatar from '../../../../assets/images/users/userAvatar.svg'
import Romania from '../../../../assets/images/ilustrations/romania.svg'
import { playerProfile } from '../playerProfile/playerProfilePage/playerProfileComponent/playerProfileTest';
import PlayerProfileSlider from '../playerProfile/playerProfilePage/playerProfileComponent/playerProfileSlider/PlayerProfileSlider';
import { getProfile } from 'store/actions/friendsActions';
import ErrorPage from 'ui-component/error';

// translation
import { useTranslation } from 'react-i18next';

const mobileSx = {
    display: 'flex', flexDirection: 'row', justifyContent:'space-between', px: 4, py: 1
}

const bgGray = { backgroundColor: '#F9F9FC'}

const FriendProfilePage = () => {

    const theme = useTheme();
	const matchDownMD = useMediaQuery(theme.breakpoints.down("md"));
    const dispatch = useDispatch();
    const customization = useSelector((state) => state.customization);
    const { t } = useTranslation();

    const playerId = useSelector((state) => state?.friendsState?.playerId);
    const friendId = useSelector((state) => state?.utilsState?.utils?.friendId);
    const loading = useSelector((state)=>state?.friendsState?.loading)
    const error = useSelector((state)=>state?.friendsState?.error?.status)

    useEffect(() => {
        dispatch(getProfile(friendId))
    }, [dispatch, friendId])
    
    return (
        <>
            { error && Object.keys(playerId)?.length < 1 ? <ErrorPage error={error} /> : 
                <MainCard title={t('profilePageTitle')} secondary={<CardSecondaryAction icon={<Group />} title={t('allFriendsMenu')} link={'/all-friends'}/>} 
                    contentSX={{p: matchDownMD && 0, m: matchDownMD && 0 }} transparent>
                    { loading === true ? <>
                        <Box width={'100%'} height={'74vh'} display={'flex'} alignItems={'center'} justifyContent={'center'} sx={{ backgroundColor: '#fff'}}><CircularProgress /> </Box>
                    </> : <>
                        <Grid container item justifyContent={'center'} alignItems={'center'} flexDirection={'column'} sx={{ backgroundColor: '#f0f0f0', m: 0, p: 0, mt: matchDownMD && 2 }}>

                            {/* **********************| COVER PHOTO |************************ */}

                            <Grid container item xs={12} height={'260px'}>
                                <Box component={'img'} src={playerId?.coverPicture && playerId?.coverPicture?.length > 50 ? playerId?.coverPicture : FieldArena} width={'100%'} height={'260px'} 
                                    sx={{ objectFit: 'cover', objectPosition: 'center', borderRadius: `${matchDownMD ? '20px' : 0}` }} alt={'friend-cover-photo'}/>
                            </Grid>

                            {/* **********************| HERO SECTION |************************ */}

                            <Grid container item xs={12} md={11} minHeight={'72vh'} flexDirection={'column'} alignContent={'center'} position={'relative'}>
                                <Grid item container xs={12} minHeight={'150px'} paddingLeft={matchDownMD ? '0':' 50px'} justifyContent={'space-between'} width={'100%'} mt={ 2} position={matchDownMD ? 'relative' : 'absolute'} 
                                    top={matchDownMD ? '0' : '-80px'} sx={{ backgroundColor: '#fff', borderRadius: `${customization.borderRadius}px` }} py={2} mb={2}>
                                    <Grid item container xs={12} md={6} sx={{ borderRight: ' 1px solid #f0f0f0' }} justifyContent={'space-between'} flexWrap={'wrap'}>
                                        <Grid item container xs={6} sm={4} position={'relative'} justifyContent={'center'} >
                                            <Box component='img'
                                                src={Boolean(playerId?.avatar && playerId?.avatar !== 'avatar') ? playerId?.avatar : userAvatar}
                                                alt='playerId avatar image'
                                                sx={{ width: `${matchDownMD? '110px' : '140px'}`, height: `${matchDownMD? '110px' : '140px'}`, border: `3px solid ${theme.palette.primary.main}`, borderRadius: '50%' ,objectPosition: 'center', objectFit:'cover',
                                                position: `${matchDownMD ? 'relative' : 'absolute'}`, top: `${matchDownMD ? '0' : '-40px'}`
                                            }}
                                            />
                                        </Grid>
                                        <Grid item container xs={6} sm={7} alignContent={'center'}>
                                            <Typography variant='body1' width={'100%'} display={'flex'} alignItems={'center'} sx={{ textAlign: 'left', fontSize: '16px', fontWeight: '600' }}>
                                                {`${playerId?.firstName} ${playerId?.lastName}`}
                                                <Box component={'img'} width={'24px'} height={'24px'} sx={{ objectFit: 'contain', ml: '10px' }} alt={'country-flag'} src={Romania} />
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                {/* **********************| STATISTICS SECTION |************************ */}

                                    <Grid item container xs={12} md={6} pl={matchDownMD? 0 : 3} marginTop={matchDownMD && 2} justifyContent={'center'} alignContent={'center'} rowGap={matchDownMD? 0 : 2}>
                                        <Grid container item xs={12} md={10} flexDirection={'row'}>
                                            <Grid item xs={12} md={4} sx={ matchDownMD ? {...mobileSx, ...bgGray} : {}}>
                                                <Typography sx={{ fontSize: '14px', mb: '3px' }}>{t('ageLabel')} :</Typography>
                                                <Typography sx={{ fontSize: '14px', }}>{playerId?.age}</Typography>
                                            </Grid>
                                            <Grid item xs={12} md={4} sx={matchDownMD ? mobileSx : {}}>
                                                <Typography sx={{ fontSize: '14px', mb: '3px' }}>{t('heightLabel')} :</Typography>
                                                <Typography sx={{ fontSize: '14px', }}>{playerId?.height}</Typography>
                                            </Grid>
                                            <Grid item xs={12} md={4} sx={matchDownMD ? {...mobileSx, ...bgGray} : {}}>
                                                <Typography sx={{ fontSize: '14px', mb: '3px' }}>{t('roleLabel')} :</Typography>
                                                <Typography sx={{ fontSize: '14px', }}>{playerId?.position?.length <1 ? playerId?.position : playerId?.position?.join(', ')}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container item xs={12} md={10} flexDirection={'row'}>
                                            <Grid item xs={12} md={4} sx={matchDownMD ? mobileSx : {}}>
                                                <Typography sx={{ fontSize: '14px', mb: '3px' }}>{t('cityLabel')} :</Typography>
                                                <Typography sx={{ fontSize: '14px', }}>{playerId?.city}</Typography>
                                            </Grid>
                                            <Grid item xs={12} md={4} sx={matchDownMD ? {...mobileSx, ...bgGray} : {}}>
                                                <Typography sx={{ fontSize: '14px', mb: '3px' }}>{t('weightLabel')} :</Typography>
                                                <Typography sx={{ fontSize: '14px', }}>{playerId?.weight}</Typography>
                                            </Grid>
                                            <Grid item xs={12} md={4} sx={matchDownMD ? mobileSx : {}}>
                                                <Typography sx={{ fontSize: '14px', mb: '3px' }}>{t('footLabel')} :</Typography>
                                                <Typography sx={{ fontSize: '14px', }}>{playerId?.foot?.length <1 ? playerId?.foot : playerId?.foot?.join(', ')}</Typography>
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
                                            <Typography variant='body1' textAlign={'start'}>{playerId?.playerDescription}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </>}
                </MainCard>
            }
        </>
    )
}

export default FriendProfilePage;