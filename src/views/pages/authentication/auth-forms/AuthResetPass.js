import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

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
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'utils/hooks/useScriptRef';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { reset } from 'store/actions/resetActions';
import StyledButton from 'ui-component/button/button';
import CodeInput from 'ui-component/input/code-input';

// translation
import { useTranslation } from 'react-i18next';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const AuthResetPass = ({ ...others }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const [showPassword, setShowPassword] = useState(false);
    const [code, setCode] = useState(Array(6).fill(''));
    const [recoveryCode, setActivationCode] = useState('');

    const resetMessage = useSelector((state) => state?.resetState?.error);
    const loadingReset = useSelector((state) => state?.resetState?.loading);

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

    // handle visibility confirm password
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    useEffect(() => {
        if (resetMessage?.message && resetMessage?.status !== true)
            navigate('/login');
    }, [resetMessage, navigate, dispatch])

    
    const submitAction = async (values, { setErrors, setStatus, setSubmitting }) => {
        const data = {
            ...values,
            recoveryCode
        }
        try {
            dispatch(reset(data))
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

    const isDisabled = (values, errors) => {
        if(!Boolean(code[code?.length - 1]) || !values?.newPassword || !values?.confirmPassword || values?.newPassword !== values?.confirmPassword || errors?.newPassword || errors?.confirmPassword)
            return true;
        else
            return false;
    }

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    useEffect(() => {
        changePassword('123456');
    }, []);

    return (
        <>
            <Grid container item xs={12} direction="column" justifyContent="center" >
                    <CodeInput codeProp={code} onCodeEntered={setCode} setActivationCode={setActivationCode}/>
                <Formik
                    initialValues={{
                        newPassword: '',
                        confirmPassword: '',

                    }}
                    validationSchema={Yup.object().shape({
                        newPassword: Yup.string().required(`${t('errorReqNewPassword')}`)
                            .matches( /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, `${t('errorPasswordValidation')}`),
                        confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], `${t('errorConfirmPassword')}`).required(`${t('errorReqConfirmPassword')}`),
                    })}
                    onSubmit={submitAction}
                >
                    {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
                        <form noValidate onSubmit={handleSubmit} {...others}>

                            {/* *********************NEW PASSWORD INPUT**************************** */}

                            <FormControl
                                fullWidth
                                error={Boolean(touched.newPassword && errors.newPassword)}
                                sx={{ ...theme.typography.customInput }}
                            >
                                <InputLabel htmlFor="outlined-adornment-newPassword-register">{t('newPasswordInput')}</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-newPassword-register"
                                    type={showPassword ? 'text' : 'password'}
                                    value={values.newPassword}
                                    name="newPassword"
                                    label={t('newPasswordInput')}
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
                                {touched.newPassword && errors.newPassword && (
                                    <FormHelperText error id="standard-weight-helper-text-newPassword-register">
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
                                                    sx={{ width: 85, height: 8, borderRadius: '7px' }}
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

                            {/* *********************CONFIRM NEW PASSWORD INPUT**************************** */}

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
                                    label={t('repeatNewPasswordInput')}
                                    inputProps={{}} />
                                {touched.confirmPassword && errors.confirmPassword && (
                                    <FormHelperText error id="standard-weight-helper-text-confirmPassword-confirm">
                                        {errors.confirmPassword}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            {/* ***********************|| SUBMIT BUTTON AND ERROR SHOW ||**************************** */}

                            {(errors.submit || resetMessage?.message) && (
                                <Box sx={{ mt: 3 }}>
                                    <FormHelperText error={resetMessage?.status ? true : false}>{errors.submit || resetMessage?.message}</FormHelperText>
                                </Box>
                            )}
                            <StyledButton name={'register-form'} loading={loadingReset} 
                                disabled={isDisabled(values, errors)}
                                label={t('resetPasswordButton')} sx={{ mt: 2 }} />
                        </form>
                    )}
                </Formik>
            </Grid>
        </>
    );
};

export default AuthResetPass;
