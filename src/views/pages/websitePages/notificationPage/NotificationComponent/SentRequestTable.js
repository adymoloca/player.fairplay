import React, { useState, useEffect, useCallback } from "react";
import StyledTable from 'ui-component/table/StyledTable';
import { Avatar, Box, Skeleton, Typography, useMediaQuery } from "@mui/material";
import StyledButton from "ui-component/button/button";
import { useDispatch, useSelector } from "react-redux";
import { skeletonTable } from "ui-component/loadingSkeleton/skeletonTable/SkeletonTable";
import { getSentFriendRequest, revoque } from "store/actions/friendsActions";

// translation
import { useTranslation } from 'react-i18next';
import PositionComp from "ui-component/positionComp/PositionComp";
import { useTheme } from "@mui/styles";
import { Undo } from "@mui/icons-material";

const tableColumns = [
    {
        key: 'name',
        label: 'nameLabel',
        width: '50%',
        align: 'left'
    },
    {
        key: 'position',
        label: 'positionLabel',
        width: '40%',
        align: 'left'
    },
    {
        key: 'actions',
        label: 'actionsLabel',
        width: '10%',
        align: 'left'
    },
]

const SentRequestTable = () => {

	const theme = useTheme();
	const matchDownMD = useMediaQuery(theme.breakpoints.down("md"));
	const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

    const [rows, setRows] = useState([]);
    const dispatch = useDispatch();
	const { t } = useTranslation();

    const sentRequest = useSelector((state) => state?.friendsState?.sentRequest);
    const sentLoading = useSelector((state) => state?.friendsState?.loading);

    const handlerRows = sentLoading === true ? Array(3).fill(skeletonTable) : rows;

    const handleRevoque = useCallback(( playerId) => {
        dispatch(revoque(playerId, ()=> dispatch(getSentFriendRequest())))
    },[dispatch])
    

    useEffect(() => {
        dispatch(getSentFriendRequest())
    }, [dispatch])
    
    useEffect(() => {
        async function workArray() {
            const myData = await sentRequest.map((el) => {
                return {
                    ...el,
                    actions:
                        <Box display={'flex'} flex={'row'} columnGap={2} justifyContent={'start'}>
                            <StyledButton
                                loading={sentLoading}
                                handleClick={() => handleRevoque(el?._id)}
                                width={matchDownMD ? 'auto' : "250px"}
                                label={matchDownMD ? <Undo /> : t('revokFriendButton')}
                                name={"button"} variant={'danger'}
                            />
                        </Box>,
                    name: <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1}} >
                            <Avatar src={`${el?.avatar}`}  alt={'player-avatar-photo'}/>
                            <Typography>
                                {el?.firstName} {el?.lastName}
                            </Typography>
                        </Box>,
                    position: <PositionComp positions={el?.position} />,
                }
            })
            return myData;
        }
        sentRequest && workArray().then((res) => setRows(res));
    }, [sentRequest, handleRevoque ,sentLoading, t, matchDownMD ])


    return (
        <>
            { matchDownSM ? 
                <>
                    { sentLoading ?
                        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '120px', backgroundColor: '#fff', borderRadius: '12px'}}>
                            <Skeleton sx={{width: '80%', height: '90%'}} />
                        </Box> 
                    :
                        <>
                            { sentRequest?.length === 0 ?
                                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '120px', backgroundColor: '#fff', borderRadius: '12px'}}>
                                    <Typography >{t('errorGetSentFriends')}...</Typography>
                                </Box> 
                            :
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2}}>
                                    { sentRequest?.map((el, index) => {
                                        return (
                                            <Box key={`sent-req${el?.firstName}-${el?.lastName}-${index}`} 
                                                sx={{width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 2, p: 2, backgroundColor: '#fff', borderRadius: '12px'}}>
                                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'centert'}}>
                                                    <Box sx={{width:'60%' ,display: 'flex', flexDirection: 'row', alignItems: 'center', gap:1}} >
                                                        <Avatar src={`${el?.avatar}`} alt={'player-avatar-photo'}/>
                                                        <Typography >
                                                            {el?.firstName} {el?.lastName}
                                                        </Typography>
                                                    </Box>
                                                    <PositionComp positions={el?.position} />
                                                </Box>
                                                <Box sx={{ maxWidth: '300px'}} >
                                                    <StyledButton
                                                        loading={sentLoading}
                                                        handleClick={() => handleRevoque(el?._id)}
                                                        width={'100%'}
                                                        label={ t('revokFriendButton')}
                                                        name={"button"} variant={'danger'}
                                                    />
                                                </Box>
                                            </Box>
                                        )
                                    })}
                                </Box>
                            }
                        </>
                    }
                </> :
                <StyledTable name={'players'} pagination loading={sentLoading} noContentMessage={t('errorGetSentFriends')} data={{ rows: handlerRows, columns: tableColumns }} tablePaginationSx={{ backgroundColor: '#fff' }} />
            }
        </>
    );
};

export default SentRequestTable;
