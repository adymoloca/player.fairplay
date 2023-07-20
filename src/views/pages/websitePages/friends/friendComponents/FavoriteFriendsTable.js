import React, { useState, useEffect, useCallback } from "react";
import StyledTable from 'ui-component/table/StyledTable';
import { Avatar, Box, Button, CircularProgress, Tooltip, Typography, useMediaQuery } from "@mui/material";
import StyledButton from "ui-component/button/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { skeletonTable } from "ui-component/loadingSkeleton/skeletonTable/SkeletonTable";
import { getFavorite, removeFavorite } from "store/actions/friendsActions";
import { setFriendId } from "store/types/utilsTypes";
import PositionComp from "ui-component/positionComp/PositionComp";

// translation
import { useTranslation } from 'react-i18next';
import { useTheme } from "@mui/system";
import { Sms } from "@mui/icons-material";
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

const FavoriteFriendsTable = () => {

	const theme = useTheme();
	const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

    const [rows, setRows] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const favouriteFriends = useSelector((state) => state?.friendsState?.favouriteFriends);
    const loadingFavorite = useSelector((state) => state?.friendsState?.loading);
    const error = useSelector((state) => state?.friendsState?.error?.status);

    const handlerRows = loadingFavorite ? Array(3).fill(skeletonTable) : rows;

    const handleFriendProfile = useCallback((friendId)=> {
        dispatch(setFriendId(friendId));
        return navigate('/friend-profile');
    }, [dispatch, navigate])

    useEffect(() => {
        dispatch(getFavorite())
    }, [dispatch])
    
    useEffect(() => {
        async function workArray() {
            const myData = await favouriteFriends.map((el) => {
                return {
                    ...el,
                    actions:
                        <Box display={'flex'} flex={'row'} columnGap={2} justifyContent={'center'}>
                            <StyledButton
                                handleClick={() => console.log('in progress for message')}
                                width={"180px"}
                                label={t('sendMessageButton')}
                                name={"button"}
                            />
                            <StyledButton
                                loading={loadingFavorite}
                                handleClick={() => dispatch(removeFavorite(el?._id, ()=> dispatch(getFavorite())))}
                                width={"180px"}
                                label={t('removeFavoriteButton')}
                                name={"button"}
                                variant={'danger'}
                            />
                        </Box>,
                    name: 
                        <Tooltip title={t('goToProfileTooltip')}>
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
        favouriteFriends && workArray().then((res) => setRows(res));
    }, [favouriteFriends, navigate, dispatch, loadingFavorite, handleFriendProfile]) /* eslint-disable-line */


    return (
        <>
            { matchDownSM ? 
                <>
                    { loadingFavorite ? 
                        <Box sx={{ width: '100%', minHeight: '300px', display: 'flex', justifyContent :'center', alignItems: 'center', backgroundColor: '#fff'}}>
                            <CircularProgress sx={{ alignSelf: 'center', justifySelf: 'center'}} /> 
                        </Box> 
                    : 
                        <>
                            { favouriteFriends.length === 0 ? 
                                <ErrorPage error={error} noContentMessage={t('favoriteFriendsGetError')} />
                                :
                                <>
                                    {favouriteFriends.map((el, index) => {
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
                                                        <StyledButton
                                                            handleClick={() => console.log('in progress for message')}
                                                            width={"60px"}
                                                            label={<Sms fontSize="20px" />}
                                                            name={"button"}
                                                            variant={'secondary'}
                                                        />
                                                        <Button
                                                            onClick={() => dispatch(removeFavorite(el?._id, ()=> dispatch(getFavorite())))}
                                                            size={"small"}
                                                            variant={'outlined'}
                                                            color={'error'}
                                                            sx={{width: '120px'}}
                                                        >{t('removeFavoriteButton')}</Button>
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
                <StyledTable name={'favouriteFriends'} pagination loading={loadingFavorite} noContentMessage={t('favoriteFriendsGetError')} data={{ rows: handlerRows, columns: tableColumns }} tablePaginationSx={{ backgroundColor: '#fff' }} />
            }
        </>
    );
};

export default FavoriteFriendsTable;
