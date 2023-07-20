import React, { useEffect } from "react";
import {  Grid, Typography, useMediaQuery } from "@mui/material";
import StyledOutlinedInput from "ui-component/input/outlinedInput";
import { useDispatch, useSelector } from "react-redux";
import StyledButton from "ui-component/button/button";
import PhotoInput from "ui-component/button/photoInput";
import { updatePlayer } from "store/actions/userActions";
import { useNavigate } from "react-router";

// translation
import { useTranslation } from 'react-i18next';
import { useTheme } from "@mui/styles";

const PlayerProfileEditForm = (props) => {

    const theme = useTheme();
	const matchDownMD = useMediaQuery(theme.breakpoints.down("md"));
	const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

	const { values, setValues } = props;
	const dispatch = useDispatch();
	const navigate = useNavigate();
    const { t } = useTranslation();

	const loading = useSelector((state) => state?.playerState?.loading);
	const error = useSelector((state) => state?.playerState?.error);
	const playerRed = useSelector((state) => state?.playerState?.player);

	// ******************************| OPTIONS |********************************** //

	const countryOption = ['Romania', 'USA', 'Mexic', 'Italy', 'Germany'];
	const cityOption = ['Baia Mare', 'Cluj-Napoca', 'Bistrita', 'Nasaud', 'Bucuresti', 'Rodna'];
	const heightOption = ['1.5 m', '1.6 m', '1.7 m', '1.8 m', '1.9 m'];
	const weightOption = ['55 kg', '60 kg', '65 kg', '70kg', '75 kg'];
	const positionOption = ['Defender', 'GoalKeeper', 'Midfielder', 'Striker'];
	const footOption = ['Right', 'Left'];

	const handleCancel = (e) => {
		e.preventDefault();
		setValues(playerRed);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(updatePlayer(values)); 
	};
	const city = (values?.city ? values?.city : values?.location?.address?.city);
	const country = (values?.country ? values?.country : values?.location?.address?.country);

	const isDisabled = (values) => {
		if( !values?.avatar || !values?.coverPicture || !country || !city || !values?.height || !values?.weight || !values?.position || !values?.foot ||
			!values?.firstName || !values?.lastName || !values?.birthDate || !values?.phoneNumber || !values?.email ||
			( values?.avatar === playerRed?.avatar && values?.coverPicture === playerRed?.coverPicture && values?.height === playerRed?.height && values?.weight === playerRed?.weight &&
				values?.position === playerRed?.position && values?.firstName === playerRed?.firstName && values?.lastName === playerRed?.lastName && values?.email === playerRed?.email &&
				values?.playerDescription === playerRed?.playerDescription &&values?.birthDate === playerRed?.birthDate && values?.phoneNumber === playerRed?.phoneNumber && values?.foot === playerRed?.foot
				&& city === playerRed?.location?.address?.city && country === playerRed?.location?.address?.country
			)) 
			return true;
		else 
			return false;
	};

	useEffect(() => {
		!loading && error?.message?.length > 0 && !error?.status && navigate('/player-profile')
	}, [ loading, error, navigate ])
	
	return (
		<>
			<form noValidate style={{ display: 'flex', justifyContent: 'center' }}>
				<Grid container item sx={{ rowGap: matchDownMD && 2 }} justifyContent={"center"} maxWidth={'1200px'} mx={matchDownSM? 1 : 3}>
					<Grid container item xs={12} sm={6} marginTop={3} alignItems={'center'} gap={matchDownMD ? 1 : 3} justifyContent={'center'} flexDirection={matchDownMD ? 'column-reverse' : 'row'}>
						<PhotoInput
							isAvatar
							radius={'50%'}
							title={t('profilePicture')}
							name={`avatar`}
							photo={values["avatar"]}
							setPhoto={(photo) => setValues({ ...values, avatar: photo })}
						/>
					</Grid>
					<Grid container item xs={12} sm={6} marginTop={matchDownMD ? 1 : 3} alignItems={'center'} gap={matchDownMD ? 1 : 3} justifyContent={'center'} flexDirection={matchDownMD ? 'column-reverse' : 'row'}>
						<PhotoInput
							radius={'10px'}
							title={t('coverPicture')}
							name={`coverPicture`}
							photo={values["coverPicture"]}
							setPhoto={(photo) => setValues({ ...values, coverPicture: photo })}
						/>
					</Grid>

					{/* ******************************| NAME INPUTS |******************************** */}

					<Grid container item xs={12} md={6} p={matchDownMD ? 0 : 1}>
						<StyledOutlinedInput
							name={"firstName"}
							defaultValue={values?.firstName}
							setValues={setValues}
							label={t('firstNameInput')}
							width={({ input: '100%' })}
						/>
					</Grid>
					<Grid container item xs={12} md={6}  p={matchDownMD ? 0 : 1}>
						<StyledOutlinedInput
							name={"lastName"}
							defaultValue={values?.lastName}
							setValues={setValues}
							label={t('lastNameInput')}
							width={{ input: '100%' }}
						/>
					</Grid>

					{/* ******************************| DATE AND PHONE INPUTS |******************************** */}

					<Grid container item xs={12} md={6} p={matchDownMD ? 0 : 1}>
						<StyledOutlinedInput
							name={"birthDate"}
							type={"date"}
							defaultValue={values?.birthDate}
							setValues={setValues}
							label={t('birthDateInput')}
							width={{ input: '100%' }}
						/>
					</Grid>
					<Grid container item xs={12} md={6} p={matchDownMD ? 0 : 1}>
						<StyledOutlinedInput
							name={"phoneNumber"}
							defaultValue={values?.phoneNumber}
							setValues={setValues}
							label={t('phoneNumberInput')}
							width={{ input: '100%' }}
						/>
					</Grid>

					{/* ******************************| EMAIL INPUT |******************************** */}

					<Grid container item xs={12} p={matchDownMD ? 0 : 1}>
						<StyledOutlinedInput
							name={"email"}
							defaultValue={values?.email}
							setValues={setValues}
							label={t('emailInput')}
							width={{ input: '100%' }}
						/>
					</Grid>

					{/* ******************************| SELECT ADDRESS INPUTS |******************************** */}

					<Grid container item xs={12} md={6} p={matchDownMD ? 0 : 1}>
						<StyledOutlinedInput
							name={"country"}
							defaultValue={country }
							onChange={(value)=>setValues((prev)=>({...prev, country : value}))}
							label={t('countryInput')}
							width={({ input: '100%' })}
							select
							options={countryOption}
						/>
					</Grid>
					<Grid container item xs={12} md={6} p={matchDownMD ? 0 : 1}>
						<StyledOutlinedInput
							name={"city"}
							defaultValue={city }
							onChange={(value)=>setValues((prev)=>({...prev, city: value}))}
							label={t('cityInput')}
							width={({ input: '100%' })}
							select
							options={cityOption}
						/>
					</Grid>

					{/* ******************************| BODY INPUTS |******************************** */}

					<Grid container item xs={12} md={6} p={matchDownMD ? 0 : 1}>
						<StyledOutlinedInput
							name={"height"}
							defaultValue={(values?.height)}
							onChange={(value)=>setValues((prev)=>({...prev, height: value}))}
							label={t('heightInput')}
							width={({ input: '100%' })}
							select
							options={heightOption}
						/>
					</Grid>
					<Grid container item xs={12} md={6} p={matchDownMD ? 0 : 1}>
						<StyledOutlinedInput
							name={"weight"}
							defaultValue={values?.weight}
							onChange={(value)=>setValues((prev)=>({...prev, weight: value}))}
							label={t('weightInput')}
							width={({ input: '100%' })}
							select
							options={weightOption}
						/>
					</Grid>

					{/* ******************************| SKILLS INPUTS |******************************** */}

					<Grid container item xs={12} md={6} p={matchDownMD ? 0 : 1}>
						<StyledOutlinedInput
							name={"position"}
							values={values}
							setValues={setValues}
							label={t('positionInput')}
							width={({ input: '100%' })}
							multipleSelect
							options={positionOption}
						/>
					</Grid>
					<Grid container item xs={12} md={6} p={matchDownMD ? 0 : 1}>
						<StyledOutlinedInput
							name={"foot"}
							values={values}
							setValues={setValues}
							label={t('footInput')}
							width={({ input: '100%' })}
							multipleSelect
							options={footOption}
						/>
					</Grid>

					{/* **********************DESCRIPTION INPUT******************** */}

					<Grid container item xs={12} sm={12} p={matchDownMD ? 0 : 1}>
                        <Typography variant="body1" sx={{width: '100%', m:0, p:0}} textAlign={'start'}>{t('descriptionInput')}</Typography>
						<StyledOutlinedInput
							name={"	playerDescription"}
							defaultValue={values?.playerDescription}
							onChange={(value)=>setValues((prev)=>({...prev, playerDescription: value}))}
							widthDescription={'100%'}
							isDescription
							inputLength={1500}
						/>
					</Grid>
					{/* **********************FORM BUTTONS******************** */}
					<Grid
						container
						item
						xs={12}
						marginTop={2}
						justifyContent={"end"}
						gap={2}
					>
						<StyledButton
							name={"reset-user"}
							label={t('cancelButton')}
							loading={loading}
							variant={"secondary"}
							handleClick={handleCancel}
							type={"submit"}
							width={"150px"}
						/>
						<StyledButton
							name={"update"}
							label={"Update"}
							disabled={isDisabled(values)} 
							loading={loading}
							variant={"primary"}
							handleClick={handleSubmit}
							type={"submit"}
							width={"150px"}
						/>
					</Grid>
				</Grid>
			</form>
		</>
	);
};

export default PlayerProfileEditForm;