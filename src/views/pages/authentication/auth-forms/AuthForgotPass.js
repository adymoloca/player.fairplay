import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    OutlinedInput,
    Typography,
    Box,
    CircularProgress,
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'utils/hooks/useScriptRef';

// assets

import { recover } from 'store/actions/recoverActions';
import StyledButton from 'ui-component/button/button';

// translation
import { useTranslation } from 'react-i18next';

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthForgotPass = ({ ...others }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const recoverMessage = useSelector((state) => state?.recoverState?.error);
    const loadingForgot = useSelector((state) => state?.recoverState?.loading)
    const dispatch = useDispatch();
    const navigate = useNavigate();
	const { t } = useTranslation();

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        if (recoverMessage?.message === "Email sent.") {
            navigate('/reset');
        }
    }, [navigate, recoverMessage, dispatch])

    const submitAction = async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
            dispatch(recover(values))
            if (scriptedRef.current) {
                setStatus({ success: true });
                setSubmitting(false);
            }
        } catch (err) {
            console.error(err);
            if (scriptedRef.current) {
                setStatus({ success: false });
                setErrors({ submit: err?.message });
                setSubmitting(false);
            }
        }
    }

    const inputs = (others, theme) => {
        return ({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <form noValidate onSubmit={handleSubmit} {...others}>
                <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                    <InputLabel htmlFor="outlined-adornment-email-forgot">{t('emailInput')}</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-email-forgot"
                        type="email"
                        value={values.email}
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Email Address "
                        inputProps={{}} />
                    {touched.email && errors.email && (
                        <FormHelperText error id="standard-weight-helper-text-email-forgot">
                            {errors.email}
                        </FormHelperText>
                    )}
                </FormControl>
                {(errors.submit || recoverMessage?.message) && (
                    <Box sx={{ mt: 2 }}>
                        <FormHelperText error={recoverMessage?.status ? true : false}>{errors.submit || recoverMessage?.message}</FormHelperText>
                    </Box>
                )}
                <StyledButton name={'login-form'} loading={isSubmitting}
                    label={loadingForgot ? <CircularProgress size={'25px'} sx={{ color: 'white' }} /> : `${t('resetPasswordButton')}`} sx={{ mt: 2 }} disabled={isSubmitting} />
            </form>
        );
    }

    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12}>
                    <Formik
                        initialValues={{
                            email: '',
                        }}
                        validationSchema={Yup.object().shape({
                            email: Yup.string().email(`${t('errorValidationEmail')}`).max(255).required(`${t('errorReqEmail')}`),
                        })}
                        onSubmit={submitAction}
                    >
                        {inputs(others, theme, handleMouseDownPassword)}
                    </Formik>
                </Grid>
                <Grid item xs={12}>
                    <Grid
                        item
                        container
                        direction="row"
                        justifyContent={'center'} alignItems={'center'}
                        xs={12}
                    >
                        <Typography variant="body1" sx={{fontWeight: 600, textDecoration: "none", paddingRight: '8px', color: '#616161' }}>
                            {t('goTo')}
                        </Typography>
                        <Typography
                            component={Link}
                            to="/register"
                            variant="subtitle1"
                            color={'#616161'}
                        >
                            {t('registerScreen')}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default AuthForgotPass;
