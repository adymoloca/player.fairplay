import React from "react";
import { Box, Tooltip, Typography, useMediaQuery } from "@mui/material";
import StyledButton from "ui-component/button/button";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useDispatch, useSelector } from "react-redux";
import { HistoryToggleOffOutlined, Info, Stadium } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import { useEffect } from "react";
import { getNearFields } from "store/actions/fieldsActions";
import { useNavigate } from "react-router";
import { setFieldId } from "store/types/utilsTypes";
import SkeletonCard from "ui-component/loadingSkeleton/skeletonCard/SkeletonCard";
import cover from 'assets/images/ilustrations/cover.png'

// translation
import { useTranslation } from 'react-i18next';
import ErrorPage from "ui-component/error";

const NearFieldsCard = () => {

	const theme = useTheme();
	const matchDownMD = useMediaQuery(theme.breakpoints.down("md"));
	const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));
    
    const customization = useSelector((state) => state.customization);
    const dispatch = useDispatch();
    const navigate = useNavigate();
	const { t } = useTranslation();

    const nearFields = useSelector((state) => state?.fieldsState?.nearbyFields);
    const loadingNear = useSelector((state) => state?.fieldsState?.loading);
    const errorNear = useSelector((state) => state?.fieldsState?.error?.status);

    const handleRequestFieldId = (fieldId) => {
        dispatch(setFieldId(fieldId));
        navigate('/create-match');
    }

    const handleDetails = (fieldId) => {
        dispatch(setFieldId(fieldId));
        navigate('/field-page')
    }

    useEffect(() => {
        dispatch(getNearFields());
    }, [dispatch])

    return (
        <>
            <Box
                display={"flex"}
				flexWrap={matchDownMD ? 'wrap' : 'nowrap'}
				justifyContent={matchDownMD ? 'center' : 'start'}
                width={'100vw'}
                style={{ gap: 20, overflowY: "hidden", padding: '10px 0px' }}
            >{loadingNear === true ? <>{<SkeletonCard />}</> : <>
                {nearFields?.length === 0 ? (
                    <ErrorPage noContentMessage={t('nearbyFieldsGetError')} error={errorNear}/>) :

                    (nearFields?.map((item, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: "flex",
                                p: 3,
                                flexDirection: "column",
                                borderRadius: `${customization.borderRadius}px`,
                                border: "1px solid",
                                minWidth: matchDownSM ? '100%' : '320px',
                                minHeight: "300px",
                                bgcolor: '#fff',
                                color: (theme) =>
                                    theme.palette.mode === "dark" ? "grey.300" : "grey.800",
                                borderColor: (theme) =>
                                    theme.palette.mode === "dark" ? "grey.800" : "grey.300",
                            }}
                        >
                            <Box
                                display={"flex"}
                                width={"100%"}
                                flexDirection={"column"}
                                justifyContent={"start"}
                            >
                                <Box display={"flex"} flexDirection={"row"} justifyContent={'space-between'} alignItems={'center'}>
                                    <Typography
                                        fontSize={"15px"}
                                        fontWeight={700}
                                        marginLeft={"11px"}
                                        marginTop={"5px"}
                                        width={'auto'}
                                    >
                                        {item?.fieldName}
                                    </Typography>
                                    <Tooltip title={t('detailsFieldTooltip')}>
                                        <Info onClick={() => handleDetails(item?._id)} style={{ width: '25px', height: '25px', cursor: 'pointer' }}/>
                                    </Tooltip>
                                </Box>
                                <Box display='flex' alignItems='center'>
                                    <LocationOnIcon style={{ fill: "rgba(255, 8, 8, 1)", height: "20px" }} />
                                    <Typography
                                        fontSize={"14px"}
                                        fontWeight={400}
                                        color={'#616161'}
                                        marginLeft={"0px"}
                                        marginTop={"5px"}
                                    >
                                        {item?.location?.address?.city} {item?.location?.address?.street} {item?.location?.address?.number}
                                    </Typography>
                                </Box>
                            </Box>
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                marginTop: "10px",
                                justifyContent: "center",
                                flexDirection: "row",
                            }}
                        >
                            <Box component={"img"} src={(item?.fieldCoverPhoto.includes('base64') ? item?.fieldCoverPhoto : cover)} alt={'arena image'} 
                                sx={{ width: "100%", borderRadius: "15px", height: "120px", objectFit: "cover" }} />

                            </Box>
                            <Box display='flex' flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'} mt={1}>
                                <Box display='flex' flexDirection={'row'} alignItems={'center'}>
                                    <Stadium style={{ fill: `${theme.palette.secondary.dark}`, height: "20px", marginRight: 5 }} />
                                    <Typography
                                        fontSize={"15px"}
                                        fontWeight={400}
                                        color={'#616161'}
                                        marginTop={"5px"}
                                    >
                                        {item?.fieldType}
                                    </Typography>
                                </Box>
                                <Box display='flex' flexDirection={'row'} alignItems={'center'}>
                                    <HistoryToggleOffOutlined style={{ fill: `${theme.palette.secondary.dark}`, height: "20px", marginRight: 2 }} />
                                    <Typography variant="body1" fontSize={"16px"} color={'#616161'}>
                                        {item?.schedule?.openHours} - {item?.schedule?.closeHours}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box display={'flex'} justifyContent={'center'} mt={2}>
                                <StyledButton name={"Request"} width={'200px'} handleClick={() => handleRequestFieldId(item?._id)}
                                    label={t('createMatchButton')} />
                            </Box>
                        </Box>
                    )))}</>}
            </Box>
        </>
    );
};
export default NearFieldsCard;
