import React, { useState, useEffect, useCallback, Fragment } from "react";
import StyledTable from 'ui-component/table/StyledTable';
import { Box, Button, CircularProgress, Tooltip, Typography, useMediaQuery } from "@mui/material";
import StyledButton from "ui-component/button/button";
import { useDispatch, useSelector } from "react-redux";
import { getFields } from "store/actions/fieldsActions";
import { useNavigate } from "react-router";
import { setFieldId } from "store/types/utilsTypes";
import { skeletonTable } from "ui-component/loadingSkeleton/skeletonTable/SkeletonTable";
import { Add, Info } from "@mui/icons-material";

// translation
import { useTranslation } from 'react-i18next';
import { useTheme } from "@mui/styles";
import MobileAllFieldsCard from "./MobileAllFieldsCard";
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

const AllFieldsTable = () => {

	const theme = useTheme();
	const matchDownLG = useMediaQuery(theme.breakpoints.down("lg"));
	const matchDownMD = useMediaQuery(theme.breakpoints.down("md"));
	const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

    const [ rows, setRows ] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
	const { t } = useTranslation();

	const allFields = useSelector((state)=> state?.fieldsState?.fields);
	const loadingAll = useSelector((state)=> state?.fieldsState?.loading);
	const errorAll = useSelector((state)=> state?.fieldsState?.error?.status);

    const handlerRows = loadingAll === true ? Array(5).fill(skeletonTable) : rows;
    
    const handleRequestFieldId = useCallback((fieldId) => {
        dispatch(setFieldId(fieldId));
        navigate('/create-match')
    },[dispatch, navigate])

    const handleDetails = useCallback((fieldId) => {
        dispatch(setFieldId(fieldId));
        navigate('/field-page')
    },[dispatch, navigate])

	useEffect(() => {
        dispatch(getFields());;
	}, [dispatch])
	
    useEffect(() =>{
        async function workArray (){
            const myData = await allFields.map((el)=>{
                return {
                    ...el,
                    actions: <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2}} >
                                <StyledButton
                                    handleClick={() => handleRequestFieldId(el?._id)}
                                    width={matchDownLG ? '60px' : "200px"}
                                    label={matchDownLG ? <Add fontSize="small"/> : t('createMatchButton')}
                                    name={"button"}
                                />
                               { !matchDownMD && 
                                    <Tooltip title={t('detailsFieldTooltip')}>
                                        <Button variant='outlined' onClick={()=>handleDetails(el?._id)}> <Info /> </Button>
                                    </Tooltip>
                                }
                            </Box>,
                    time: <Typography sx={{ width: '100px'}}>{el?.schedule?.openHours} - {el?.schedule?.closeHours}</Typography>,
                    address: <Typography sx={{ width: `${matchDownMD? '150px' : '200px'}`, whiteSpace: 'nowrap', overflowX: 'hidden', textOverflow: 'ellipsis'}}
                                onClick={()=>handleDetails(el?._id)} variant="body1">
                            {el?.location?.address?.city} {el?.location?.address?.street} {el?.location?.address?.number}
                        </Typography>,
                    fieldName: <Typography sx={{ width: `${matchDownMD? '150px' : '200px'}`, whiteSpace: 'nowrap', overflowX: 'hidden', textOverflow: 'ellipsis'}} 
                                    onClick={()=>handleDetails(el?._id)} variant="body1">
                                {el?.fieldName}
                            </Typography>
                }
            })
            return myData;
        }
        allFields && workArray().then((res)=>setRows(res));
    }, [allFields, navigate, handleRequestFieldId, handleDetails, t, matchDownMD, matchDownLG])


    return (
        <>
            { matchDownSM ? 
                <>
                    { loadingAll ? 
                        <Box sx={{ width: '100%', minHeight: '300px', display: 'flex', justifyContent :'center', alignItems: 'center', backgroundColor: '#fff'}}>
                            <CircularProgress sx={{ alignSelf: 'center', justifySelf: 'center'}} /> 
                        </Box>
                    : 
                        <>
                            { allFields?.length === 0  ?
                                <Box sx={{ width: '100%', height: '100%'}} >
                                    <ErrorPage error={errorAll} /> 
                                </Box>
                            :
                                <>
                                    { allFields?.map((el, index)=>{
                                        return ( 
                                            <Fragment key={`${index}-${el?.fieldName}`} >
                                                < MobileAllFieldsCard fieldName={el?.fieldName} fieldAddress={`${el?.location?.address?.city} ${el?.location?.address?.street} ${el?.location?.address?.number}`}
                                                    fieldPhoto={el?.fieldCoverPhoto} fieldType={el?.fieldType} fieldId={el?._id} fieldHours={`${el?.schedule?.openHours} - ${el?.schedule?.closeHours}`} />
                                            </Fragment>
                                        )})
                                    }
                                </>
                            }
                        </>
                    }
                </>
            :
                <StyledTable name={'Fields'} pagination loading={loadingAll} data={{ rows: handlerRows, columns: tableColumns }} noContentMessage={t('errorNoFields')}/>
            }
        </>
    );
};

export default AllFieldsTable;
