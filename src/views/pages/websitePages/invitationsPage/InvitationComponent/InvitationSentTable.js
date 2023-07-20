import React, { useState, useEffect, useCallback, Fragment } from "react";
import StyledTable from 'ui-component/table/StyledTable';
import { Avatar, Box, Skeleton, Typography, useMediaQuery } from "@mui/material";
import StyledButton from "ui-component/button/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getSentInvitation, revoqueInvitation } from "store/actions/invitePlayerActions";

// translation
import { useTranslation } from 'react-i18next';
import { UndoOutlined } from "@mui/icons-material";
import { useTheme } from "@mui/styles";
import MobileSentCard from "./MobileCardComponent/MobileSentCard";

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
        key: 'matchName',
        label: 'matchNameLabel',
        width: '20%',
        align: 'left'
    },
    {
        key: 'fieldName',
        label: 'fieldNameLabel',
        width: '25%',
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

const InvitationSentTable = () => {

	const theme = useTheme();
	const matchDownXL = useMediaQuery(theme.breakpoints.down("xl"));
	const matchDownLG = useMediaQuery(theme.breakpoints.down("lg"));
	const matchDownMD = useMediaQuery(theme.breakpoints.down("md"));

    const [rows, setRows] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
	const { t } = useTranslation();

    const sentRequest = useSelector((state) => state?.invitationState?.sentInvitation);
    const sentLoading = useSelector((state) => state?.invitationState?.loadingSent);
    const revoqueLoading = useSelector((state) => state?.invitationState?.loadingRevoque);

    const handleRevoque = useCallback ((matchInvitationId)=>{
        dispatch(revoqueInvitation(matchInvitationId, ()=> dispatch(getSentInvitation())))
    }, [dispatch])

    useEffect(() => {
        dispatch(getSentInvitation())
    }, [dispatch])
    
    useEffect(() => {
        async function workArray() {
            const myData = await sentRequest.map((el) => {
                return {
                    ...el,
                    actions:
                        <Box display={'flex'} flex={'row'} columnGap={2} justifyContent={'start'}>
                            <StyledButton
                                loading={revoqueLoading}
                                handleClick={() => handleRevoque(el?._id)}
                                variant={'danger'}
                                width={matchDownXL ? '60px' : "250px"}
                                label={matchDownXL ? <UndoOutlined /> : t('revokInvitation')}
                                name={"button"}
                            />
                        </Box>,
                    name: <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1}} >
                            <Avatar src={`${el?.receiver?.avatar}`} alt={'player-avatar-invitation'}/>
                            <Typography>
                                {el?.receiver?.firstName} {el?.receiver?.lastName}
                            </Typography>
                        </Box>,
                    time:<Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'start', minWidth: '100px'}} >
                            <Typography> {el?.match?.matchStart} </Typography>
                            <Typography> {el?.match?.matchDate} </Typography>
                        </Box>,
                    matchName: <Typography sx={{ maxWidth: '200px'}} noWrap textOverflow={'ellipsis'}>{el?.match?.matchName}</Typography>,
                    fieldName: <Typography sx={{ maxWidth: '200px'}} noWrap textOverflow={'ellipsis'}> {el?.match?.matchField}</Typography>,
                    address: <Typography sx={{ width: matchDownLG ? '200px' : '100%'}} noWrap textOverflow={'ellipsis'}>
                            {el?.match?.address?.city}  {el?.match?.address?.street}  {el?.match?.address?.number} 
                        </Typography>
                }
            })
            return myData;
        }
        sentRequest && workArray().then((res) => setRows(res));
    }, [sentRequest, navigate, dispatch, handleRevoque, revoqueLoading, t, matchDownXL, matchDownLG ])


    return (
        <>
            { matchDownLG ?
                <> 
                    { sentLoading ?
                        <Box sx={{ maxWidth: '100%', minHeight: '200px', display: 'flex', flexDirection: 'column', backgroundColor: '#fff', borderRadius: '10px', px: 2}}>
                            <Skeleton sx={{height: '100px'}} />
                            <Skeleton sx={{height: '40px'}}/> <Skeleton sx={{height: '80px'}}/> 
                            <Skeleton sx={{height: '40px'}}/> <Skeleton sx={{height: '40px'}}/> 
                        </Box>
                    :
                        <>
                            { sentRequest?.length === 0 ? 
                                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '120px', backgroundColor: '#fff', borderRadius: '12px'}}>
                                    <Typography >{t('errorGetSentInvitation')}...</Typography>
                                </Box> 
                            :
                                <Box sx={{ width: '100%', display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: matchDownMD && 'center' }}>
                                    { sentRequest?.map((el, index) => {
                                        return (
                                            <Fragment key={`sent-invitation-${el?.match?.matchName }-${index}`} >
                                                <MobileSentCard matchAddress={`${el?.match?.address?.city } ${el?.match?.address?.street } ${el?.match?.address?.number }`} 
                                                    matchName={el?.match?.matchName} matchDate={el?.match?.matchDate} matchDuration={el?.match?.duration / 60} 
                                                    matchTime={`${el?.match?.matchStart} - ${el?.match?.duration / 60} h`} matchField={el?.match?.matchField } receiverAvatar={`${el?.receiver?.avatar}`} 
                                                    receiverName={`${el?.receiver?.firstName} ${el?.receiver?.lastName}`} loading={revoqueLoading} invitationId={el?._id}/>
                                            </Fragment>
                                        )
                                    })}
                                </Box>
                            }
                        </>
                    }
                </>
            :
                <StyledTable name={'players'} pagination loading={sentLoading} noContentMessage={t('errorGetSentInvitation')} data={{ rows: rows, columns: tableColumns }} tablePaginationSx={{ backgroundColor: '#fff' }} />
            }
        </>
    );
};

export default InvitationSentTable;
