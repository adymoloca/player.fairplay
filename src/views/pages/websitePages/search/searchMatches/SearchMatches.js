import React, { useState, useEffect, useCallback, Fragment } from "react";
import StyledTable from 'ui-component/table/StyledTable';
import { Box, Button, Tooltip, Typography, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getMatchBySearch } from "store/actions/searchActions";
import { cancelJoin, deleteMatch, exitMatch, updateMatch } from "store/actions/matchesActions";
import { setMatchId } from "store/types/utilsTypes";
import { Groups, Info } from "@mui/icons-material";
import CustomModal from "ui-component/modal/CustomModal";

// translation
import { useTranslation } from 'react-i18next';
import { useTheme } from "@mui/styles";
import MatchesMobileCard from "../../matches/matchesComponent/MatchesMobileCard";

const tableColumns = [
    {
        key: 'timeDate',
        label: 'timeDateLabel',
        width: 200,
        align: 'left',
        
    },
    {
        key: 'matchName',
        label: 'matchNameLabel',
        width: '200px',
        align: 'left'
    },
    {
        key: 'fieldName',
        label: 'fieldNameLabel',
        width: '10%',
        align: 'left'
    },
    {
        key: 'address',
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
        key: 'teams',
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

const SearchMatches = () => {

    const theme = useTheme();
    const matchDownMD = useMediaQuery(theme.breakpoints.down("md"));

    const [rows, setRows] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const searchedMatches = useSelector((state) => state?.searchState?.searchMatches);
    const loadingPlayerUsername = useSelector((state) => state?.searchState?.loading);
    const loadingMatch = useSelector((state) => state?.matchesState?.loading);

    const searchValue = useSelector((state) => state?.utilsState?.utils?.setSearch);
    
    const handleJoin = useCallback((matchId) => {
        dispatch(setMatchId(matchId));
        dispatch(updateMatch(matchId, () => navigate('/upcoming-match')));
    }, [dispatch, navigate])

    const handleExit = useCallback((matchId) => {
        dispatch(exitMatch(matchId, ()=> dispatch(getMatchBySearch(searchValue))));
    }, [dispatch, searchValue])

    const handleRequest = useCallback((matchId) => {
        dispatch(updateMatch(matchId, ()=> dispatch(getMatchBySearch(searchValue))));
    }, [dispatch, searchValue])

    const handleDetails = useCallback((matchId) => {
        dispatch(setMatchId(matchId));
        navigate('/upcoming-match')
    }, [dispatch, navigate])

    const handleJoinTeam = useCallback((matchId) => {
        dispatch(setMatchId(matchId));
        navigate('/upcoming-match')
    }, [dispatch, navigate])


    const handleDelete = useCallback((matchId) => {
        dispatch(deleteMatch(matchId, ()=> dispatch(getMatchBySearch(searchValue))));
    }, [dispatch, searchValue])

    const handleCancel = useCallback((matchId) => {
        dispatch(cancelJoin(matchId, ()=> dispatch(getMatchBySearch(searchValue))));
    }, [dispatch, searchValue])
    
    const switchButton = useCallback((joinedeStatus, matchId, privateMatch, duration) => {
        const statusCase = joinedeStatus.join(''); 

        switch (statusCase) {
            case '0':
            return (<>
                        { !privateMatch ? 
                            <CustomModal buttonTitle={t('joinNowButton')} modalTitle={t('joinModalTitle')} 
                            modalContent={<Typography>{duration / 60} {t('joinMessage')}</Typography>}
                            handleSubmit={()=>handleJoin(matchId)} loading={loadingMatch}
                            confirmButtonTitle={t('confirmButton')} buttonWidth={'200px'}
                            /> : 
                            <CustomModal buttonTitle={t('requestToJoinButton')} modalTitle={t('requestJoinModalTitle')} 
                            modalContent={<Typography>{duration / 60} {t('joinMessage')}</Typography>}
                            handleSubmit={()=>handleRequest(matchId)} loading={loadingMatch}
                            confirmButtonTitle={t('confirmButton')} buttonWidth={'200px'}
                            />
                        }
                    </>
                );
                case '1':
                    return ( <>
                            <CustomModal buttonTitle={t('cancelRequestButton')} modalTitle={t('cancelRequestModalTitle')} 
                                modalContent={<Typography>{t('cancelRequestMessage')}</Typography>}
                                handleSubmit={()=>handleCancel(matchId)} loading={loadingMatch}
                                confirmButtonTitle={t('confirmButton')} buttonWidth={'200px'} variant={'danger'}
                            />
                        </>
                    );
                case '2':
                    return ( <>
                            <CustomModal buttonTitle={t('exitMatchButton')} modalTitle={'EXIT MATCH'} 
                                modalContent={<Typography>{t('cancelRequestMatchMessage')} {duration / 60} {t('cancelRequestAddMessage')}</Typography>}
                                handleSubmit={()=>handleExit(matchId)} loading={loadingMatch}
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
                                handleSubmit={()=>handleDelete(matchId)} loading={loadingMatch}
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
                                    handleSubmit={()=>handleExit(matchId)} loading={loadingMatch}
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
    }, [ handleExit, loadingMatch, handleDetails, handleJoin, handleRequest, handleJoinTeam, handleDelete, handleCancel, t])

    useEffect(() => {
        if (searchValue === '')
            return navigate('/')
        else
            return dispatch(getMatchBySearch(searchValue))
    }, [dispatch, searchValue, navigate])

    useEffect(() => {
        async function workArray() {
            const myData = await searchedMatches.map((el) => {
                return {
                    ...el,
                    actions: <Box display={'flex'} flexDirection={"row"} sx={{ gap: 2, justifyContent: 'left'}}>
                        {switchButton(el?.joinedStatus, el?._id , el?.privateMatch, el?.duration)} 
					</Box>,
				    timeDate: <Box display='flex' flexDirection='column' sx={{ minWidth: '80px'}}>
                            <Typography>{el?.matchStart}</Typography>
                            <Typography>{el?.matchDate}</Typography>
                        </Box>,
                    matchName: <Typography noWrap variant="body1" sx={{ textOverflow: "ellipsis", overflow: "hidden", width: '150px'}}>{el?.matchName}</Typography>,
                    address: <Typography noWrap variant="body1" sx={{ textOverflow: "ellipsis", overflow: "hidden", width: '180px'}}>{el?.address}</Typography>,
                    fieldName: <Typography noWrap variant="body1" sx={{ textOverflow: "ellipsis", overflow: "hidden", width: '180px' }}>{el?.fieldName}</Typography>,
                    teamSize: <Typography >{el?.size} X {el?.size}</Typography>
                }
            })
            return myData;
        }
        searchedMatches && workArray().then((res) => setRows(res));
    }, [searchedMatches, loadingMatch, switchButton])


    return (
        <>
            { matchDownMD ? 
                <Box sx={{ width: '100%', display: 'flex', flexWrap: 'wrap', pb: 4, justifyContent: 'center', backgroundColor: '#fff' }}>
                    {searchedMatches?.map((el, index) => {
                        return (
                            <Box key={`search-match-${index}-${el?.matchName}`} sx={{ width: '100%', borderBottom: '1px solid #DDD'}}>
                                <MatchesMobileCard matchName={el?.matchName} fieldName={el?.fieldName} matchSchedule={`${el?.matchStart} - ${el?.matchDate}`} teamSize={el?.size} numberOfTeams={el?.teams}
                                    matchSpots={el?.spots} fieldCoverPhoto={el?.fieldCoverPhoto} matchCategory={el?.matchDifficulty} matchAddress={el?.address}
                                    buttonComp={<>{switchButton(el?.joinedStatus, el?._id , el?.privateMatch, el?.duration)}</>} 
                                />
                            </Box>
                        )
                    })} 
                </Box> 
        :
                <StyledTable searchTable name={'players'} loading={loadingPlayerUsername} pagination data={{ rows: rows, columns: tableColumns }} noContentMessage={`${t('errorGetMatchesSearc')}`} />
            }
        </>
    );
};

export default SearchMatches;
