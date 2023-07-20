import React, { useState } from "react";
import { Box, Typography, Divider, TextField, Skeleton, useMediaQuery } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Share, LocalPhone, Email } from "@mui/icons-material";
import PropTypes from 'prop-types';
import Modal from "../../../../../ui-component/modal/Modal";
import StyledButton from "ui-component/button/button";
import fieldCover from 'assets/images/ilustrations/cover.png'
import { setFieldId } from "store/types/utilsTypes";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import BenefitsComponent from "./benefitsComponent";

// translation
import { useTranslation } from 'react-i18next';
import { useTheme } from "@mui/styles";
import FieldStatisticsMobile from "./FieldStatisticsMobile";

const FieldHero = (props) => {
	const { loadingField, fieldData } = props;

	const theme = useTheme();
	const matchDownXL = useMediaQuery(theme.breakpoints.down("xl"));
	const matchDownMD = useMediaQuery(theme.breakpoints.down("md"));
	const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { t } = useTranslation();

	const [modalStatus, setModalStatus] = useState({ share: false, emailModal: false, phoneModal: false });
	const modalHandler = (name) => { setModalStatus((prev) => ({ ...prev, [name]: !prev[name] })) }

	const handleRequestFieldId = (fieldId) => {
        dispatch(setFieldId(fieldId));
        navigate('/create-match')
    }

	return (
		<>
			<Box
				width={"100%"}
				sx={{
					backgroundImage: `url(${loadingField ? fieldCover : (fieldData?.fieldCoverPhoto?.includes('base64') ? fieldData?.fieldCoverPhoto : fieldCover)})`,
					backgroundSize: "cover",
					height: matchDownSM ? '180px' : (matchDownMD ? '250px' : "400px"),
					display: "flex",
					borderRadius: matchDownMD ? '10px' : 0,
					flexDirection: 'column',
					justifyContent: 'end',
					mt: 2
				}}
			>
				{ !matchDownMD && <>
					<Box sx={{ display: 'flex', justifyContent: 'end', mb: 2, pr: '100px' }} >
					<StyledButton
						handleClick={() => handleRequestFieldId(fieldData?._id)}
						width={"200px"}
						label={t('createMatchButton')}
						name={"button"}
					/>
					</Box>
					<Box
						sx={{
							backgroundColor: "rgba(0, 0, 0, 0.7)",
							display: 'flex',
							alignItems: 'center',
							width: "100%",
							height: "30%",
						}}
					>
						<Box
							display="flex"
							flexDirection="row"
							justifyContent="space-between"
							height={"100%"}
							width={"100%"}
						>
							<Box
								display="flex"
								flexDirection="column"
								width={"35%"}
								marginTop={"15px"}
								gap={"10px"}
								marginLeft={'50px'}
							>
								{loadingField ? <Skeleton sx={{ bgcolor: '#969696' }} variant="rectangular" width={'300px'} height={'25px'} /> :
									<Box display={'flex'} flexDirection={'row'}>
										<Typography noWrap textOverflow={'ellipsis'} color={"#fff"} textAlign={'center'} fontSize={"20px"} fontWeight={"500"}>
											{fieldData?.fieldName}
										</Typography>
										<Divider orientation="vertical" flexItem sx={{ mx: '20px' }} />
										<Typography color={"#fff"} fontSize={"14px"} display={'flex'} alignItems={'center'}> {fieldData?.fieldType} </Typography>
									</Box>
								}
								{loadingField ? <Skeleton sx={{ bgcolor: '#969696' }} variant="rectangular" width={'130px'} height={'25px'} /> :
									<Box
										width={"400px"}
										display="flex"
										alignItems={'center'}
										flexDirection="row"
										sx={{ m: 0, p: 0 }}
									>
										<AccessTimeIcon style={{ fill: "#37AE0F", marginRight: '10px' }} />
										<Typography
											color={"rgba(55, 174, 15, 1)"}
											fontSize={"16px"}
											fontWeight={"500"}
											textAlign={'center'}
										>
											{fieldData?.schedule?.openHours} - {fieldData?.schedule?.closeHours}
										</Typography>
									</Box>
								}
								{loadingField ? <Skeleton sx={{ bgcolor: '#969696' }} variant="rectangular" width={'350px'} height={'25px'} /> :
									<Box display={'flex'} flexDirection={'row'} >
										<LocationOnIcon style={{ fill: "#fff", height: "20px" }} />
										<Typography noWrap textOverflow={'ellipsis'} color={"#fff"} fontSize={"16px"} fontWeight={"500"}>
											{fieldData?.location?.address?.city}{'  '}{fieldData?.location?.address?.street}{'  '}{fieldData?.location?.address?.number}
										</Typography>
									</Box>
								}
							</Box>
							<Box
								display="flex"
								justifyContent="end"
								alignItems="center"
								marginTop={"20px"}
								marginBottom={"20px"}
								width={'25%'}
							>
								<Share onClick={() => modalHandler('share')} fontSize={'large'} style={{ fill: "#fff", cursor: "pointer", marginRight: '20px' }} />
								<Divider orientation="vertical" flexItem />
								<Box
									width={matchDownMD ? '30%' : '70%'}
									display="flex"
									flexDirection={'column'}
									justifyContent="start"
									alignItems="center"
									marginY={"20px"}
									marginX={'50px'}
								>
									<Box display={'flex'} flexDirection={'row'} alignItems={'center'} width={'100%'} justifyContent={'flex-start'}>
										<LocalPhone style={{ fill: "#fff", marginRight: '15px' }} onClick={() => modalHandler('phoneModal')}/>
										{loadingField  ? <Skeleton sx={{ bgcolor: '#969696' }} variant="rectangular" width={'200px'} height={'20px'} /> :
											!matchDownXL && <Typography noWrap textOverflow={'ellipsis'} color={"#fff"} fontSize={"16px"} fontWeight={"500"}>
												{fieldData?.contacts?.phoneNumber}
											</Typography>
										}
									</Box>
									<Box display={'flex'} flexDirection={'row'} mt={1} alignItems={'center'} width={'100%'} justifyContent={'flex-start'} >
										<Email style={{ fill: "#fff", marginRight: '15px' }} onClick={() => modalHandler('emailModal')}/>
										{loadingField ? <Skeleton sx={{ bgcolor: '#969696' }} variant="rectangular" width={'250px'} height={'20px'} /> :
											!matchDownXL && <Typography noWrap textOverflow={'ellipsis'} color={"#fff"} fontSize={"16px"} fontWeight={"500"}>
												{fieldData?.contacts?.email}
											</Typography>
										}
									</Box>
								</Box>
							</Box>
								<Divider orientation="vertical" sx={{ height: '80px', alignSelf: 'center'}} flexItem />
							<Box
								display="flex"
								flexWrap={'wrap'}
								justifyContent="flex-start"
								alignItems={'center'}
								columnGap={5}
								width={"30%"}
								marginY={'20px'}
							>
								{loadingField ? <Skeleton sx={{ bgcolor: '#969696' }} variant="rectangular" width={'400px'} height={'80px'} /> :
									<BenefitsComponent />
								}
							</Box>
						</Box>
					</Box>
				</>}
			</Box>
			{matchDownMD && 
				<FieldStatisticsMobile fieldId={`${fieldData?._id}`} fieldEmail={`${fieldData?.contacts?.email}`} fieldPhone={`${fieldData?.contacts?.phoneNumber}`}
					fieldName={fieldData?.fieldName} fieldType={fieldData?.fieldType} fieldHours={`${fieldData?.schedule?.openHours} - ${fieldData?.schedule?.closeHours}`}
					fieldAddress={`${fieldData?.location?.address?.city} ${fieldData?.location?.address?.street} ${fieldData?.location?.address?.number}`}
					fieldBenefits={fieldData?.benefits} />
			}
			<Modal open={modalStatus.share} setOpen={() => modalHandler('share', !modalStatus.share)}
				title={t('shareWithFriends')}
				content={
					<>
						<Box display='flex' flexDirection='column' marginY={"20px"}>
							<TextField width={"80%"} label={""} />
						</Box>
						<Box display='flex' flexDirection='row' justifyContent='flex-end' marginY={"20px"}>
							<StyledButton name="copy" label={t('copyButton')} width={"40%"} variant='primary' />
						</Box>
					</>
				} 
			/>
			<Modal open={modalStatus.emailModal} setOpen={() => modalHandler('emailModal', !modalStatus.emailModal)}
				title={t('emailInput')}
				content={
					<>
						<Typography sx={{ width: '300px', my: 4}}>
							{fieldData?.contacts?.email}
						</Typography>
					</>
				} 
			/>
			<Modal open={modalStatus.phoneModal} setOpen={() => modalHandler('phoneModal', !modalStatus.phoneModal)}
				title={t('phoneNumberInput')}
				content={
					<>
						<Typography sx={{ width: '300px', my: 4}}>
							{fieldData?.contacts?.phoneNumber}
						</Typography>
					</>
				} 
			/>
		</>
	);
};

FieldHero.defaultProps = {
	loadingField: false,
	fieldData: {},
}

FieldHero.propTypes = {
	loadingField: PropTypes.bool.isRequired,
	fieldData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
}

export default FieldHero;
