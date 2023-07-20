import React, { useState } from 'react';
import { Box, Typography, TextField, useMediaQuery } from "@mui/material";
import { Share, GroupAdd, ExitToApp, AccessTime, CalendarMonth } from "@mui/icons-material";
import Modal from "../../../../../ui-component/modal/Modal";
import StyledButton from "ui-component/button/button";
import PropTypes from 'prop-types';
import cover from 'assets/images/ilustrations/cover.png'
import { useDispatch, useSelector } from 'react-redux';
import { deleteMatch, exitMatch } from 'store/actions/matchesActions';
import CustomModal from 'ui-component/modal/CustomModal';
import InviteModal from './matchModalComp/InviteModal';

// translation
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/styles';
import MatchStatisticsMobile from './MatchStatisticsMobile';

const UpcomingMatchHero = (props) => {
    const { data, status } = props;

	const theme = useTheme();
	const matchDownXL = useMediaQuery(theme.breakpoints.down("xl"));
	const matchDownMD = useMediaQuery(theme.breakpoints.down("md"));
	const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

    const userId = useSelector((state)=>state?.playerState?.player?._id)
    const [modalStatus, setModalStatus] = useState({ share: false, addPeople: false, edit: false })
    const modalHandler = (name) => { setModalStatus((prev) => ({ ...prev, [name]: !prev[name] })) }
    const loading = useSelector((state)=> state?.matchesState?.loading)
    const dispatch = useDispatch();
	const { t } = useTranslation();

    const handleExit = (matchId) => {
        dispatch(exitMatch(matchId));
    }

    const handleDelete = (matchId) => {
        dispatch(deleteMatch(matchId));
    }

    const statistics = [
        {
            title: 'spotsLabel',
            value: `${data?.spots?.occupiedSpots}/${data?.spots?.allSpots}`
        },
        {
            title: 'dificultyLabel',
            value: `${data?.matchDifficulty}`
        },
        {
            title: 'teamSizeLabel',
            value: `${data?.teamSize}`
        },
        {
            title: 'teamsNumberLabel',
            value: `${data?.numberOfTeams}`
        },
        {
            title: 'durationLabel',
            value: `${data?.duration}`
        },
    ]
    const buttonBox = {
        border: '1px solid #2B2B2B', height: '34px', width: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '5px'
    }
    return (
        <>
            <Box
                width={"100%"}
                sx={{
                    backgroundImage: `url(${data?.matchField?.fieldCoverPhoto.includes('base64') ? data?.matchField?.fieldCoverPhoto : cover })`,
                    backgroundSize: "cover", backgroundPosition: "center", 
                    height: matchDownSM ? '180px' : (matchDownMD ? '250px' : "400px"), 
                    display: "flex", my:0, py: 0,
					borderRadius: matchDownMD ? '10px' : 0,
                    flexDirection: 'column', justifyContent: 'end'
                }}
            >
               { data && !matchDownMD &&
                    <Box sx={{ display: 'flex', justifyContent: 'end', mb: 2, pr: '100px', gap: 1 }} >
                        { status?.length > 1 &&
                            <CustomModal buttonTitle={t('deleteMatchButton')} modalTitle={t('deleteModalTitle')} 
                            modalContent={<Typography>{t('deleteModalMessage')}</Typography>}
                            handleSubmit={()=>handleDelete(data?._id)} loading={loading}
                            confirmButtonTitle={t('deleteButton')} buttonWidth={'200px'}
                            />
                        }
                        {((status?.length > 1 && status[0] === 2 ) || status?.length < 2) && <>
                                <CustomModal buttonTitle={t('exitMatchButton')} modalTitle={'EXIT MATCH'} 
                                    modalContent={<Typography>{t('cancelRequestMatchMessage')} {data?.duration / 60} {t('cancelRequestAddMessage')}</Typography>}
                                    handleSubmit={()=>handleExit(data?._id)} loading={loading}
                                    confirmButtonTitle={t('exitButton')} buttonWidth={'200px'}
                                    buttonIcon={<ExitToApp />} variant={'contained'}
                                />
                            </>
                        }
                    </Box>
                }
                { !matchDownMD &&
                    <Box sx={{ backgroundColor: "rgba(0, 0, 0, 0.58)", width: "100%", height: "30%", }} >
                        <Box display="flex" flexDirection="row" justifyContent="space-around" height={"100%"} width={"100%"} >

                        {/* ************|  INFORMATION BOX |************** */}

                            <Box display="flex" flexDirection="column" width={matchDownXL ? '40%' : "25%"} gap={"10px"} justifyContent={'center'} >
                                <Typography color={"#fff"} fontSize={"24px"} fontWeight={"500"} noWrap textOverflow={'ellipsis'}>
                                    {data?.matchName}
                                </Typography>
                                <Box
                                    width={"400px"}
                                    height={"20%"}
                                    display="flex"
                                    flexDirection="row"
                                    justifyContent="space-between"
                                >
                                    <Box display="flex" flexDirection="row" justifyContent="space-between" width={"60%"} >
                                        <CalendarMonth style={{ fill: `${theme.palette.secondary.dark}` }} />
                                        <Typography color={`${theme.palette.secondary.dark}`} fontSize={"16px"} fontWeight={"500"} >
                                            {data?.matchDate}
                                        </Typography>
                                        <AccessTime style={{ fill: `${theme.palette.secondary.dark}` }} />
                                        <Typography color={`${theme.palette.secondary.dark}`} fontSize={"16px"} fontWeight={"500"} >
                                            {data?.matchStart}
                                        </Typography>
                                    </Box>
                                    <Box width={"35%"}>
                                        <Typography color={"#fff"} fontSize={"16px"} fontWeight={"500"} >
                                            {data?.privateMatch ? `${t('privateMatch')}` : `${t('publicMatch')}`}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Typography color={"#fff"} fontSize={"16px"} fontWeight={"500"} noWrap textOverflow={'ellipsis'}>
                                    {data?.matchField?.fieldName} - {data?.matchField?.city} {data?.matchField?.street} {data?.matchField?.number}
                                </Typography>
                            </Box>

                            {/* ************|  SHARE AND ACTION BOX |************** */}

                            {data?.playerId === userId ? 
                            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap={1} width={'10%'} sx={{ borderRight: '1px solid #fff', height: '80px', alignSelf: 'center'}}>
                                <Share onClick={() => modalHandler('share')} style={{ fill: "#fff", cursor: "pointer" }} />
                                <GroupAdd onClick={() => modalHandler('addPeople')} style={{ fill: "#fff", cursor: "pointer" }} />
                            </Box> : ''
                            }

                            {/* ************|  STATISTICS BOX |************** */}

                            <Box display="flex" flexWrap={'wrap'} flexDirection="row"  alignItems={'center'} justifyContent={matchDownXL ? 'start' : "space-between"} width={matchDownMD? '30%' : "40%"} >
                                { statistics?.map((el, index) => {
                                    return (
                                        <Box key={`${el?.title}-${index}`} display="flex" flexDirection="column" gap={matchDownXL ? 0 : "10px"} mx={matchDownXL ? '10px' : 0} textAlign="center" >
                                            <Typography color={"#fff"} fontSize={matchDownXL ? '16px' : "20px"} fontWeight={"500"}>
                                                {t(el?.title)}
                                            </Typography>
                                            <Typography color={"#fff"} fontSize={matchDownXL ? '12px' : "16px"} fontWeight={"400"} >
                                                {el?.value}
                                            </Typography>
                                        </Box>
                                    )})
                                }
                            </Box>
                        </Box>
                    </Box>
                }
            </Box>
            
            {/* *********************** MOBILE SECTION |************************** */}

            { matchDownMD &&
                <Box sx={{ width: '100%', backgroundColor: '#fff', mt: 3, borderRadius: '10px', p:1}}>
                    { data &&
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', mb: 2, gap: 1 }} >
                            <Box sx={{ display: 'flex', gap: 2}}>
                            { status?.length > 1 &&
                                <CustomModal buttonTitle={t('deleteMatchButton')} modalTitle={t('deleteModalTitle')} 
                                modalContent={<Typography>{t('deleteModalMessage')}</Typography>}
                                handleSubmit={()=>handleDelete(data?._id)} loading={loading}
                                confirmButtonTitle={t('deleteButton')} buttonWidth={'150px'} variant={'danger'}
                                />
                            }
                            {((status?.length > 1 && status[0] === 2 ) || status?.length < 2) && <>
                                    <CustomModal buttonTitle={t('exitMatchButton')} modalTitle={'EXIT MATCH'} 
                                        modalContent={<Typography>{t('cancelRequestMatchMessage')} {data?.duration / 60} {t('cancelRequestAddMessage')}</Typography>}
                                        handleSubmit={()=>handleExit(data?._id)} loading={loading}
                                        confirmButtonTitle={t('exitButton')} buttonWidth={'200px'}
                                        buttonIcon={<ExitToApp />} 
                                    />
                                </>
                            }
                            </Box>
                            {data?.playerId === userId ? 
                                <Box display='flex' justifyContent="center" alignItems="center" gap={2} sx={{ borderRight: '1px solid #fff'}}>
                                    <Box sx={buttonBox}>
                                        <GroupAdd onClick={() => modalHandler('addPeople')} style={{ cursor: "pointer" }} />
                                    </Box>
                                    <Box sx={buttonBox}>
                                        <Share onClick={() => modalHandler('share')} style={{ cursor: "pointer" }} />
                                    </Box>
                                </Box> : ''
                            }
                        </Box>
                    }
                    <MatchStatisticsMobile matchLocation={`${data?.matchField?.city} ${data?.matchField?.street} ${data?.matchField?.number}`} 
                        matchField={`${data?.matchField?.fieldName}`} matchPrivate={data?.privateMatch} matchHour={`${data?.matchStart}`}
                        matchDate={`${data?.matchDate}`} matchName={`${data?.matchName}`} matchStatistics={statistics}
                    />
                </Box>
            }

            {/* ************|  DINAMIC MODAL COMPONENT |************** */}

            <Modal open={modalStatus.share} setOpen={() => modalHandler('share', !modalStatus.share)}
                title={"Share with friends"}
                content={
                    <>
                        <Box display='flex' flexDirection='column' marginY={"20px"}>
                            <TextField width={"80%"} label={""}></TextField>
                        </Box>
                        <Box display='flex' flexDirection='row' justifyContent='flex-end' marginY={"20px"}>
                            <StyledButton name="copy" label="Copy" width={"40%"} variant='primary' />
                        </Box>
                    </>} />
            <InviteModal open={modalStatus.addPeople} setOpen={() => modalHandler('addPeople', !modalStatus.addPeople)} matchOwner={data?.playerId} />
        </>
    )
}

UpcomingMatchHero.propTypes = {
    data: PropTypes.object,
}

export default UpcomingMatchHero;