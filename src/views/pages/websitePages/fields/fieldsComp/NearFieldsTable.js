import React, { useState, useEffect, useCallback } from "react";
import StyledTable from 'ui-component/table/StyledTable';
import { Box, Button, CircularProgress, Tooltip, Typography, useMediaQuery } from "@mui/material";
import StyledButton from "ui-component/button/button";
import { useDispatch, useSelector } from "react-redux";
import { getNearFields } from "store/actions/fieldsActions";
import { useNavigate } from "react-router";
import { setFieldId } from "store/types/utilsTypes";
import { AccessTime, Info, LocationOn, Stadium } from "@mui/icons-material";
import fieldCover from 'assets/images/ilustrations/cover.png'

// translation
import { useTranslation } from 'react-i18next';
import { useTheme } from "@mui/styles";
import ErrorPage from "ui-component/error";

const tableColumns = [
    {
        key: 'time',
        label: 'PROGRAM',
        width: '15%',
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
        width: '25%',
        align: 'left'
    },
    {
        key: 'fieldType',
        label: 'fieldTypeLabel',
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

const NearFieldsTable = () => {

	const theme = useTheme();
	const matchDownMD = useMediaQuery(theme.breakpoints.down("md"));
	const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

    const [ rows, setRows ] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
	const { t } = useTranslation();
    
	const nearFields = useSelector((state)=> state?.fieldsState?.nearbyFields);
    const loadingNear = useSelector((state)=> state?.fieldsState?.loading);
    const errorNear = useSelector((state)=> state?.fieldsState?.error?.status);
    
	useEffect(() => {
        dispatch(getNearFields());;
	}, [dispatch])
	
    const handleRequestFieldId = useCallback((fieldId) => {
        dispatch(setFieldId(fieldId));
        navigate('/create-match')
    },[dispatch, navigate])

    const handleDetails = useCallback((fieldId) => {
        dispatch(setFieldId(fieldId));
        navigate('/field-page')
    },[dispatch, navigate])
    
    useEffect(() =>{
        async function workArray (){
            const myData = await nearFields.map((el)=>{
                return {
                    ...el,
                    actions: <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2}} >
                                <StyledButton
                                    handleClick={() => handleRequestFieldId(el?._id)}
                                    width={"200px"}
                                    label={t('createMatchButton')}
                                    name={"button"}
                                />
                                { !matchDownMD && 
                                    <Tooltip title={t('detailsFieldTooltip')}>
                                        <Button variant='outlined' onClick={()=>handleDetails(el?._id)}> <Info /> </Button>
                                    </Tooltip>
                                }
                            </Box>,
                    time: <Typography>{el?.schedule?.openHours} - {el?.schedule?.closeHours}</Typography>,
                    address: <Typography sx={{ width: '100%', whiteSpace: 'nowrap', overflowX: 'hidden', textOverflow: 'ellipsis'}} 
                                onClick={()=>handleDetails(el?._id)} variant="body1">
                            {el?.location?.address?.city} {el?.location?.address?.street} {el?.location?.address?.number}
                        </Typography>,
                    fieldName: <Typography sx={{ width: '100%', whiteSpace: 'nowrap', overflowX: 'hidden', textOverflow: 'ellipsis'}} 
                                onClick={()=>handleDetails(el?._id)} variant="body1">
                                {el?.fieldName}
                            </Typography>
                }
            })
            return myData;
        }
        workArray().then((res)=>setRows(res))
    }, [nearFields, navigate, handleRequestFieldId, handleDetails, t, matchDownMD])


    return (
        <>
            { matchDownSM ? 
                <>
                    { loadingNear ? 
                        <Box sx={{ width: '100%', minHeight: '300px', display: 'flex', justifyContent :'center', alignItems: 'center', backgroundColor: '#fff'}}>
                            <CircularProgress sx={{ alignSelf: 'center', justifySelf: 'center'}} /> 
                        </Box>
                    : 
                        <>{ nearFields?.length === 0  ?
                            <Box sx={{ width: '100%', height: '100%'}} >
                                <ErrorPage error={errorNear} /> 
                            </Box>
                        :
                        <>
                            {nearFields?.map((el, index)=>{
                                return (
                                    <Box key={`${index}-${el?.fieldName}`} sx={{minWidth: '260px', width: '100%', height: '100px',backgroundColor: '#fff', borderRadius: '10px', display: 'flex', 
                                        p: '10px', flexDirection: 'row', alignItems: 'center'}} onClick={()=>handleDetails(el?._id)}>
                                        <Box component={'img'} sx={{width: '30%', height: '80px', objectFit: 'cover', position: 'center', borderRadius: '10px'}} 
                                            src={el?.fieldCoverPhoto?.length>50 ? el?.fieldCoverPhoto : fieldCover} alt='field-photo' 
                                        />
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px', pl:1, width: '70%' }}>
                                            <Typography sx={{ fontSize: '16px', color: '#000'}} noWrap textOverflow={'ellipsis'}>{el?.fieldName}</Typography>
                                            <Box sx={{display: 'flex', flexDirection: 'row', width:'100%', justifyContent:'space-between'}}>
                                                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '3px'}}>
                                                    <Stadium style={{ fontSize:'16px', color: `${theme.palette.secondary.dark}`}} />
                                                    <Typography noWrap maxWidth={'100px'} sx={{fontSize:'16px', color: `${theme.palette.secondary.dark}`}}>{el?.fieldType}</Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '3px', mr:1}}>
                                                    <AccessTime style={{ fontSize:'16px', color: `${theme.palette.secondary.dark}`}} />
                                                    <Typography noWrap maxWidth={'100px'} sx={{fontSize:'16px', color: `${theme.palette.secondary.dark}`}}>
                                                        {el?.schedule?.openHours}-{el?.schedule?.closeHours}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                                                <LocationOn style={{ fontSize:'16px', color: 'red'}} />
                                                <Typography noWrap textOverflow={'ellipsis'}>
                                                    {el?.location?.address?.city} {el?.location?.address?.street} {el?.location?.address?.number}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box> 
                                )})
                            }</>
                        }</>
                    }
                </>
                :
                <StyledTable name={'Fields'} noContentMessage={t('nearbyFieldsGetError')} pagination loading={loadingNear} data={{ rows: rows, columns: tableColumns }} />
            }
        </>
    );
};

export default NearFieldsTable;