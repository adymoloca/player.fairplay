import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
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
    CircularProgress,
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'utils/hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Google from 'assets/images/icons/google.svg';
import Facebook from 'assets/images/icons/Facebook.svg';

import { login } from 'store/actions/userActions';
import StyledButton from 'ui-component/button/button';

// translation
import { useTranslation } from 'react-i18next';
import { setActivateEmail } from 'store/types/utilsTypes';

// ============================|| FIREBASE - LOGIN ||============================ //

const FirebaseLogin = ({ ...others }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const player = useSelector((state) => state?.playerState?.player);
    const loading = useSelector((state) => state?.playerState?.loading);
    const playerMessage = useSelector((state) => state?.playerState?.error);
    const activeStatus = useSelector((state) => state?.playerState?.isActivated);
    const [checked, setChecked] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

    // *********************API LOGIN CONFIGURATION*********************
    const googleHandler = async () => {
        console.error('Login');
    };
    const facebookHandler = async () => {
        console.error('Login facebook');
    };

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const submitAction = async (values, { setErrors, setStatus, setSubmitting }) => {
        const data = { ...values, username: values?.username?.trim() };
        try {
            dispatch(login(data));
            dispatch(setActivateEmail(values?.username.trim()));
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
        if (player?._id) navigate('/dashboard');
    }, [player, navigate, dispatch]);

    useEffect(() => {
        if (activeStatus === false && playerMessage.status === true) navigate('/activate');
    }, [playerMessage, activeStatus, navigate, dispatch]);

    const inputs = (
        others,
        theme,
        showPassword,
        handleClickShowPassword,
        handleMouseDownPassword,
        checked,
        setChecked
    ) => {
        return ({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <form noValidate onSubmit={handleSubmit} style={{ m: 0, p: 0, width: '100%' }} {...others}>
                <FormControl
                    fullWidth
                    error={Boolean(touched.username && errors.username)}
                    sx={{ ...theme.typography.customInput, m: 0, p: 0 }}>
                    <InputLabel htmlFor={`outlined-adornment-username-login`}>{t('emailUsernameInput')}</InputLabel>
                    <OutlinedInput
                        id={`outlined-adornment-username-login`}
                        type='text'
                        value={values.username}
                        name={'username'}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label={'Username'}
                        inputProps={{}}
                    />
                    {touched.username && errors.username && (
                        <FormHelperText error id={`standard-weight-helper-text-username-login`}>
                            {errors.username}
                        </FormHelperText>
                    )}
                </FormControl>

                <FormControl
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    sx={{ ...theme.typography.customInput }}>
                    <InputLabel htmlFor='outlined-adornment-password-login'>{t('passwordInput')}</InputLabel>
                    <OutlinedInput
                        id='outlined-adornment-password-login'
                        type={showPassword ? 'text' : 'password'}
                        value={values.password}
                        name='password'
                        onBlur={handleBlur}
                        onChange={handleChange}
                        endAdornment={
                            <InputAdornment position='end'>
                                <IconButton
                                    aria-label='toggle password visibility'
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge='end'
                                    size='large'>
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label={t('passwordInput')}
                        inputProps={{}}
                    />
                    {touched.password && errors.password && (
                        <FormHelperText error id='standard-weight-helper-text-password-login'>
                            {errors.password}
                        </FormHelperText>
                    )}
                </FormControl>
                {(errors.submit || playerMessage?.message) && (
                    <Box sx={{ mt: 2 }}>
                        <FormHelperText error={playerMessage?.status ? true : false}>
                            {errors.submit || playerMessage?.message}
                        </FormHelperText>
                    </Box>
                )}
                <StyledButton
                    name={'login-form'}
                    loading={isSubmitting}
                    label={loading ? <CircularProgress size={'25px'} sx={{ color: 'white' }} /> : `${t('loginButton')}`}
                    sx={{ mt: 2 }}
                    disabled={isSubmitting}
                />
                <Stack direction='row' alignItems='center' justifyContent='space-between' spacing={1} sx={{ my: 2 }}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={checked}
                                onChange={(event) => setChecked(event.target.checked)}
                                name='checked'
                                color='primary'
                            />
                        }
                        label={t('loginRememberMe')}
                        sx={{ color: '#000'}}
                    />
                    <Typography color='#616161' component={Link} to='/forgot' variant='subtitle1'>
                        {t('loginForgotPassword')}
                    </Typography>
                </Stack>
            </form>
        );
    };

    return (
        <>
            <Grid
                container
                item
                xs={12}
                direction='column'
                justifyContent='center'
                rowGap={2}
                sx={{ p: '0!important', m: '20px 0' }}>
                <Grid item xs={12} sx={{ pl: '0!important', m: 0 }}>
                    <Formik
                        initialValues={{
                            username: '',
                            password: '',
                            submit: null,
                        }}
                        validationSchema={Yup.object().shape({
                            username: Yup.string().required(`${t('errorReqUsernameEmail')}`),
                            password: Yup.string().max(255).required(`${t('errorReqPassword')}`),
                        })}
                        onSubmit={submitAction}>
                        {inputs(
                            others,
                            theme,
                            showPassword,
                            handleClickShowPassword,
                            handleMouseDownPassword,
                            checked,
                            setChecked
                        )}
                    </Formik>
                </Grid>
                <Divider sx={{ width: '100%', mb: 2 }} />
                <Grid container item xs={12} justifyContent={'center'}>
                    <StyledButton
                        name={'navigate-register'}
                        handleClick={() => navigate('/register')}
                        label={t('createAccount')}
                        sx={{ width: '200px' }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Box
                        sx={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            display: 'flex',
                        }}>
                        <Typography sx={{ color: '#000', fontSize: '16px' }}>{t('connectWith')}</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} display={'flex'} flex={'row'} justifyContent={'center'}>
                    <AnimateButton>
                        <Button
                            disableElevation
                            onClick={facebookHandler}
                            size='large'
                            variant='outlined'
                            sx={{
                                width: '30px',
                                height: '50px',
                                backgroundColor: '#fffff',
                                border: 'none',
                            }}>
                            <Box
                                sx={{
                                    width: '30px',
                                    height: '30px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <img src={Facebook} alt='facebook' style={{ width:'45px', height: '45px'}}/>
                            </Box>
                        </Button>
                    </AnimateButton>
                    <AnimateButton>
                        <Button
                            disableElevation
                            fullWidth
                            onClick={googleHandler}
                            size='large'
                            variant='outlined'
                            sx={{
                                width: '30px',
                                height: '50px',
                                backgroundColor: '#fffff',
                                border: 'none',
                            }}>
                            <Box
                                sx={{
                                    width: '30px',
                                    height: '30px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <img src={Google} alt='google' style={{ width:'45px', height: '45px'}} />
                            </Box>
                        </Button>
                    </AnimateButton>
                </Grid>
            </Grid>
        </>
    );
};

export default FirebaseLogin;
