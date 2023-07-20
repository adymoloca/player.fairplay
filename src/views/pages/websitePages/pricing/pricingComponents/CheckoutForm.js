import React, { useEffect, useState } from "react";
import { Box, Checkbox, FormControlLabel, Grid, TextField, Typography, useMediaQuery } from "@mui/material";
import { gridSpacing } from "store/constant";
import { useDispatch, useSelector } from "react-redux";
import StyledButton from "ui-component/button/button";
import { addCard } from "store/actions/paymentActions";
import ConfirmPayModal from "./ConfirmPayModal";
import { useCallback } from "react";

// translation
import { useTranslation } from 'react-i18next';
import { useTheme } from "@mui/styles";

const CheckoutForm = () => {

	const theme = useTheme();
	const matchDownMD = useMediaQuery(theme.breakpoints.down("md"));
	const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

	const initialInputs = { cardName: '', cardNumber: '', cardExpMonth: '', cardExpYear: '', cardCVC: '',};
	const [values, setValues] = useState(initialInputs);
	const [ save, setSave ] = useState(false);
	const [ errorCvv, setErrorCvv ] = useState(false);
	const [ errorNumber, setErrorNumber ] = useState(false);
	const [ errorName, setErrorName ] = useState(false);
	const [ errorMonth, setErrorMonth ] = useState(false);
	const [ errorYear, setErrorYear ] = useState(false);
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const loading = useSelector((state) => state?.paymentState?.loading);
	const error = useSelector((state) => state?.paymentState?.error);

    const [open, setOpen] = useState(false);

	const handleOpen = useCallback (()=> {
		!loading && error?.message?.length > 0 && !error?.status && setOpen(true)
	}, [loading, error])

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = {...values, save}
		dispatch(addCard(data));
	};

	const handleDisable = (values) => !values?.cardName || !values?.cardNumber || !values?.cardExpMonth || !values?.cardExpYear || !values?.cardCVC || 
		errorCvv || errorMonth || errorName || errorNumber || errorYear ? true : false
	
	useEffect(() => {
		handleOpen();
	}, [handleOpen])

	return (
		<>
			<form noValidate style={{ display: 'flex', justifyContent: 'center', width:'100%' }}>
				<Grid container spacing={gridSpacing} justifyContent={"center"} alignContent={'center'} maxWidth={'800px'} rowGap={{md: 2, xs: 0}} mx={{md:3, xs:0}} mt={2}>

					{/* ******************************| NAME INPUTS |******************************** */}

					<Grid container item xs={12} justifyContent={"center"} alignContent={'start'} sx={{ p: '0!important', mx: '10px !important'}}>
                        <Typography sx={{ width: '100%', p: 1, color: '#000', fontSize: '16px'}}>{t('nameInput')}</Typography>
                        <TextField sx={{width: '100%'}} type="text" defaultValue={values?.cardName} placeholder={t('nameInput')}
                            onChange={(e)=>{setValues({...values, cardName: e.target.value});
							setErrorName(!Boolean(/^[a-zA-Z ]{3,}$/.test(e.target.value)))}
							} inputProps={{ maxLength: '20' }}
						/>
                        {errorName && <Typography sx={{ width: '100%', p: 1, color: 'red', fontSize: '12px'}}>{t('errorCardName')}</Typography>}
					</Grid>

					{/* ******************************| NUMBER INPUTS |******************************** */}

					<Grid container item sm={12} justifyContent={"center"} alignContent={'start'} sx={{ p: '0!important', mx: '10px !important'}}>
                        <Typography sx={{ width: '100%', p: 1, color: '#000', fontSize: '16px'}}>{t('cardNumberInput')}</Typography>
                        <TextField sx={{width: '100%'}} type="number" defaultValue={values?.cardNumber} onInput = {(e) =>{
                            e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,16)}} placeholder="xxxx xxxx xxxx xxxx" 
                            onChange={(e)=>{setValues({...values, cardNumber: e.target.value});
							setErrorNumber(!Boolean(/^[0-9]{16,16}$/.test(e.target.value)))
						}}
						/>
                        {errorNumber && <Typography sx={{ width: '100%', p: 1, color: 'red', fontSize: '12px'}}>{t('errorCardNumber')}</Typography>}
					</Grid>

					{/* ******************************| DATE INPUTS |******************************** */}

					<Grid container item sm={12} md={6} justifyContent={"start"} alignContent={'start'} columnGap={1} 
						sx={{ p: '0!important', pl: !matchDownMD && '12px !important', mx: matchDownMD && '10px !important', display: 'flex', flexDirection: 'row'}}>
                        <Typography sx={{ width: '100%', p: 1, color: '#000', fontSize: '16px'}}>{t('cardExpDateInput')}</Typography>
						<Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', gap: 1}}>
							<Grid container item xs={6}  sm={3} md={5}  sx={{ pt: '0 !important'}}>
								<TextField  type="text" defaultValue={values?.cardExpMonth} inputProps={{ maxLength: '2'}} 
								onChange={(e)=>{setValues({...values, cardExpMonth: e.target.value});
								setErrorMonth(!Boolean((/^[0-9]{1,}$/.test(e.target.value) && Number(e.target.value) < 13 && Number(e.target.value) > 0 ))) }} placeholder={'MM'}
								/>
                        		{errorMonth && <Typography sx={{ width: '100%', p: 0, color: 'red', fontSize: '12px'}}>{t('errorCardDate')}</Typography>}
							</Grid>
							<Typography sx={{ color: '#969696', fontSize: '40px', width: '10px'}}>/</Typography>
							<Grid  item  xs={6} sm={3} md={5} sx={{ pt: '0 !important'}}>
								<TextField type="text" defaultValue={values?.cardExpYear} inputProps={{ maxLength: '4'}} 
								onChange={(e)=>{setValues({...values, cardExpYear: e.target.value});
								setErrorYear(!Boolean((/^[0-9]{2,4}$/.test(e.target.value) && Number(e.target.value) > 2022))) }} placeholder={'YYYY'}
								/>
                        		{errorYear && <Typography sx={{ width: '100%', p: 0, color: 'red', fontSize: '12px'}}>{t('errorCardDate')}</Typography>}
							</Grid>
						</Box>
					</Grid>

					{/* ******************************| CVV INPUTS |******************************** */}

					<Grid container item sm={12} md={6} justifyContent={"center"} alignContent={'start'} sx={{ p: '0 !important', pr: !matchDownMD && '12px !important', 
						mx: matchDownMD && '10px !important', height: '110px'}}>
                        <Typography sx={{ width: '100%', p: 1, color: '#000', fontSize: '16px'}}>CVV</Typography>
                        <TextField sx={{width: '100%'}} type="text" defaultValue={values?.cardCVC} inputProps={{ maxLength: '3'}} placeholder="CVV" 
                            onChange={(e)=>{setValues({...values, cardCVC: e.target.value});
							setErrorCvv(!Boolean(/^[0-9]{3,3}$/.test(e.target.value)))
						}} 
						/>
                        {errorCvv && <Typography sx={{ width: '100%', p: 1, color: 'red', fontSize: '12px'}}>{t('errorCVV')}</Typography>}
					</Grid>

					<Grid container item sm={12} justifyContent={"start"} sx={{ pt: '0 !important'}}>
						<FormControlLabel
							control={<Checkbox
							checked={save}
							onChange={(event) => setSave(event.target.checked)}
							name="checked"
							color="primary" />}
							label={t('saveCard')} 
						/>
					</Grid>

					{/* **********************FORM BUTTONS******************** */}

					<Grid container item xs={12} sx={{ display: 'flex', justifyContent: matchDownSM ? 'center' : 'start', px: '0 !important'}}>
						<StyledButton
							name={"create-product"}
							label={t('cardButton')}
							loading={loading}
							disabled={handleDisable(values)}
							variant={"primary"}
							handleClick={handleSubmit}
							type={"submit"}
							width={ matchDownSM ? '200px' : "300px"}
						/>
					</Grid>
				</Grid>
			</form>
			<ConfirmPayModal open={open} setOpen={setOpen}/>
		</>
	);
};

export default CheckoutForm;
