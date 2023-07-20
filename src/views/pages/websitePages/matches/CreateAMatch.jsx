import React, { useState, useEffect } from "react";
import { Grid, Box, Typography, Switch, Autocomplete, TextField, useMediaQuery} from "@mui/material";
import MainCard from "ui-component/cards/MainCard";
import StyledButton from "ui-component/button/button";
import StyledOutlinedInput from "ui-component/input/outlinedInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { postCreate } from "store/actions/createMatchActions";
import { clearCreate } from "store/types/createMatchTypes";
import { getMatches } from "store/actions/matchesActions";
import useDebounce from "utils/hooks/useDebounce";
import { getFieldsBySearch } from "store/actions/searchActions";
import { getFields } from 'store/actions/fieldsActions';
import { setFieldId } from 'store/types/utilsTypes';
import MapComp from "ui-component/mapComponent";
import { clearSearchedField } from "store/types/searchTypes";

// translation
import { useTranslation } from 'react-i18next';
import { useTheme } from "@mui/system";
import CardSecondaryAction from "ui-component/cards/CardSecondaryAction";
import { ArrowBackIosNewTwoTone } from "@mui/icons-material";

const matchDifficulty = ["Amateurs", "Pro"];
const numberOfTeams = [2, 3, 4, 5, 6, 7, 8];
const duration = ["60", "120", "180", "240", "300", "360", "420", "480"];
const teamSize = ["6x6", "7x7", "8x8", "9x9"];

const CreateAMatch = () => {

    const theme = useTheme();
    const matchDownMD = useMediaQuery(theme.breakpoints.down("md"));
    const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

	const initialForm = {
		matchName: "",
		privateMatch: false,
		matchDifficulty: matchDifficulty[0],
		teamSize: teamSize[0],
		numberOfTeams: numberOfTeams[0],
		matchStart: "",
		duration: duration[0],
		matchDate: "",
		matchFieldId: ` `,
		matchDescription: "",
	};

	const [inputs, setInputs] = useState(initialForm);
	const [searchInput, setSearchInput] = useState('');
	const searchInputDebounced = useDebounce(searchInput);
	const loadingFields = useSelector(state => state?.searchState?.loading);
	const selectedField = useSelector(state => state?.utilsState?.utils?.fieldId);
	const dispatch = useDispatch();
	const fields = useSelector((state) => state?.searchState?.searchedFields);
	const allFields = useSelector(state => state?.fieldsState?.fields);
	const [searchedFields, setSearchedFields] = useState(fields)
	const navigate = useNavigate();
	const loadingCreate = useSelector(state => state?.createState?.loading);
	const errorCreate = useSelector(state => state?.createState?.error);
    const { t } = useTranslation();

	function sendCreateData() {
		const data = {
			...inputs,
			teamSize: parseInt(inputs?.teamSize),
			numberOfTeams: +inputs?.numberOfTeams,
			duration: +inputs?.duration,
		}
		dispatch(
			postCreate( data ,
				() => {
					setInputs(initialForm);
				}
			)
		);
	}

	const quarterHours = ["00", "15", "30", "45"];

	const matchStart = [];
	for (let i = 0; i < 24; i++) {
		for (let j = 0; j < 4; j++) {
			matchStart.push(("0" + i).slice(-2) + ":" + quarterHours[j]);
		}
	}

	async function workFieldsArray(array){
		const temp = await array?.map((el)=>{
				return {
					label: el.fieldName,
					id: el._id
				}
		});
		return temp;
	}

	const checkFields = () => inputs?.matchName?.length === 0 || inputs?.matchStart?.length === 0 || inputs?.matchDate?.length === 0 || searchInput?.length === 0 ? true : false
	
	useEffect(()=> {
		function handleFieldSelected () {
			workFieldsArray(allFields).then((res)=>setSearchedFields(res))
			setInputs(prev => ({...prev, matchFieldId: selectedField}))
		}

		selectedField?.length ? handleFieldSelected() : fields?.length > 0 ? setSearchedFields(fields)  : setSearchedFields([]);
		// eslint-disable-next-line
	}, [fields, allFields])

	useEffect(() => {
		dispatch(getMatches());
		dispatch(clearSearchedField());
		dispatch(getFields());
		return () => dispatch(clearCreate());
	}, [dispatch]);

	useEffect(()=> {
		searchInputDebounced?.length > 0 && (function(){
				dispatch(setFieldId(''))
				dispatch(getFieldsBySearch(searchInputDebounced))
			}())
	}, [searchInputDebounced, dispatch])

	useEffect(() => {
		workFieldsArray(fields).then((res)=>setSearchedFields(res));
	}, [fields])

	useEffect(() => {
		!loadingCreate && ( !errorCreate?.status && errorCreate?.message?.length > 0) && navigate('/upcoming-match')
	}, [loadingCreate, errorCreate, navigate])

	return (
		<>
			<MainCard
				title={t('createMatchPageTitle')}
				secondary={
					<CardSecondaryAction
						icon={<ArrowBackIosNewTwoTone />}
						title={t('backTooltip')}
						link={"/"}
					/>
				}
				contentSX={{ p: matchDownMD && 0, m: matchDownMD && 0}}
			>
				<Box sx={{
						minHeight: "300px",
						width: "100%",
						display: "flex",
						px: `${matchDownMD ? 0 : '40px'}`,
						pt: 1,
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Grid item container xs={12} md={11} xl={8}
						sx={{ justifySelf: "center", px: matchDownMD ? 2 : 0 }}
					>
						<Grid item xs={12}
							flexDirection={"column"}
							display={"flex"}
						>
							<Typography
								padding={"10px 10px 0 10px"}
								fontSize={"14px"}
								fontWeight={"400"}
								color={"#819099"}
							>
								{t('matchNameInput')}
							</Typography>
							<Box
								flexDirection={"column"}
								display={"flex"}
								width={"100%"}
								justifyContent={"space-between"}
							>
								<StyledOutlinedInput
									values={inputs}
									name={"matchName"}
									setValues={setInputs}
									inputLength={36}
								/>
							</Box>
						</Grid>
						<Grid item xs={12} >
							<Typography padding={"0px 10px"} fontSize={"15px"} fontWeight={"400"}>
								{t('privateMatchInput')}{" "}
								<Switch
									checked={inputs?.privateMatch}
									onChange={(e) =>
										setInputs((prev) => ({
											...prev,
											privateMatch: e?.target?.checked,
										}))
									}
								/>
							</Typography>
							<Typography
								padding={"0 10px 30px 10px"}
								fontSize={"14px"}
								fontWeight={"400"}
								color={"#819099"}
							>
								{t('privateMatchMessage')}
							</Typography>
						</Grid>

						{/* **********************| START OF INPUTS |***************** */}

						<Grid item container xs={12} sx={{ rowGap: 1}} >
							<Grid item xs={12} md={6} >
								<StyledOutlinedInput
									name={"matchDifficulty"}
									select
									onChange={(value) =>
										setInputs((prev) => ({ ...prev, matchDifficulty: value }))
									}
									label={t('matchDifficultyInput')}
									width={{ input: "100%" }}
									options={matchDifficulty}
									defaultValue={inputs["matchDifficulty"]}
								/>
							</Grid>
							<Grid item xs={12} md={6} >
								<StyledOutlinedInput
									name={"teamSize"}
									select
									onChange={(value) =>
										setInputs((prev) => ({ ...prev, teamSize: value }))
									}
									label={t('matchSizeInput')}
									width={{ input: "100%" }}
									options={teamSize}
									defaultValue={inputs["teamSize"]}
								/>
							</Grid>

							<Grid item xs={12} md={6} >
								<StyledOutlinedInput
									name={"numberOfTeams"}
									select
									onChange={(value) =>
										setInputs((prev) => ({ ...prev, numberOfTeams: value }))
									}
									label={t('teamsNumberInput')}
									width={{ input: "100%" }}
									options={numberOfTeams}
									defaultValue={inputs["numberOfTeams"]}
								/>
							</Grid>
							<Grid item xs={12} md={6} >
								<StyledOutlinedInput
									name={"duration"}
									select
									onChange={(value) =>
										setInputs((prev) => ({ ...prev, duration: value }))
									}
									label={t('matchDurationInput')}
									width={{ input: "100%" }}
									options={duration}
									defaultValue={inputs["duration"]}
								/>
							</Grid>

							<Grid item xs={12} md={6} >
								<StyledOutlinedInput
									name={"matchStart"}
									select
									onChange={(value) =>
										setInputs((prev) => ({ ...prev, matchStart: value }))
									}
									label={t('matchTimeInput')}
									width={{ input: "100%" }}
									options={matchStart}
									defaultValue={inputs["matchStart"]}
								/>
							</Grid>
							<Grid item xs={12} md={6} >
								<StyledOutlinedInput
									name={"matchDate"}
									setValues={setInputs}
									type="date"
									width={{ input: "100%" }}
									value={inputs}
									sx={{ marginLeft: "12px", fontSize: "12px" }}
								>
									{t('matchDateInput')}
								</StyledOutlinedInput>
							</Grid>
						</Grid>
						<Box
							component={"div"}
							flexDirection={"column"}
							display={"flex"}
							width={"100%"}
							justifyContent={"space-between"}
							sx={{my: 2}}
						>
							<Autocomplete
								disablePortal
								loading={loadingFields}
								options={searchedFields}
								sx={{ width: "100%" }}
								inputValue={searchInput || ''}	
								onInputChange={(e, newV) =>{ setSearchInput(newV); }}
								value={searchedFields?.find(el=>el?.id === inputs['matchFieldId'])?.label || ``}
								isOptionEqualToValue={(option, value)=> value?.length > 0 ? option?.label === value : ``}
								onChange={(e, newV)=>{setInputs((prev)=>({...prev, matchFieldId: newV?.id}))}}
								renderInput={(params) =>
									(<TextField {...params} label={t('searchFieldInput')} />)}
							/>
						</Box>

						{/* **********************| GOOGLE MAPS API |********************** */}

						<MapComp mapHeight={matchDownSM ? '200px' : '350px'} fieldLat={fields[0]?.location?.coordinates?.lat} fieldLng={fields[0]?.location?.coordinates?.lng} />

						<Grid container item xs={12} justifyContent={"center"} mt={2} >
							<Typography variant="body1" sx={{width: '100%', m:0, p:0}} textAlign={'start'}>{t('descriptionInput')}</Typography>
							<StyledOutlinedInput
								name={"matchDescription"}
								values={inputs}
								setValues={setInputs}
								widthDescription={'100%'}
								inputLength={4096}
								isDescription
							/>
						</Grid>

							<Box display="flex" width={'100%'} flexDirection={ matchDownSM ? 'column' : 'row' } alignItems={'center'} justifyContent={ matchDownSM ? 'center' : "start"} gap={2} >
								<Box >
									<StyledButton
										width={"200px"}
										label={t('cancelButton')}
										name="cancel"
										variant="secondary"
									/>
								</Box>
								<Box>
									<StyledButton
										disabled={checkFields()}
										loading={loadingCreate}
										width={"200px"}
										label={t('createButton')}
										name="create"
										handleClick={sendCreateData}
									/>
								</Box>
						</Box>
					</Grid>
				</Box>
			</MainCard>
		</>
	);
};

export default CreateAMatch;
