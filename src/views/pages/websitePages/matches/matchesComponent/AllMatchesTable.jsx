import React, { useState, useEffect, useCallback, Fragment } from "react";
import StyledTable from 'ui-component/table/StyledTable';
import { Box, Button, CircularProgress, Tooltip, Typography, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { cancelJoin, deleteMatch, exitMatch, getMatches, getNearMatches, updateMatch } from "store/actions/matchesActions";
import { setMatchId } from 'store/types/utilsTypes';
import { Groups, Info } from "@mui/icons-material";
import CustomModal from "ui-component/modal/CustomModal";

// translation
import { useTranslation } from 'react-i18next';
import { useTheme } from "@mui/styles";
import MatchesMobileCard from "./MatchesMobileCard";
import ErrorPage from "ui-component/error";

const tableColumns = [
    {
        key: 'timeDate',
        label: 'timeDateLabel',
        width: '200px',
        align: 'left',
        
    },
    {
        key: 'matchName',
        label: 'matchNameLabel',
        width: '10%',
        align: 'left'
    },
    {
        key: 'fieldName',
        label: 'fieldNameLabel',
        width: '10%',
        align: 'left'
    },
    {
        key: 'adress',
        label: 'addressLabel',
        width: '10%',
        align: 'left'
    },
    {
        key: 'matchDifficulty',
        label: 'categoryLabel',
        width: '10%',
        align: 'left'
    },
    {
        key: 'numberOfTeams',
        label: 'teamsLabel',
        width: '10%',
        align: 'left'
    },
    {
        key: 'teamSize',
        label: 'teamSizeLabel',
        width: '10%',
        align: 'left'
    },
    {
        key: 'duration',
        label: 'durationLabel',
        width: '10%',
        align: 'left'
    },
    {
        key: 'spots',
        label: 'spotsLabel',
        width: '10%',
        align: 'left'
    },
    {
        key: 'actions',
        label: 'actionsLabel',
        width: '10%',
        align: 'left'
    }
]

const AllMatchesTable = () => {

    const theme = useTheme();
    const matchDownMD = useMediaQuery(theme.breakpoints.down("md"));

    const [ rows, setRows ] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const allMatches = useSelector((state)=> state?.matchesState?.matches)
    const loadingAll = useSelector((state)=> state?.matchesState?.loading)
    const errorAll = useSelector((state)=> state?.matchesState?.error?.status)

    const handleJoin = useCallback((matchId) => {
        dispatch(updateMatch(matchId, allMatches?.privateMatch, ()=> navigate('/upcoming-match')));
        dispatch(setMatchId(matchId));
    }, [dispatch, navigate, allMatches?.privateMatch])
    
    const handleExit = useCallback((matchId) => {
        dispatch(exitMatch(matchId, ()=> {dispatch(getMatches()); dispatch(getNearMatches())}));
    }, [dispatch])

    const handleRequest = useCallback((matchId) => {
        dispatch(updateMatch(matchId, ()=> {dispatch(getMatches()); dispatch(getNearMatches())}));
    }, [dispatch])

    const handleDetails = useCallback((matchId) => {
        dispatch(setMatchId(matchId));
        navigate('/upcoming-match')
    }, [dispatch, navigate])

    const handleJoinTeam = useCallback((matchId) => {
        dispatch(setMatchId(matchId));
        navigate('/upcoming-match')
    }, [dispatch, navigate])

    const handleDelete = useCallback((matchId) => {
        dispatch(deleteMatch(matchId, ()=> {dispatch(getMatches()); dispatch(getNearMatches())}));
    }, [dispatch])

    const handleCancel = useCallback((matchId) => {
        dispatch(cancelJoin(matchId, ()=> {dispatch(getMatches()); dispatch(getNearMatches())}));
    }, [dispatch])

    const switchButton = useCallback((joinedeStatus, matchId, privateMatch, duration) => {
        const statusCase = joinedeStatus.join(''); 

        switch (statusCase) {
            case '0':
            return ( <>
                    { !privateMatch ? 
                        <CustomModal buttonTitle={t('joinNowButton')} modalTitle={t('joinModalTitle')} 
                        modalContent={<Typography>{duration / 60} {t('joinMessage')}</Typography>}
                        handleSubmit={()=>handleJoin(matchId)} loading={loadingAll}
                        confirmButtonTitle={t('confirmButton')} buttonWidth={'200px'}
                        /> : 
                        <CustomModal buttonTitle={t('requestToJoinButton')} modalTitle={t('requestJoinModalTitle')} 
                        modalContent={<Typography>{duration / 60} {t('joinMessage')}</Typography>}
                        handleSubmit={()=>handleRequest(matchId)} loading={loadingAll}
                        confirmButtonTitle={t('confirmButton')} buttonWidth={'200px'}
                        />
                    }
                    </>
                );
            case '1':
                return ( <>
                        <CustomModal buttonTitle={t('cancelRequestButton')} modalTitle={t('cancelRequestModalTitle')} 
                            modalContent={<Typography>{t('cancelRequestMessage')}</Typography>}
                            handleSubmit={()=>handleCancel(matchId)} loading={loadingAll}
                            confirmButtonTitle={t('confirmButton')} buttonWidth={'200px'} variant={'danger'}
                        />
                    </>
                );
            case '2':
                return ( <>
                        <CustomModal buttonTitle={t('exitMatchButton')} modalTitle={'EXIT MATCH'} 
                            modalContent={<Typography>{t('cancelRequestMatchMessage')} {duration / 60} {t('cancelRequestAddMessage')}</Typography>}
                            handleSubmit={()=>handleExit(matchId)} loading={loadingAll}
                            confirmButtonTitle={'Exit match'} buttonWidth={'200px'} variant={'danger'}
                        />
                        <Tooltip title={t('detailsTooltip')}>
                            <Button variant='outlined' onClick={()=>handleDetails(matchId)}> <Info /> </Button>
                        </Tooltip>
                    </>
                );
            case '03':
                return ( <>
                            <CustomModal buttonTitle={t('deleteMatchButton')} modalTitle={t('deleteModalTitle')} 
                            modalContent={<Typography>{t('deleteModalMessage')}</Typography>}
                            handleSubmit={()=>handleDelete(matchId)} loading={loadingAll}
                            confirmButtonTitle={'Delete'} buttonWidth={'200px'} variant={'danger'}
                            />
                            <Tooltip title={t('choseATeamTooltip')}>
                                <Button variant='outlined' onClick={()=>handleJoinTeam(matchId)}> <Groups /> </Button>
                            </Tooltip>
                        </>
                    );
            case '23':
                return ( <>
                            <CustomModal buttonTitle={t('exitMatchButton')} modalTitle={'EXIT MATCH'} 
                                modalContent={<Typography>{t('cancelRequestMatchMessage')} {duration / 60} {t('cancelRequestAddMessage')}</Typography>}
                                handleSubmit={()=>handleExit(matchId)} loading={loadingAll}
                                confirmButtonTitle={'EXIT'} buttonWidth={'200px'} variant={'danger'}
                            />
                            <Tooltip title={t('detailsTooltip')}>
                                <Button variant='outlined' onClick={()=>handleDetails(matchId)}> <Info /> </Button>
                            </Tooltip>
                        </>
                    );
            default:
                return <Box display={'flex'} justifyContent={'center'}><Typography sx={{ color: '#fff', fontSize: '16px', fontWeight: '500' }}>Error</Typography></Box>

        }
    }, [ handleExit, loadingAll, handleDetails, handleJoin, handleRequest, handleJoinTeam, handleDelete, handleCancel, t])

    useEffect(() => {
        dispatch(getMatches());
	}, [dispatch])

    useEffect(() =>{
        async function workArray () {
            const myData = await allMatches?.map((el)=>{
                return {
                    ...el,
                    actions: <Box display={'flex'} flexDirection={"row"} justifyContent={'left'} gap={1}>
                            {switchButton(el?.joinedStatus, el?._id , el?.privateMatch, el?.duration)} 
                        </Box>,
                    spots:<Typography>{el?.spots?.occupiedSpots}/{el?.spots?.allSpots}</Typography>,
                    fieldName:<Typography sx={{ width: '180px', whiteSpace: 'nowrap', overflowX: 'hidden', textOverflow: 'ellipsis'}}>
                            {el?.matchField?.fieldName}
                        </Typography>,
                    adress:<Typography sx={{ width: '180px', whiteSpace: 'nowrap', overflowX: 'hidden', textOverflow: 'ellipsis'}}>
                            {el?.matchField?.city},{el?.matchField?.number},{el?.matchField?.street}
                        </Typography>,
                    timeDate: <Box display='flex' flexDirection='column' sx={{ minWidth: '80px'}}>
                                <Typography>{el?.matchStart}</Typography>
                                <Typography>{el?.matchDate}</Typography>
                            </Box>,
                    teamSize: <Typography>{el?.teamSize} X {el?.teamSize}</Typography>,
                    matchName:<Typography sx={{ width: '150px', whiteSpace: 'nowrap', overflowX: 'hidden', textOverflow: 'ellipsis'}}>
                            {el?.matchName} 
                        </Typography>,
                }
        })
        return myData;
    }
    allMatches && workArray().then((res)=>setRows(res));
    }, [allMatches, switchButton])


    return (
        <>
        { matchDownMD ? 
            <Box sx={{ width: '100%', minHeight: '300px'}}>
                { loadingAll ? 
                    <Box sx={{ width: '100%', minHeight: '300px', display: 'flex', justifyContent :'center', alignItems: 'center', backgroundColor: '#fff'}}>
                        <CircularProgress sx={{ alignSelf: 'center', justifySelf: 'center'}} /> 
                    </Box>
                : ( allMatches?.length === 0 ? <ErrorPage error={errorAll} noContentMessage={t('errorNoMatch')}/> : <>
                {allMatches?.map((el, index) => {
                    return (
                        <Fragment key={`${index}-${el?.matchName}`} >
                            <MatchesMobileCard buttonComp={<>{switchButton(el?.joinedStatus, el?._id , el?.privateMatch, el?.duration)}</>} 
                                matchName={el?.matchName} fieldName={el?.matchField?.fieldName} matchSchedule={`${el?.matchStart} - ${el?.matchDate}`} teamSize={el?.teamSize} numberOfTeams={el?.numberOfTeams}
                                matchSpots={`${el?.spots?.occupiedSpots}-${el?.spots?.availableSpots}`} fieldCoverPhoto={el?.matchField?.fieldCoverPhoto} matchCategory={el?.matchDifficulty} 
                                matchAddress={`${el?.matchField?.city} ${el?.matchField?.street} ${el?.matchField?.number}`}
                            />
                        </Fragment>
                    )
                })} </> )}
            </Box> 
        :
            <StyledTable name={'matches'} pagination noContentMessage={t('errorNoMatch')} loading={loadingAll} data={{ rows: rows, columns: tableColumns }}/>
        }
        </>
    );
};

export default AllMatchesTable;
