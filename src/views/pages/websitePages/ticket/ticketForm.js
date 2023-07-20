import React, { useEffect } from "react";
import {  Grid, Typography, useMediaQuery } from "@mui/material";
import StyledOutlinedInput from "ui-component/input/outlinedInput";
import { gridSpacing } from "store/constant";
import { useDispatch, useSelector } from "react-redux";
// import { clearError } from "store/types/membersTypes";
import StyledButton from "ui-component/button/button";
import { useState } from "react";
import { addTicket } from "store/actions/ticketActions";

// translation
import { useTranslation } from 'react-i18next';
import { useTheme } from "@mui/styles";

const PlayerProfileEditForm = () => {
    const { t } = useTranslation();

	const theme = useTheme();
	const matchDownMD = useMediaQuery(theme.breakpoints.down("md"));
	const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

    const initialInputs = {ticketPriority: 0, ticketReason: ' ', ticketDescription: ' ' }
	const [ values, setValues ] = useState(initialInputs);
	const dispatch = useDispatch();
	const loading = useSelector((state) => state?.ticketState?.loading);
	const error = useSelector((state) => state?.ticketState?.error);

	// ******************************| OPTIONS |********************************** //

	const priorityOption = ['Urgent','High','Medium','Low'];

	//   const navigate = useNavigate();

	const handleCancel = (e) => {
		e.preventDefault();
		setValues(initialInputs);
	};

	const handleSubmit = (e) => {
		const data = {...values, ticketPriority: (values?.ticketPriority - 1)}
		e.preventDefault();
		dispatch(addTicket(data));
	};

	const isDisabled = () => {
		if ( values.ticketDescription.length < 10 || values?.ticketReason?.length > 100 || values?.ticketReason?.length < 5 || values.ticketDescription.length > 4095 || values?.ticketPriority === 0 )
            return true;
        else
            return false;
	};

	useEffect(() => {
		if(error?.message?.length > 0 && error?.status === false)
			return setValues(initialInputs)
        // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [error])
	
	return (
		<>
			<form noValidate style={{ display: 'flex', justifyContent: 'center', alignItems: 'start', width: '100%', maxWidth: '1400px' }}>
				<Grid item xs={12} container spacing={matchDownMD ? 1 : gridSpacing} mx={matchDownMD? 0 : 3}>

					{/* ******************************| INPUTS |******************************** */}

					<Grid container item xs={12} md={6} justifyContent={"center"}>
						<StyledOutlinedInput
							name={"ticketReason"}
                            values={values}
							setValues={setValues}
							label={t('reasonInput')}
							width={({ input: '100%' })}
							inputLength={62}
						/>
					</Grid>
					<Grid container item xs={12} md={6} justifyContent={"center"}>
						<StyledOutlinedInput
							name={"ticketPriority"}
							values={values}
							setValues={setValues}
							label={t('priorityInput')}
							width={({ input: '100%' })}
							select
							selectObject
							options={priorityOption}
						/>
					</Grid>
                    <Grid container item xs={12} justifyContent={"center"}>
                        <Typography variant="body1" sx={{width: '100%', m:0, p:0}} textAlign={'start'}>{t('descriptionInput')}</Typography>
						<StyledOutlinedInput
							name={"ticketDescription"}
							values={values}
							setValues={setValues}
							widthDescription={'100%'}
							inputLength={4096}
							isDescription
						/>
					</Grid>
					{/* **********************FORM BUTTONS******************** */}
					<Grid
						container
						item
						xs={12}
						marginTop={2}
						justifyContent={matchDownSM ? 'center' : "end"}
						gap={2}
					>
						<StyledButton
							name={"reset-user"}
							label={t('cancelButton')}
							disabled={isDisabled()} 
							loading={loading}
							variant={"secondary"}
							handleClick={handleCancel}
							type={"submit"}
							width={matchDownSM ? '100%' : "150px"}
						/>
						<StyledButton
							name={"send"}
							label={t('sendButton')}
							disabled={isDisabled()} 
							loading={loading}
							variant={"primary"}
							handleClick={handleSubmit}
							type={"submit"}
							width={matchDownSM ? '100%' : "150px"}
						/>
					</Grid>
				</Grid>
			</form>
		</>
	);
};

export default PlayerProfileEditForm;
