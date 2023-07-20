import React, { useState, useEffect, useCallback, Fragment } from "react";
import StyledTable from 'ui-component/table/StyledTable';
import { Box, Button, Tooltip, Typography, useMediaQuery } from "@mui/material";
import StyledButton from "ui-component/button/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { skeletonTable } from "ui-component/loadingSkeleton/skeletonTable/SkeletonTable";
import { getFieldsBySearch } from "store/actions/searchActions";
import { setFieldId } from "store/types/utilsTypes";
import { Add, Info } from "@mui/icons-material";

// translation
import { useTranslation } from 'react-i18next';
import { useTheme } from "@mui/styles";
import MobileAllFieldsCard from "../../fields/fieldsComp/MobileAllFieldsCard";

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

const SearchFields = () => {

    const theme = useTheme();
	const matchDownLG = useMediaQuery(theme.breakpoints.down("lg"));
	const matchDownMD = useMediaQuery(theme.breakpoints.down("md"));
	const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

    const [rows, setRows] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
	const { t } = useTranslation();

    const searchedFields = useSelector((state) => state?.searchState?.searchedFields);
    const loadingField = useSelector((state) => state?.searchState?.loading);

    const handlerRows = loadingField === true ? Array(3).fill(skeletonTable) : rows;
    const searchValue = useSelector((state) => state?.utilsState?.utils?.setSearch);

    const handleRequestFieldId = useCallback((fieldId) => {
        dispatch(setFieldId(fieldId));
        navigate('/create-match')
    }, [dispatch, navigate])

    const handleDetails = useCallback((fieldId) => {
        dispatch(setFieldId(fieldId));
        navigate('/field-page')
    },[dispatch, navigate])

    useEffect(() => {
        if (searchValue === '')
            return navigate('/')
        else
            return dispatch(getFieldsBySearch(searchValue))
    }, [dispatch, searchValue, navigate])

    useEffect(() => {
        async function workArray() {
            const myData = await searchedFields?.map((el) => {
                return {
                    ...el,
                    actions: <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2}} >
                                <StyledButton
                                    handleClick={() => handleRequestFieldId(el?._id)}
                                    width={matchDownLG ? '60px' : "200px"}
                                    label={matchDownLG ? <Add fontSize="small"/> : t('createMatchButton')}
                                    name={"button"}
                                />
                                { !matchDownLG &&
                                    <Tooltip title={t('detailsFieldTooltip')}>
                                        <Button variant='outlined' onClick={()=>handleDetails(el?._id)}> <Info /> </Button>
                                    </Tooltip>
                                }
                            </Box>,
                    time: <Typography sx={{ width: '100px'}}>{el?.schedule?.openHours} - {el?.schedule?.closeHours}</Typography>,
                    address: <Typography sx={{ width: `${matchDownMD? '150px' : '200px'}`, whiteSpace: 'nowrap', overflowX: 'hidden', textOverflow: 'ellipsis'}} 
                                onClick={()=>handleDetails(el?._id)} variant="body1">
                                {el?.location?.address?.city} {el?.location?.address?.street} {el?.location?.address?.number} sdfasdfasdf asdfsadfasdf sadfsadfasfd
                            </Typography>,
                    fieldName: <Typography sx={{ width: `${matchDownMD? '150px' : '200px'}`, whiteSpace: 'nowrap', overflowX: 'hidden', textOverflow: 'ellipsis'}}
                                onClick={()=>handleDetails(el?._id)} variant="body1">
                                    {el?.fieldName} sdfasdfasdf asdfsadfasdf sadfsadfasfd
                                </Typography>
                }
            })
            return myData;
        }
        searchedFields && workArray().then((res) => setRows(res));
    }, [searchedFields, handleRequestFieldId, handleDetails, t, matchDownLG, matchDownMD])


    return (
        <>
            { matchDownSM ? 
                <>
                    <Box sx={{ width: '100%', display: 'flex', flexWrap: 'wrap', pb: 4, justifyContent: 'center', backgroundColor: '#fff' }}>
                        { searchedFields?.length > 0 && searchedFields?.map((el, index)=>{
                            return ( 
                                <Box key={`searched-field-${index}-${el?.fieldName}`} sx={{ width: '100%', borderBottom: '1px solid #DDD', py: 1}}>
                                    < MobileAllFieldsCard fieldName={el?.fieldName} fieldAddress={`${el?.location?.address?.city} ${el?.location?.address?.street} ${el?.location?.address?.number}`}
                                        fieldPhoto={el?.fieldCoverPhoto} fieldType={el?.fieldType} fieldId={el?._id} fieldHours={`${el?.schedule?.openHours} - ${el?.schedule?.closeHours}`} />
                                </Box>
                            )})
                        }
                    </Box>
                </>
            :
                <StyledTable searchTable name={'fields'} loading={loadingField} pagination data={{ rows: handlerRows, columns: tableColumns }} noContentMessage={`${t('errorGetFielsdSearc')}`} />
            }
        </>
    );
};

export default SearchFields;
