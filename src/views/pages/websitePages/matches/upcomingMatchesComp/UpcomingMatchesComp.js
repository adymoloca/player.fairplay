import { AccessTime, CalendarMonth, LocationOn } from '@mui/icons-material';
import { Avatar, Box, CircularProgress,  Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/styles';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { getUpcomingMatches } from 'store/actions/matchesActions';
import { setMatchId } from 'store/types/utilsTypes';
import StyledButton from 'ui-component/button/button';
import MapComp from 'ui-component/mapComponent';
import PositionComp from 'ui-component/positionComp/PositionComp';

// translation
import { useTranslation } from 'react-i18next';

const UpcomingMatchesComp = (props) => {
    const theme = useTheme();
	const matchDownXL = useMediaQuery(theme.breakpoints.down("xl"));
	const matchDownMD = useMediaQuery(theme.breakpoints.down("md"));
	const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

    const customization = useSelector((state) => state.customization);
    const dispatch = useDispatch();
	const { t } = useTranslation();
    const navigate = useNavigate();

    const { upcomingMatches } = props;
    const loading = useSelector((state) => state?.matchesState?.loadingUpcoming);

    const handleDetails = (matchId) => {
        dispatch(setMatchId(matchId));
        navigate('/upcoming-match')
    }

    useEffect(() => {
        dispatch(getUpcomingMatches());
    }, [dispatch])

    return (
        <>
            <Box
                display={loading? 'none' : "flex"}
                style={{ gap: 20, paddingLeft: '10px 0px', flexDirection:'column' }}
            > {loading === true ? <> {<Box sx={{
                backgroundColor: '#fff', borderRadius: `${customization.borderRadius}px`,
                display: "flex", alignItems: 'center', justifyContent: 'center', p: 3,
                width: '100%', height: '300px'
            }}><CircularProgress /></Box>} </> : <>
                {upcomingMatches?.length > 0 &&
                    (upcomingMatches?.map((item, index) => {
                        const allPlayers = [];
                        for (let i = 0; i < item?.match?.teams?.length; i++) {
                            allPlayers.push(...item?.match?.teams[i]?.players);
                        }
                        return (
                            <Box
                                key={index}
                                sx={{
                                    display: "flex",
                                    p: 3,
                                    flexDirection: "row",
                                    justifyContent: 'space-between',
                                    borderRadius: `${customization.borderRadius}px`,
                                    border: "1px solid",
                                    width: "100%",
                                    minWidth: '00px',
                                    height: `${matchDownSM ? 'auto' : (matchDownMD ? '220px' : '300px')}`,
                                    backgroundColor: "#fff",
                                    borderColor: (theme) =>
                                        theme.palette.mode === "dark" ? "grey.800" : "grey.300",
                                }}
                            >
                                <Box
                                    display={"flex"}
                                    width={matchDownXL ? '100%' : '70%'}
                                    height={'100%'}
                                    flexDirection={matchDownSM ? 'column' : 'row'}
                                    justifyContent={"space-between"}
                                    alignItems={'center'}
                                >
                                    <Box
                                        display={"flex"}
                                        width={matchDownSM ? '90%' : '35%'}
                                        height={matchDownMD ? '160px' : '230px'}
                                        component={'img'}
                                        sx={{ objectFit: 'cover', objectPosition: 'center', borderRadius: '12px', ml: `${matchDownMD ? '0px' : '15px'}` }}
                                        src={item?.match?.matchField?.fieldCoverPhoto}
                                        alt={'field cover img'}
                                    />
                                    <Box
                                        display={"flex"}
                                        width={matchDownSM ? '90%' : (matchDownMD ? '60%' : '40%')}
                                        height={'100%'}
                                        flexDirection={"column"}
                                    >
                                       { !matchDownSM &&
                                            <Typography
                                                sx={{
                                                    fontSize: "18px",
                                                    fontWeight: "700",
                                                    color: "#37AE0F",
                                                    mt: `${matchDownMD? 0 : `20px`}`
                                                }}
                                            >
                                                {t('upcomingMatch')}
                                            </Typography>
                                        }
                                        <Typography sx={{ fontSize: "14px", color: '#000', pt: 1, maxWidth: '350px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} >
                                            {item?.match?.matchName}
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px', width: '100%'}}>
                                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'end', gap: '5px' }}>
                                                <CalendarMonth sx={{ color: `${theme.palette.secondary.dark}`, fontSize: '20px' }} />
                                                <Typography sx={{ color: `${theme.palette.secondary.dark}`, fontSize: '12px' }} >{item?.match?.matchDate}</Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'end', gap: '5px' }}>
                                                <AccessTime sx={{ color: `${theme.palette.secondary.dark}`, fontSize: '20px' }} />
                                                <Typography sx={{ color: `${theme.palette.secondary.dark}`, fontSize: '12px' }} >{item?.match?.matchStart}</Typography>
                                            </Box>
                                            <Typography sx={{ color: `#000`, fontSize: '12px', display: 'flex', alignItems: 'end' }} >{item?.match?.privateMatch ? `${t('privateMatch')}` : `${t('publicMatch')}`}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '5px', width: '100%', height: '30px', alignItems: 'end' }}>
                                            <LocationOn />
                                            <Typography sx={{ fontSize: "14px", pt: 1, maxWidth: '350px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: '#000' }} >
                                                {item?.match?.matchField?.fieldName} {'-'} {item?.match?.matchField?.city} {' '} {item?.match?.matchField?.street} {' '} {item?.match?.matchField?.number}
                                            </Typography>
                                        </Box>
                                        { !matchDownMD ?
                                            <Box sx={{ display: 'flex', width: '100%', height: '120px', alignItems: 'end' }}>
                                                <MapComp mapWidth='100%' mapHeight='100px' fieldLat={item?.match?.matchField?.lat} fieldLng={item?.match?.matchField?.lng} />
                                            </Box>
                                        :
                                            <Box sx={{ display: 'flex', alignItems: 'end', mt: 2 }}>
                                                <StyledButton name="details" label={t('detailsButton')} width={"100%"} handleClick={() => handleDetails(item?.match?._id)} />
                                            </Box>
                                        }
                                    </Box>
                                    { !matchDownMD &&
                                        <Box
                                            display={"flex"}
                                            width={"15%"}
                                            height={'100%'}
                                            flexDirection={"column"}
                                            justifyContent={"space-between"}
                                        >
                                            <Box sx={{ display: 'flex', width: '100%', flexWrap: 'wrap', justifyContent: 'space-between', mt: 4 }}>
                                                <Box sx={{ width: '45%', p: 1 }}>
                                                    <Typography sx={{ color: '#000', fontSize: '12px' }} >{t('spotsLabel')}</Typography>
                                                    <Typography sx={{ color: '#000', fontSize: '12px' }} >{item?.match?.spots?.occupiedSpots} / {item?.match?.spots?.allSpots}</Typography>
                                                </Box>
                                                <Box sx={{ width: '45%', p: 1 }}>
                                                    <Typography sx={{ color: '#000', fontSize: '12px' }} >{t('dificultyLabel')}</Typography>
                                                    <Typography sx={{ color: '#000', fontSize: '12px' }} >{item?.match?.matchDifficulty}</Typography>
                                                </Box>
                                                <Box sx={{ width: '45%', p: 1 }}>
                                                    <Typography sx={{ color: '#000', fontSize: '12px' }} >{t('teamSizeLabel')}</Typography>
                                                    <Typography sx={{ color: '#000', fontSize: '12px' }} >{item?.match?.teamSize} x {item?.match?.teamSize}</Typography>
                                                </Box>
                                                <Box sx={{ width: '45%', p: 1 }}>
                                                    <Typography sx={{ color: '#000', fontSize: '12px' }} >{t('teamsLabel')}</Typography>
                                                    <Typography sx={{ color: '#000', fontSize: '12px' }} >{item?.match?.numberOfTeams}</Typography>
                                                </Box>
                                                <Box sx={{ width: '45%', p: 1 }}>
                                                    <Typography sx={{ color: '#000', fontSize: '12px' }} >{t('durationLabel')}</Typography>
                                                    <Typography sx={{ color: '#000', fontSize: '12px' }} >{Number(item?.match?.duration) / 60} h</Typography>
                                                </Box>
                                            </Box>
                                            <Box sx={{ width: '100%', my: 1 }}>
                                                <StyledButton name="details" label={t('detailsButton')} width={"100%"} handleClick={() => handleDetails(item?.match?._id)} />
                                            </Box>
                                        </Box>
                                    }
                                </Box>
                                { !matchDownXL &&
                                    <Box
                                        display={"flex"}
                                        width={"25%"}
                                        height={'100%'}
                                        flexDirection={"column"}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: "18px",
                                                fontWeight: "700",
                                                color: "#37AE0F",
                                                my: 2
                                            }}
                                        >
                                            {t('playersLabel')}
                                        </Typography>
                                        <Box sx={{ width: '100%', height: '80%', overflowY: 'scroll', overflowX: 'hidden' }}>
                                            {allPlayers?.map((player, index) => {
                                                return (
                                                    <Box key={`player-of-each-team${index}`} sx={{
                                                        display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', p: 1,
                                                        backgroundColor: `${index % 2 === 0 ? '#FAFAFA' : '#fff'}`
                                                    }}>
                                                        <Box sx={{ display: 'flex', flexDirection: 'row', width: '50%', alignItems: 'center', gap: 2 }} >
                                                            <Avatar src={`${player?.playerAvatar}`} alt={'player-avatar'}/>
                                                            <Typography>
                                                                {player?.playerName}
                                                            </Typography>
                                                        </Box>
                                                        <Box sx={{ display: 'flex', justifyContent: 'end', width: '50%' }} >
                                                            <PositionComp positions={player?.playerPosition} contentTo={'end'} />
                                                        </Box>
                                                    </Box>
                                                )
                                            })
                                            }
                                        </Box>
                                    </Box>
                                }
                            </Box>

                        )
                    }))}</>}
            </Box>
        </>
    )
}

export default UpcomingMatchesComp;