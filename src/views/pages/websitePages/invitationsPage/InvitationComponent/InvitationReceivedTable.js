import React, { useState, useEffect, useCallback, Fragment } from "react";
import StyledTable from 'ui-component/table/StyledTable';
import { Avatar, Box, Skeleton, Typography, useMediaQuery } from "@mui/material";
import StyledButton from "ui-component/button/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { acceptInvitation, declineInvitation, getInvitationRequest } from "store/actions/invitePlayerActions";
import CustomModal from "ui-component/modal/CustomModal";

// translation
import { useTranslation } from 'react-i18next';

import { useTheme } from "@mui/styles";
import { CancelOutlined, CheckCircleOutline } from "@mui/icons-material";
import MobileReceivedCard from "./MobileCardComponent/MobileReceivedCard";

const tableColumns = [
    {
        key: 'name',
        label: 'nameLabel',
        width: '15%',
        align: 'left'
    },
    {
        key: 'time',
        label: 'timeLabel',
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
        key: 'matchName',
        label: 'matchNameLabel',
        width: '15%',
        align: 'left'
    },
    {
        key: 'fieldName',
        label: 'fieldNameLabel',
        width: '20%',
        align: 'left'
    },
    {
        key: 'address',
        label: 'addressLabel',
        width: '20%',
        align: 'left'
    },
    {
        key: 'actions',
        label: 'actionsLabel',
        width: '10%',
        align: 'left'
    },
]

const InvitationReceivedTable = () => {

	const theme = useTheme();
	const matchDownXL = useMediaQuery(theme.breakpoints.down("xl"));
	const matchDownLG = useMediaQuery(theme.breakpoints.down("lg"));
	const matchDownMD = useMediaQuery(theme.breakpoints.down("md"));

    const [rows, setRows] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
	const { t } = useTranslation();

    const receivedRequest = useSelector((state) => state?.invitationState?.invitations);
    const receivedLoading = useSelector((state) => state?.invitationState?.loading);
    const actionLoading = useSelector((state) => state?.invitationState?.loadingAction);

    const handleAccept = useCallback ((matchInvitationId)=>{
        dispatch(acceptInvitation(matchInvitationId, ()=> navigate('/')))
    }, [dispatch, navigate])

    const handleDecline = useCallback ((matchInvitationId)=>{
        dispatch(declineInvitation(matchInvitationId, ()=> dispatch(getInvitationRequest())))
    }, [dispatch])

    useEffect(() => {
        dispatch(getInvitationRequest())
    }, [dispatch])
    
    useEffect(() => {
        async function workArray() {
            const myData = await receivedRequest.map((el) => {
                return {
                    ...el,
                    actions:
                        <Box display={'flex'} flex={'row'} columnGap={2} justifyContent={'start'}>
                            <CustomModal buttonTitle={t('acceptButton')} modalTitle={t('invitationModalTitle')} 
                                    modalContent={<Typography>{el?.match?.duration / 60} {t('joinMessage')}</Typography>}
                                    handleSubmit={()=>handleAccept(el?._id)} loading={actionLoading} 
                                    confirmButtonTitle={t('confirmButton')} buttonWidth={'150px'} buttonIcon={matchDownXL && <CheckCircleOutline />}
                                />
                            <StyledButton
                                loading={actionLoading}
                                handleClick={() => handleDecline(el?._id)}
                                variant={'danger'}
                                width={matchDownXL ? '60px' : "150px"}
                                label={matchDownXL ? <CancelOutlined /> : t('declineButton')}
                                name={"button"}
                            />
                        </Box>,
                    name:<Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1}} >
                            <Avatar src={`${el?.requester?.avatar}`} alt={'player-avatar-invitation'}/>
                            <Typography sx={{ width: '130px'}}>
                                {el?.requester?.firstName} {el?.requester?.lastName}
                            </Typography>
						</Box>,
                    time:<Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'start', minWidth:'100px'}} >
                            <Typography> {el?.match?.matchStart}</Typography>
                            <Typography> {el?.match?.matchDate} </Typography>
                        </Box>,
                    duration: <Typography sx={{ minWidth: '50px'}}> {el?.match?.duration / 60} hour</Typography>,
                    matchName: <Typography sx={{ maxWidth: '180px'}} noWrap textOverflow={'ellipsis'}> {el?.match?.matchName }</Typography>,
                    fieldName: <Typography sx={{ maxWidth: '180px'}} noWrap textOverflow={'ellipsis'}> {el?.match?.matchField }</Typography>,
                    address: <Typography sx={{ width: matchDownLG ? '200px' : '100%'}} noWrap textOverflow={'ellipsis'}>
                            {el?.match?.address?.city }{' '}{el?.match?.address?.street }{' '}{el?.match?.address?.number }
                        </Typography>
                }
            })
            return myData;
        }
        receivedRequest && workArray().then((res) => setRows(res));
    }, [receivedRequest, navigate, dispatch, handleAccept, handleDecline, actionLoading, t, matchDownXL, matchDownLG ])


    return (
        <>
            { matchDownLG ? 
                <>
                    { receivedLoading ?
                        <Box sx={{ maxWidth: '100%', minHeight: '200px', display: 'flex', flexDirection: 'column', backgroundColor: '#fff', borderRadius: '10px', px: 2}}>
                            <Skeleton sx={{height: '100px'}} />
                            <Skeleton sx={{height: '40px'}}/> <Skeleton sx={{height: '80px'}}/> 
                            <Skeleton sx={{height: '40px'}}/> <Skeleton sx={{height: '40px'}}/> 
                        </Box>
                    :
                        <>
                            { receivedRequest?.length === 0 ? 
                                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '120px', backgroundColor: '#fff', borderRadius: '12px'}}>
                                    <Typography >{t('errorGetRecivedInvitation')}...</Typography>
                                </Box> 
                            :
                                <Box sx={{ width: '100%', display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: matchDownMD && 'center' }}>
                                    { receivedRequest?.map((el, index) => {
                                        return (
                                            <Fragment key={`${el?.match?.matchName }-${index}`} >
                                                <MobileReceivedCard matchAddress={`${el?.match?.address?.city } ${el?.match?.address?.street } ${el?.match?.address?.number }`} 
                                                    matchName={el?.match?.matchName} matchDate={el?.match?.matchDate} matchDuration={el?.match?.duration / 60} 
                                                    matchHours={el?.match?.matchStart} matchField={el?.match?.matchField } requesterAvatar={`${el?.requester?.avatar}`} 
                                                    requesterName={`${el?.requester?.firstName} ${el?.requester?.lastName}`} loading={actionLoading} invitationId={el?._id}/>
                                            </Fragment>
                                        )
                                    })}
                                </Box>
                            }
                        </>
                    }
                </>
            :
                <StyledTable name={'players'} pagination loading={receivedLoading} noContentMessage={t('errorGetRecivedInvitation')} data={{ rows: rows, columns: tableColumns }} tablePaginationSx={{ backgroundColor: '#fff' }} />
            }
        </>
    );
};

export default InvitationReceivedTable;
