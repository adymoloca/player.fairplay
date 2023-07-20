import React, { useState, useEffect, useCallback, Fragment } from "react";
import StyledTable from 'ui-component/table/StyledTable';
import { Avatar, Box, IconButton, Skeleton, Tooltip, Typography, useMediaQuery } from "@mui/material";
import StyledButton from "ui-component/button/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { skeletonTable } from "ui-component/loadingSkeleton/skeletonTable/SkeletonTable";
import { acceptReceivedFriendRequest, declineFriend, revoque, sendFriendRequest } from "store/actions/friendsActions";
import { getPlayerUsername } from "store/actions/searchActions";
import { setFriendId } from "store/types/utilsTypes";
import PositionComp from "ui-component/positionComp/PositionComp";

// translation
import { useTranslation } from 'react-i18next';

import { AccountCircle, Cancel, PersonAddAlt1, Textsms, Undo } from "@mui/icons-material";
import { useTheme } from "@mui/system";
import MobileSeacrhPlayerCard from "./MobileSeacrhPlayerCard";

const tableColumns = [
    {
        key: 'name',
        label: 'nameLabel',
        width: '35%',
        align: 'left'
    },
    {
        key: 'username',
        label: 'userNameLabel',
        width: '30%',
        align: 'left'
    },
    {
        key: 'position',
        label: 'positionLabel',
        width: '20%',
        align: 'left'
    },
    {
        key: 'actions',
        label: 'actionsLabel',
        width: '15%',
        align: 'left'
    },
]

const SearchPlayer = () => {

    const [rows, setRows] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const theme = useTheme();
	const matchDownMD = useMediaQuery(theme.breakpoints.down("md"));
	const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

    const playerUsername = useSelector((state) => state?.searchState?.playerUsername);
    const loadingPlayerUsername = useSelector((state) => state?.searchState?.loading);
    const loadingFriend = useSelector((state) => state?.friendsState?.loading);

    const handlerRows = loadingPlayerUsername === true ? Array(3).fill(skeletonTable) : rows;
    const searchValue = useSelector((state) => state?.utilsState?.utils?.setSearch);

    const handleSendRequest = useCallback((playerId) => {
        dispatch(sendFriendRequest(playerId, () => dispatch(getPlayerUsername(searchValue))));
    }, [dispatch, searchValue])

    const handleAcceptRequest = useCallback((requestId) => {
        dispatch(acceptReceivedFriendRequest(requestId, () => dispatch(getPlayerUsername(searchValue))));
    }, [dispatch, searchValue])

    const handleDeclineRequest = useCallback((requestId) => {
        dispatch(declineFriend(requestId, () => dispatch(getPlayerUsername(searchValue))));
    }, [dispatch, searchValue])

    const handleRevoqueRequest = useCallback((requestId) => {
        dispatch(revoque(requestId, () => dispatch(getPlayerUsername(searchValue))));
    }, [dispatch, searchValue])

    const handleFriendProfile = useCallback((friendId) => {
        dispatch(setFriendId(friendId));
        return navigate('/friend-profile');
    }, [dispatch, navigate])

    const renderBtn = (title, handleClick = () => undefined, loading, disabled, variant) => {
        return <StyledButton
            loading={loading}
            disabled={disabled}
            variant={variant || 'primary'}
            handleClick={() => handleClick()}
            width={matchDownSM ? '45%' : (matchDownMD ? '60px' : "200px")}
            label={title}
            name={"button"}
        />
    }

    const switchButton = useCallback((relationship, friendRequestId, playerId) => {
        switch (relationship) {
            case 0:
                return ( <>
                            {renderBtn(matchDownMD ? <Textsms fontSize="small"/> : `${t('sendMessageButton')}`, ()=>console.log('in progress'), loadingFriend, Boolean(relationship !== 3))}
                            {renderBtn(matchDownMD ? <PersonAddAlt1 fontSize="small"/> : `${t('sendFrienndReq')}`, ()=>handleSendRequest(playerId), loadingFriend, false)}
                        </>
                );
            case 1:
                return ( <>
                            {renderBtn(matchDownMD ? <Textsms fontSize="small"/> : `${t('sendMessageButton')}`, ()=>console.log('in progress'), loadingFriend, Boolean(relationship !== 3))}
                            {renderBtn(matchDownMD ? <Undo fontSize="small"/> : `${t('revokReq')}`, ()=>handleRevoqueRequest(friendRequestId), loadingFriend, false, 'danger')}
                        </>
                );
            case 2:
                return ( <>
                            {renderBtn(matchDownMD ? <Cancel fontSize="small"/> : `${t('acceptFrienrReq')}`, ()=>handleAcceptRequest(friendRequestId), loadingFriend, false)}
                            {renderBtn(matchDownMD ? <Cancel fontSize="small"/> : `${t('declineFriendReq')}`, ()=>handleDeclineRequest(friendRequestId), loadingFriend, false, 'danger')}
                        </>
                );
            case 3:
                return ( <>
                            {renderBtn(matchDownMD ? <Textsms fontSize="small"/> : `${t('sendMessageButton')}`, ()=>console.log('in progress'), loadingFriend, Boolean(relationship !== 3))}
                            { matchDownSM ? 
                                <> {renderBtn(<AccountCircle fontSize="small"/> , ()=>handleFriendProfile(playerId), false, false)} </>
                            :
                                <Tooltip title={t('goToProfileTooltip')}>
                                    <IconButton aria-label="Go To Ptofile" onClick={()=>handleFriendProfile(playerId)}>
                                        <AccountCircle fontSize="medium" sx={{color: `${theme.palette.secondary.dark}` }}/>
                                    </IconButton>
                                </Tooltip>
                            }
                        </>
                    );
            default:
                return <Box display={'flex'} justifyContent={'center'}><Typography sx={{ color: '#fff', fontSize: '16px', fontWeight: '500' }}>Error</Typography></Box>

        }
        // eslint-disable-next-line
    }, [handleAcceptRequest, handleDeclineRequest, handleFriendProfile, handleRevoqueRequest, handleSendRequest, loadingFriend, t, matchDownMD])

    useEffect(() => {
        if (searchValue === '')
            return navigate('/')
        else
            return dispatch(getPlayerUsername(searchValue))
    }, [dispatch, searchValue, navigate])

    useEffect(() => {
        async function workArray() {
            const myData = await playerUsername.map((el) => {
                return {
                    ...el,
                    actions: <Box display={'flex'} flex={'row'} columnGap={2} justifyContent={'start'}>
                                {switchButton(el?.relationship, el?.friendRequestId, el?._id)}
                            </Box>,
                    name: <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1}} >
                            <Avatar src={`${el?.avatar}`}/>
                            <Typography>
                                {el?.firstName} {el?.lastName}
                            </Typography>
                        </Box>,
                    position: <PositionComp positions={el?.position} />
                }
            })
            return myData;
        }
        playerUsername && workArray().then((res) => setRows(res));
    }, [playerUsername, switchButton])


    return (
        <>
            { matchDownSM ?
                <> 
                    { loadingPlayerUsername ?
                        <Box sx={{ maxWidth: '100%', minHeight: '200px', display: 'flex', flexDirection: 'column', backgroundColor: '#fff', px: 1}}>
                            <Skeleton sx={{height: '100px'}} />
                            <Skeleton sx={{height: '100px'}}/> 
                            <Skeleton sx={{height: '100px'}}/> 
                        </Box>
                    :
                        <>
                            { playerUsername?.length === 0 ? 
                                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '120px', backgroundColor: '#fff', borderRadius: '12px'}}>
                                    <Typography >{t('errorGetPlayersSearc')}...</Typography>
                                </Box> 
                            :
                                <Box sx={{ width: '100%', display: 'flex', flexWrap: 'wrap', pb: 4, justifyContent: 'center', backgroundColor: '#fff' }}>
                                    { playerUsername?.map((el, index) => {
                                        return (
                                            <Fragment key={`searched-player-${el?.firstName}-${el?.lastName}-${index}`} >
                                                <MobileSeacrhPlayerCard playerName={`${el?.firstName} ${el?.lastName}`} playerAvatar={`${el?.avatar}`} playerPositions={el?.position} 
                                                    cardButtons={()=>switchButton(el?.relationship, el?.friendRequestId, el?._id)} />
                                            </Fragment>
                                        )
                                    })}
                                </Box>
                            }
                        </>
                    }
                </>
            :
                <StyledTable searchTable name={'players'} loading={loadingPlayerUsername} pagination data={{ rows: handlerRows, columns: tableColumns }} noContentMessage={`${t('errorGetPlayersSearc')}`} />
            }
        </>
    );
};

export default SearchPlayer;