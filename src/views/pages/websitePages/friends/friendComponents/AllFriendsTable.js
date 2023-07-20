import React, { useState, useEffect, useCallback } from "react";
import StyledTable from 'ui-component/table/StyledTable';
import { Avatar, Box, Button, CircularProgress, Tooltip, Typography, useMediaQuery } from "@mui/material";
import StyledButton from "ui-component/button/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { skeletonTable } from "ui-component/loadingSkeleton/skeletonTable/SkeletonTable";
import { addFavorite, getFriends, removeFriend } from "store/actions/friendsActions";
import { Diversity3Outlined } from "@mui/icons-material";
import { useTheme } from "@mui/styles";
import { setFriendId } from "store/types/utilsTypes";
import PositionComp from "ui-component/positionComp/PositionComp";

// translation
import { useTranslation } from 'react-i18next';
import ErrorPage from "ui-component/error";

const tableColumns = [
    {
        key: 'name',
        label: 'nameLabel',
        width: '60%',
        align: 'left'
    },
    {
        key: 'position',
        label: 'positionLabel',
        width: '15%',
        align: 'left'
    },
    {
        key: 'actions',
        label: 'actionsLabel',
        width: '15%',
        align: 'left'
    },
]

const AllFriendsTable = () => {

	const theme = useTheme();
	const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

    const [rows, setRows] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const friends = useSelector((state) => state?.friendsState?.friends);
    const loadingFriends = useSelector((state) => state?.friendsState?.loading);
    const error = useSelector((state) => state?.friendsState?.error?.status);

    const handlerRows = loadingFriends === true ? Array(3).fill(skeletonTable) : rows;

    const handleFriendProfile = useCallback((friendId)=> {
        dispatch(setFriendId(friendId));
        return navigate('/friend-profile');
    }, [dispatch, navigate])

    const handleFavFriends = useCallback((friendId)=> {
        dispatch(addFavorite(friendId, ()=> dispatch(getFriends())));
    }, [dispatch])

    useEffect(() => {
        dispatch(getFriends())
    }, [dispatch])

    useEffect(() => {
        async function workArray() {
            const myData = await friends.map((el) => {
                return {
                    ...el,
                    actions:
                        <Box display={'flex'} flex={'row'} columnGap={2} justifyContent={'left'} width={'100%'}>
                            <StyledButton
                                loading={loadingFriends}
                                handleClick={() => dispatch(removeFriend(el?._id, () => dispatch(getFriends())))}
                                width={"200px"}
                                label={t('removeFriendButton')}
                                name={"button"}
                                variant={'danger'}
                            />
                            <StyledButton
                                loading={loadingFriends}
                                disabled={el?.favourite}
                                handleClick={() => handleFavFriends(el?._id)}
                                width={"200px"}
                                label={t('addToFavoriteButton')}
                                name={"button-for-favorite"}
                            />
                        </Box>,
                    name:<Tooltip title={t('goToProfileTooltip')}>
                            <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1}} onClick={()=>handleFriendProfile(el?._id)}>
                                <Avatar src={`${el?.avatar}`} alt={'player-avatar'}/>
                                <Typography>
                                {el?.firstName} {el?.lastName}
                                </Typography>
                            </Box> 
                        </Tooltip>,
                    position: <PositionComp positions={el?.position}/>
                }
            })
            return myData;
        }
        friends && workArray().then((res) => setRows(res));
    }, [friends, navigate, dispatch, loadingFriends, handleFriendProfile, handleFavFriends])  /* eslint-disable-line */


    return (
        <>
            {matchDownSM ? 
                <>
                    { loadingFriends ? 
                        <Box sx={{ width: '100%', minHeight: '300px', display: 'flex', justifyContent :'center', alignItems: 'center', backgroundColor: '#fff'}}>
                            <CircularProgress sx={{ alignSelf: 'center', justifySelf: 'center'}} /> 
                        </Box> 
                    : 
                        <>
                            { friends?.length === 0 ? 
                                <ErrorPage error={error} noContentMessage={t('friendsGetError')}/> : <>
                                {friends.map((el, index) => {
                                    return (
                                        <Box key={`${el?.firstName}-${el?.lastName}-${index}`} 
                                            sx={{ backgroundColor: '#fff', maxWidth: '100%', borderRadius: '10px', display: 'flex', flexDirection: 'row',
                                            alignItems: 'center', justifyContent: 'space-between', p: '12px',m:0, mb: '20px'}}>
                                            <Box component={'img'} sx={{width: '60px', height: '60px', borderRadius: '10px', objectFit:'cover'}} alt={'player-avatar'} 
                                                onClick={()=>handleFriendProfile(el?._id)} src={`${el?.avatar}`}/>
                                            <Box sx={{ width: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'center', px: '10px'}}>
                                                <Box sx={{pb: '10px', display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center'}}>
                                                    <Typography noWrap sx={{ width: '50%', fontSize: '14px'}}>
                                                    {el?.firstName} {el?.lastName}
                                                    </Typography>
                                                    <PositionComp positions={el?.position}/>
                                                </Box>
                                                <Box display={'flex'} flex={'row'} columnGap={2} justifyContent={'space-between'}>
                                                    <Button
                                                        onClick={() => dispatch(removeFriend(el?._id, ()=> dispatch(getFriends())))}
                                                        size={"small"}
                                                        variant={'outlined'}
                                                        color={'error'}
                                                        sx={{width: '120px'}}
                                                    >{t('removeFriendButton')}</Button>
                                                    <StyledButton
                                                        handleClick={() => handleFavFriends(el?._id)}
                                                        width={"60px"}
                                                        disabled={el?.favourite}
                                                        label={<Diversity3Outlined fontSize={'20px'} />}
                                                        name={"button"}
                                                        variant={'secondary'}
                                                        />
                                                </Box>
                                            </Box>
                                        </Box>
                                    )
                                })}
                                </>
                            }
                        </>
                    }
                </>
            :
                <StyledTable name={'friends'} pagination loading={loadingFriends} noContentMessage={t('friendsGetError')} data={{ rows: handlerRows, columns: tableColumns }} tablePaginationSx={{ backgroundColor: '#fff' }} />
            }
        </>
    );
};

export default AllFriendsTable;
