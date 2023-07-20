import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography,
    CircularProgress,
} from '@mui/material';

import { strengthColor, strengthIndicator } from "utils/password-strength";

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'utils/hooks/useScriptRef';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { change } from 'store/actions/changePasswordActions';
import StyledButton from 'ui-component/button/button';

// translation
import { useTranslation } from 'react-i18next';

// ============================|| FIREBASE - LOGIN ||============================ //

const ChangePasswordForm = ({ ...others }) => {

    const [strength, setStrength] = useState(0);
    const [level, setLevel] = useState();
	const { t } = useTranslation();

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const loading = useSelector((state) => state?.changeState?.loading)
    const changeMessage = useSelector((state) => state?.changeState?.error);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // handle visibility old password
    const [showOldPassword, setShowOldPassword] = useState(false);
    const handleClickShowOldPassword = () => {
        setShowOldPassword(!showOldPassword);
    };

    // handle visibility new password
    const [showNewPassword, setShowNewPassword] = useState(false);
    const handleClickShowNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    };

    // handle visibility confirm password
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const submitAction = async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
            dispatch(change(values))
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
    }

    const isDisable = ( errors, values ) => {
        if(Boolean(errors?.newPassword) || Boolean(errors?.oldPassword) || Boolean(errors?.confirmPassword) || !values?.newPassword || !values?.oldPassword || !values?.confirmPassword ) 
            return true; 
        else 
            return false;
    }

    useEffect(() => {
        changePassword("123456");
    }, []);

    useEffect(() => {
        if (changeMessage?.message === "Password changed successfully.")
            navigate('/');
    }, [changeMessage, navigate])
    
    const inputs = ( others, theme, showOldPassword, handleClickShowOldPassword, showNewPassword, handleClickShowNewPassword, showConfirmPassword, handleClickShowConfirmPassword) => {

        return ({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <form noValidate onSubmit={handleSubmit} {...others}>

                <FormControl
                    fullWidth
                    error={Boolean(touched.oldPassword && errors.oldPassword)}
                    sx={{ ...theme.typography.customInput }}
                >
                    <InputLabel htmlFor="outlined-adornment-oldPassword-change">{t('oldPasswordInput')}</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-oldPassword-change"
                        type={showOldPassword ? 'text' : 'password'}
                        value={values.oldPassword}
                        name="oldPassword"
                        onBlur={handleBlur}
                        onChange={(e) => {
                            handleChange(e);
                        }}
                        endAdornment={<InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowOldPassword}
                                edge="end"
                                size="large"
                            >
                                {showOldPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>}
                        label="Password"
                        inputProps={{}} />
                    {touched.oldPassword && errors.oldPassword && (
                        <FormHelperText error id="standard-weight-helper-text-oldPassword-change">
                            {errors.oldPassword}
                        </FormHelperText>
                    )}
                </FormControl>
                
                <FormControl
                    fullWidth
                    error={Boolean(touched.newPassword && errors.newPassword)}
                    sx={{ ...theme.typography.customInput }}
                >
                    <InputLabel htmlFor="outlined-adornment-newPassword-change">{t('newPasswordInput')}</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-newPassword-change"
                        type={showNewPassword ? 'text' : 'password'}
                        value={values.newPassword}
                        name="newPassword"
                        onBlur={handleBlur}
                        onChange={(e) => {
                            handleChange(e);
                            changePassword(e.target.value);
                        }}
                        endAdornment={<InputAdornment position="end">
                            <IconButton
                                aria-label="toggle newPassword visibility"
                                onClick={handleClickShowNewPassword}
                                edge="end"
                                size="large"
                            >
                                {showNewPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>}
                        label="New Password"
                        inputProps={{}} />
                    {touched.newPassword && errors.newPassword && (
                        <FormHelperText error id="standard-weight-helper-text-newPassword-change">
                            {errors.newPassword}
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
                                            <Typography variant="subtitle1" fontSize="0.75rem">
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
                    <InputLabel htmlFor="outlined-adornment-confirmPassword-confirm">{t('repeatNewPasswordInput')}</InputLabel>
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
                        label="Confirm password"
                        inputProps={{}} />
                    {touched.confirmPassword && errors.confirmPassword && (
                        <FormHelperText error id="standard-weight-helper-text-confirmPassword-confirm">
                            {errors.confirmPassword}
                        </FormHelperText>
                    )}
                </FormControl>
                
                {(errors.submit || changeMessage?.message) && (
                    <Box sx={{ mt: 3 }}>
                        <FormHelperText error={changeMessage?.status ? true : false}>{errors.submit || changeMessage?.message}</FormHelperText>
                    </Box>
                )}
                <StyledButton name={'change-form'} loading={isSubmitting} 
                    label={ loading ? <CircularProgress size={'25px'} sx={{ color: 'white'}}/> : `${t('changePasswordMenu')}`} 
                    sx={{ mt: 2 }} disabled={isDisable(errors, values)} 
                />
            </form>
        );
    }

    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2} maxWidth={'600px'}>
                <Grid item xs={12}>
                <Formik
                initialValues={{
                    oldPassword: '',
                    newPassword: '',
                    confirmPassword:'',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    oldPassword: Yup.string()
                        .matches( /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, `${t('errorPasswordValidation')}`)
                        .required(`${t('errorOldPasswqord')}`),
                    newPassword: Yup.string().required(`${t('errorReqNewPassword')}`)
                        .matches( /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, `${t('errorPasswordValidation')}`),
                    confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], `${t('errorConfirmPassword')}`).required(`${t('errorReqConfirmPassword')}`),
                })}
                onSubmit={submitAction}
            >
                {inputs(others, theme, showOldPassword, handleClickShowOldPassword, showNewPassword, handleClickShowNewPassword, showConfirmPassword, handleClickShowConfirmPassword)}
            </Formik>
                </Grid>
                
            </Grid>


        </>
    );
};

export default ChangePasswordForm;
