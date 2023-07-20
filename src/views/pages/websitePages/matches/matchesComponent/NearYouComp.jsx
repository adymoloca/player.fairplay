import React from "react";
import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import StyledButton from "ui-component/button/button";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useCallback } from "react";
import { cancelJoin, getNearMatches, updateMatch } from "store/actions/matchesActions";
import { useNavigate } from "react-router";
import { setMatchId } from 'store/types/utilsTypes';
import SkeletonCard from "ui-component/loadingSkeleton/skeletonCard/SkeletonCard";
import cover from 'assets/images/ilustrations/cover.png'
import CustomModal from "ui-component/modal/CustomModal";

// translation
import { useTranslation } from 'react-i18next';
import { useTheme } from "@mui/system";
import ErrorPage from "ui-component/error";

const NearYouComp = () => {

	const theme = useTheme();
	const matchDownMD = useMediaQuery(theme.breakpoints.down("md"));

    const customization = useSelector((state) => state.customization);
    const dispatch = useDispatch();
	const navigate = useNavigate();
	const { t } = useTranslation();

	const nearMatches = useSelector((state)=> state?.matchesState?.nearMatches);
	const loadingNear = useSelector((state)=> state?.matchesState?.loadingNear);
	const errorNear = useSelector((state)=> state?.matchesState?.error?.status);

    const handleJoin = useCallback((matchId) => {
		dispatch(setMatchId(matchId));
        dispatch(updateMatch(matchId, nearMatches?.privateMatch, ()=> navigate('/upcoming-match')));
    }, [dispatch, navigate, nearMatches?.privateMatch])

    const handleRequest = useCallback((matchId) => {
        dispatch(updateMatch(matchId, ()=> dispatch(getNearMatches())));
    }, [dispatch])

    const handleDetails = useCallback((matchId) => {
        dispatch(setMatchId(matchId));
        navigate('/upcoming-match')
    }, [dispatch, navigate])

    const handleJoinTeam = useCallback((matchId) => {
        dispatch(setMatchId(matchId));
        navigate('/upcoming-match')
    }, [dispatch, navigate])

    const handleCancel = useCallback((matchId) => {
        dispatch(cancelJoin(matchId, ()=> dispatch(getNearMatches())));
    }, [dispatch])

    const renderBtn = (title, handleClick = () => undefined, loading, disabled, variant) => {
        return <StyledButton
            loading={loading}
			variant={ variant || 'primary'}
            disabled={disabled}
			width={'100%'}
            handleClick={() => handleClick()}
            label={title}
            name={"button"}
        />
    }

    const switchButton = useCallback((joinedeStatus, matchId, privateMatch, duration) => {
        const statusCase = joinedeStatus.join(''); 

        switch (statusCase) {
            case '0':
            return ( <>
                    	{ !privateMatch ? 
                            <CustomModal buttonTitle={t('joinNowButton')} modalTitle={t('joinModalTitle')} 
                            modalContent={<Typography>{duration / 60} {t('joinMessage')}</Typography>}
                            handleSubmit={()=>handleJoin(matchId)} loading={loadingNear}
                            confirmButtonTitle={t('confirmButton')} buttonWidth={'100%'} fullWidth
                            /> : 
                            <CustomModal buttonTitle={t('requestToJoinButton')} modalTitle={t('requestJoinModalTitle')} 
                            modalContent={<Typography>{duration / 60} {t('joinMessage')}</Typography>}
                            handleSubmit={()=>handleRequest(matchId)} loading={loadingNear}
                            confirmButtonTitle={t('confirmButton')} buttonWidth={'100%'} fullWidth
                            />
                        }
                    </>
                );
            case '1':
                return ( <>
							<CustomModal buttonTitle={t('cancelRequestButton')} modalTitle={t('cancelRequestModalTitle')} 
                                modalContent={<Typography>{t('cancelRequestMessage')}</Typography>}
                                handleSubmit={()=>handleCancel(matchId)} loading={loadingNear}
                                confirmButtonTitle={t('confirmButton')} buttonWidth={'100%'} variant={'danger'} fullWidth
                            />
						</>
                );
            case '2':
                return ( <>
							{renderBtn(t('detailsButton'),()=>handleDetails(matchId), loadingNear,false, 'secondary')}
                    	</>
                );
            case '03':
                return ( <>
                            {renderBtn(t('joinATeam'), ()=>handleJoinTeam(matchId), loadingNear, false)}
                        </>
                    );
            case '23':
                return ( <>
                            {renderBtn(t('detailsButton'),()=>handleDetails(matchId), loadingNear,false, 'secondary')}
                        </>
                    );
            default:
                return <Box display={'flex'} justifyContent={'center'}><Typography sx={{ color: '#fff', fontSize: '16px', fontWeight: '500' }}>Error</Typography></Box>

        }
    }, [ loadingNear, handleDetails, handleJoin, handleRequest, handleJoinTeam, handleCancel, t])

	useEffect(() => {
        dispatch(getNearMatches());
	}, [dispatch])

	return (
		<>
			<Box width={'100%'}
				display={"flex"}
				flexWrap={matchDownMD ? 'wrap' : 'nowrap'}
				justifyContent={matchDownMD ? 'center' : 'start'}
				style={{ gap: 20, overflowY: "hidden"}}
			> { loadingNear === true ? <> {<SkeletonCard />}</> : <>
			{nearMatches?.length === 0 ? 
				<Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems:'center', justifyContent: 'center', backgroundColor: '#fff'}}>
					<ErrorPage error={errorNear} cardVariant noContentMessage={t('errorNoMatch')}/> 
				</Box>
			:
				(nearMatches?.map((item, index) => (
					<Grid item xs={12} sm={6}
						key={index}
						sx={{
							display: "flex",
							p: 3,
							mb: 2,
							flexDirection: "column",
							borderRadius: `${customization.borderRadius}px`,
							border: "1px solid",
							width:'100%',
							maxWidth: "300px",
							minWidth: !matchDownMD && '300px',
							minHeight: "300px",
							backgroundColor: "#fff",
							borderColor: (theme) =>
								theme.palette.mode === "dark" ? "grey.800" : "grey.300",
						}}
					>
						<Box
							display={"flex"}
							width={"100%"}
							flexDirection={"row"}
							justifyContent={"space-between"}
						>
							<Box display={"flex"} flexDirection={"column"}>
								<Typography fontSize={"16px"} fontWeight={700} color={'#000'}>
									{item?.matchStart}
								</Typography>
							</Box>
							<Box display={"flex"}>
								<Typography
									fontSize={"16px"}
									fontWeight={400}
									color={'#000'}
								>
									{item?.matchDate}
								</Typography>
							</Box>
						</Box>
						<Box
							display={"flex"}
							width={"100%"}
							alignItems={'center'}
						>
							<Typography noWrap textOverflow={'ellipsis'} fontSize={"16px"} fontWeight={700} color={'#000'} sx={{ my: 1 }}>
								{item?.matchName}
							</Typography>
							
						</Box>
						<Box
							sx={{
								width: "100%",
								display: "flex",
								justifyContent: "center",
								flexDirection: "row",
							}}
						>
							<Box sx={{ width: "100%", borderRadius: "15px", height: "120px", objectFit: "cover" }}
								component={"img"}
								src={item?.matchField?.fieldCoverPhoto.includes('base64') ? item?.matchField?.fieldCoverPhoto : cover }
								alt={'arena-image'}
							/>
						</Box>
						<Typography
							fontSize={"16px"}
							fontWeight={700}
							color='#000'
							marginTop={"5px"}
							noWrap textOverflow={'ellipsis'}
						>
							{item?.matchField?.fieldName}
						</Typography>
						<Box display="flex" alignItems="center">
							<LocationOnIcon
								style={{ fill: "rgba(255, 8, 8, 1)", height: "20px" }}
							/>
							<Typography
								fontSize={"14px"}
								fontWeight={400}
								color={'#000'}
								marginLeft={"5px"}
								marginTop={"5px"}
								noWrap textOverflow={'ellipsis'}
							>
								{item?.matchField?.city}  {item?.matchField?.street} {item?.matchField?.number}
							</Typography>
						</Box>
						<Box alignItems="end" marginTop={"30px"} width={'100%'} display={"flex"} flexDirection={"row"} style={{gap: 10}}>
							{switchButton(item?.joinedStatus, item?._id , item?.privateMatch, item?.duration)} 
						</Box>
						<Box
							display={"flex"}
							justifyContent={"space-between"}
							alignItems="end"
							height={"100%"}
						>
							<Typography
								fontSize={"15px"}
								fontWeight={400}
								color={'#000'}
								marginLeft={"5px"}
								marginTop={"5px"}
							>
								{t('availableSpots')}:
							</Typography>
							<Typography
								fontSize={"15px"}
								fontWeight={400}
								color={'#000'}
								marginLeft={"11px"}
								marginTop={"5px"}
							>
								{item?.spots?.occupiedSpots}/{item?.spots?.allSpots}
							</Typography>
						</Box>
					</Grid>
				)))}</>}
			</Box>
		</>
	);
};
export default NearYouComp;
