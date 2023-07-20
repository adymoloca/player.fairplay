import React, { useState, useEffect } from "react";
import StyledTable from 'ui-component/table/StyledTable';
import { Avatar, Box, Skeleton, Typography, useMediaQuery } from "@mui/material";
import StyledButton from "ui-component/button/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { skeletonTable } from "ui-component/loadingSkeleton/skeletonTable/SkeletonTable";
import { acceptReceivedFriendRequest, declineFriend, getReceivedFriendRequest } from "store/actions/friendsActions";

// translation
import { useTranslation } from 'react-i18next';
import PositionComp from "ui-component/positionComp/PositionComp";
import { useTheme } from "@mui/styles";
import { CancelOutlined, CheckCircleOutline } from "@mui/icons-material";

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

const FriendRequestTable = () => {

	const theme = useTheme();
	const matchDownMD = useMediaQuery(theme.breakpoints.down("md"));
	const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

    const [rows, setRows] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
	const { t } = useTranslation();

    const receivedRequest = useSelector((state) => state?.friendsState?.requests);
    const receivedLoading = useSelector((state) => state?.friendsState?.loading);

    const handlerRows = receivedLoading === true ? Array(3).fill(skeletonTable) : rows;

    useEffect(() => {
        dispatch(getReceivedFriendRequest())
    }, [dispatch])
    
    useEffect(() => {
        async function workArray() {
            const myData = await receivedRequest.map((el) => {
                return {
                    ...el,
                    actions:
                        <Box display={'flex'} flex={'row'} columnGap={2} justifyContent={'start'}>
                            <StyledButton
                                loading={receivedLoading}
                                handleClick={() => dispatch(acceptReceivedFriendRequest(el?._id, ()=> dispatch(getReceivedFriendRequest())))}
                                width={matchDownMD ? '60px' : "250px"}
                                label={matchDownMD ? <CheckCircleOutline /> : t('acceptFriendButton')}
                                name={"button"}
                            />
                            <StyledButton
                                loading={receivedLoading}
                                handleClick={() => dispatch(declineFriend(el?._id, ()=> dispatch(getReceivedFriendRequest())))}
                                width={matchDownMD ? '60px' : "250px"}
                                label={matchDownMD ? <CancelOutlined /> : t('declineFriendButton')}
                                name={"button"} variant={'danger'}
                            />
                        </Box>,
                    name:<Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1}} >
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
        receivedRequest && workArray().then((res) => setRows(res));
    }, [receivedRequest, navigate, dispatch, receivedLoading, t, matchDownMD ])


    return (
        <>
            { matchDownSM ? 
                <>
                    { receivedLoading ?  
                        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '120px', backgroundColor: '#fff', borderRadius: '12px'}}>
                            <Skeleton sx={{width: '80%', height: '90%'}} />
                        </Box> 
                    : 
                        <>
                            { receivedRequest?.length === 0 ? 
                                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '120px', backgroundColor: '#fff', borderRadius: '12px'}}>
                                    <Typography >{t('errorGetReceivedFriends')}...</Typography>
                                </Box> 
                            :
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2}}>
                                    { receivedRequest?.map((el, index) => {
                                        return (
                                            <Box key={`friend-req-${el?.firstName}-${el?.lastName}-${index}`}
                                                sx={{width: '100%', display: 'flex', flexDirection: 'column', gap: 2, p: 2, backgroundColor: '#fff', borderRadius: '12px'}}>
                                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'centert'}}>
                                                    <Box sx={{width:'60%' ,display: 'flex', flexDirection: 'row', alignItems: 'center', gap:1}} >
                                                        <Avatar src={`${el?.avatar}`}  alt={'player-avatar-photo'}/>
                                                        <Typography >
                                                            {el?.firstName} {el?.lastName}
                                                        </Typography>
                                                    </Box>
                                                    <PositionComp positions={el?.position} />
                                                </Box>
                                                <Box display={'flex'} flex={'row'} columnGap={2} justifyContent={'start'} >
                                                    <StyledButton
                                                        loading={receivedLoading}
                                                        handleClick={() => dispatch(acceptReceivedFriendRequest(el?._id, ()=> dispatch(getReceivedFriendRequest())))}
                                                        width={'50%'}
                                                        label={ <CheckCircleOutline />}
                                                        name={"button"}
                                                    />
                                                    <StyledButton
                                                        loading={receivedLoading}
                                                        handleClick={() => dispatch(declineFriend(el?._id, ()=> dispatch(getReceivedFriendRequest())))}
                                                        width={'50%'}
                                                        label={<CancelOutlined />}
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
                <StyledTable name={'players'} pagination loading={receivedLoading} noContentMessage={t('errorGetReceivedFriends')} data={{ rows: handlerRows, columns: tableColumns }} tablePaginationSx={{ backgroundColor: '#fff' }} />
            }
        </>
    );
};

export default FriendRequestTable;
