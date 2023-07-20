import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
    Box,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
} from "@mui/material";

// third party
import * as Yup from "yup";
import { Formik } from "formik";

// project imports
import useScriptRef from "utils/hooks/useScriptRef";
import { strengthColor, strengthIndicator } from "utils/password-strength";

// assets
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { register } from "store/actions/userActions";
import StyledButton from "ui-component/button/button";

// translation
import { useTranslation } from 'react-i18next';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const FirebaseRegister = ({ ...others }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const playerMessage = useSelector((state) => state?.playerState?.error);
    const loading = useSelector((state) => state?.playerState?.loading);

    const [showPassword, setShowPassword] = useState(false);

    const [checked, setChecked] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();
	const { t } = useTranslation();

    const [strength, setStrength] = useState(0);
    const [level, setLevel] = useState();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const submitAction = async ( values, { setErrors, setStatus, setSubmitting } ) => {
        const standardUsername = values?.username.toLowerCase().replaceAll(' ','');
        const standardEmail = values?.email.toLowerCase().replaceAll(' ','');
        const data = {...values, username: standardUsername, email: standardEmail}
        try {
            dispatch(register(data));
            if (scriptedRef.current) {
                setStatus({ success: true });
                setSubmitting(false);
            }
        } catch (err) {
            console.error(err);
            if (scriptedRef.current) {
                setStatus({ success: false });
                setErrors({ submit: err.message });
                setSubmitting(false);
            }
        }
    };

    useEffect(() => {
        if (playerMessage?.message && !playerMessage?.status)
           navigate('/activate');
    }, [navigate, playerMessage, dispatch])

    // handle visibility confirm password
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    const isDisabled = (errors)=> {
        if( errors?.firstName || errors?.lastName || errors?.username || errors?.birthDate || errors?.email || errors?.password || errors?.confirmPassword )
            return true;
        else 
            return false;
    }
    useEffect(() => {
        changePassword("123456");
    }, []);

    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12}>
                    <Box sx={{ alignItems: "center", display: "flex" }}>
                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                    </Box>
                </Grid>
            </Grid>

            <Formik
                initialValues={{
                    email: "",
                    password: "",
                    confirmPassword: "",
                    firstName: "",
                    lastName: "",
                    username: "",
                    birthDate: "",
                    phoneNumber: "",
                    submit: null,
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email(`${t('errorValidationEmail')}`)
                        .max(255)
                        .required(`${t('errorReqEmail')}`),
                    password: Yup.string().required(`${t('errorReqPassword')}`)
                        .matches( /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, `${t('errorPasswordValidation')}`),
                    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], `${t('errorConfirmPassword')}`).required(`${t('errorReqConfirmPassword')}`),
                    firstName: Yup.string().required(`${t('errorReqFirstName')}`),
                    lastName: Yup.string().required(`${t('errorReqLastName')}`),
                    username: Yup.string().required(`${t('errorReqUserName')}`),
                    birthDate: Yup.string().required(`${t('errorReqBirthDate')}`),
                    phoneNumber: Yup.string()
                        .matches(/[0-9]/,`${t('errorValidationPhoneNumberNumbers')}`)
                        .min(9, `${t('errorValidationPhoneNumber')}`)
                        .required(`${t('errorReqPhoneNumber')}`),
                })}
                onSubmit={submitAction}
            >
                {({
                    errors,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                    touched,
                    values,
                }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <Grid container columnSpacing={1}>
                            <Grid item xs={12} sm={6}>
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.firstName && errors.firstName)}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <InputLabel htmlFor="outlined-adornment-firstName-register">
                                        {t('firstNameInput')}
                                    </InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-firstName-register"
                                        type="text"
                                        value={values.firstName}
                                        name="firstName"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        inputProps={{}}
                                    />
                                    {touched.firstName && errors.firstName && (
                                        <FormHelperText
                                            error
                                            id="standard-weight-helper-text-firstName-register"
                                        >
                                            {errors.firstName}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.lastName && errors.lastName)}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <InputLabel htmlFor="outlined-adornment-lastName-register">
                                        {t('lastNameInput')}
                                    </InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-lastName-register"
                                        type="text"
                                        value={values.lastName}
                                        name="lastName"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        inputProps={{}}
                                    />
                                    {touched.lastName && errors.lastName && (
                                        <FormHelperText
                                            error
                                            id="standard-weight-helper-text-lastName-register"
                                        >
                                            {errors.lastName}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.username && errors.username)}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <InputLabel htmlFor="outlined-adornment-username-register">
                                        {t('userNameInput')}
                                    </InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-username-register"
                                        type="text"
                                        value={values.username}
                                        name="username"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        inputProps={{}}
                                    />
                                    {touched.username && errors.username && (
                                        <FormHelperText
                                            error
                                            id="standard-weight-helper-text-username-register"
                                        >
                                            {errors.username}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.birthDate && errors.birthDate)}
                                    sx={{ ...theme.typography.customInputDate }}
                                >
                                    <InputLabel htmlFor="outlined-adornment-birthDate-register">
                                        {t('birthDateInput')}
                                    </InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-birthDate-register"
                                        type="date"
                                        value={values.birthDate}
                                        name="birthDate"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        inputProps={{}}
                                    />
                                    {touched.birthDate && errors.birthDate && (
                                        <FormHelperText
                                            error
                                            id="standard-weight-helper-text-birthDate-register"
                                        >
                                            {errors.birthDate}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                        </Grid>
                        <FormControl
                            fullWidth
                            error={Boolean(touched.email && errors.email)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-email-register">
                                {t('emailInput')}
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-register"
                                type="email"
                                value={values.email}
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.email && errors.email && (
                                <FormHelperText
                                    error
                                    id="standard-weight-helper-text-email-register"
                                >
                                    {errors.email}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password-register">
                                {t('passwordInput')}
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-register"
                                type={showPassword ? "text" : "password"}
                                value={values.password}
                                name="password"
                                label="Password"
                                onBlur={handleBlur}
                                onChange={(e) => {
                                    handleChange(e);
                                    changePassword(e.target.value);
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                inputProps={{}}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText
                                    error
                                    id="standard-weight-helper-text-password-register"
                                >
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </FormControl>
                        {strength !== 0 && (
                            <FormControl fullWidth>
                                <Box sx={{ mb: 2 }}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <Box
                                                style={{ backgroundColor: level?.color }}
                                                sx={{ width: 85, height: 8, borderRadius: "7px" }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="body1" fontWeight={'600'} fontSize="0.85rem">
                                                {level?.label}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </FormControl>
                        )}
                        <FormControl
                            fullWidth
                            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-confirmPassword-confirm">{t('confirmPasswordInput')}</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-confirmPassword-confirm"
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={values.confirmPassword}
                                name="confirmPassword"
                                onBlur={handleBlur}
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                                endAdornment={<InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle confirmPassword visibility"
                                        onClick={handleClickShowConfirmPassword}
                                        edge="end"
                                        size="large"
                                    >
                                        {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>}
                                label={t('confirmPasswordInput')}
                                inputProps={{}} />
                            {touched.confirmPassword && errors.confirmPassword && (
                                <FormHelperText error id="standard-weight-helper-text-confirmPassword-confirm">
                                    {errors.confirmPassword}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl
                            fullWidth
                            error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-phoneNumber-register">
                                {t('phoneNumberInput')}
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-phoneNumber-register"
                                type="text"
                                value={values.phoneNumber}
                                name="phoneNumber"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.phoneNumber && errors.phoneNumber && (
                                <FormHelperText
                                    error
                                    id="standard-weight-helper-text-phoneNumber-register"
                                >
                                    {errors.phoneNumber}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <Grid container alignItems="start" justifyContent="start" >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={checked}
                                            onChange={(event) => setChecked(event.target.checked)}
                                            name="checked"
                                            color="primary"
                                        />
                                    }
                                    label={
                                        <Stack display={'flex'} flexDirection={'row'} sx={{ width: '100%', flexWrap: 'wrap', rowGap: '5px', color: '#000'}}>
                                            <Typography variant="body1" noWrap>
                                                {t('agreeWith')} &nbsp;
                                            </Typography>
                                            <Typography variant="body1" noWrap component={Link} to="#">
                                                {t('termsConditions')} &nbsp;
                                            </Typography>
                                            <Typography variant="body1" noWrap>
                                                {t('and')} &nbsp;
                                            </Typography>
                                            <Typography variant="body1" noWrap component={Link} to="#">
                                                {t('privacyPloicy')}.
                                            </Typography>
                                        </Stack>
                                    }
                                />
                        </Grid>
                        {(errors.submit || playerMessage?.message) && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error={playerMessage?.status ? true : false}>
                                    {errors.submit || playerMessage?.message}
                                </FormHelperText>
                            </Box>
                        )}
                        <StyledButton
                            name={"register-form"}
                            loading={loading}
                            label={t('registerButton')}
                            sx={{ mt: 2 }}
                            disabled={isDisabled(errors)}
                        />
                    </form>
                )}
            </Formik>
        </>
    );
};

export default FirebaseRegister;
