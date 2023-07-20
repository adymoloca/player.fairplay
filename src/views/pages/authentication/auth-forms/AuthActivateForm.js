import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";

// material-ui
import {
    Grid,
    Typography,
    CircularProgress,
    Box,
} from '@mui/material';

// assets

import { activate, resetActivate } from 'store/actions/userActions';
import StyledButton from 'ui-component/button/button';
import CodeInput from 'ui-component/input/code-input';
import { useState } from 'react';
import { clearActivateEmail } from 'store/types/utilsTypes';

// translation
import { useTranslation } from 'react-i18next';

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthActivateForm = () => {
    const player = useSelector((state) => state?.playerState?.player);
    const activeStatus = useSelector((state) => state?.playerState?.isActivated);
    const emailForRecover = useSelector((state) => state?.utilsState?.utils?.activateEmail);

    const loading = useSelector((state) => state?.playerState?.loading)
    const dispatch = useDispatch();
    const navigate = useNavigate();
	const { t } = useTranslation();
    const [code, setCode] = useState(Array(6).fill(''));
    const [activationCode, setActivationCode] = useState('');

    const submitAction = async () => {
        setActivationCode(code);
        dispatch(activate(activationCode))
    }

    const resendActivation = () => {
        dispatch(resetActivate(emailForRecover));
        return dispatch(clearActivateEmail());
    }
    useEffect(() => {
        if (player?._id) 
        navigate('/login');
    }, [player, navigate, dispatch]);


    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12}>
                    <CodeInput codeProp={code} onCodeEntered={setCode} setActivationCode={setActivationCode} />
                    {(activeStatus === false && emailForRecover?.length > 0) && 
                        (<Box sx={{ my: 2 }}>
                            <Typography
                                color="secondary"
                                sx={{textDecoration: 'underline', cursor:'pointer'}}
                                onClick={()=>resendActivation()}
                                variant="subtitle1"
                            >
                                {t('resendActivation')}
                            </Typography>
                        </Box>
                    )}
                    <StyledButton name={'reset-activation-codeProp'} label={loading ? <CircularProgress size={'25px'} sx={{ color: 'white' }} /> : `${t('activateAccountButton')}`}
                        disabled={!Boolean(code[code?.length - 1])}
                        handleClick={() => { submitAction() }} />
                </Grid>
                <Grid item xs={12}>
                    <Grid
                        item
                        container
                        direction="row"
                        justifyContent={'center'}
                        xs={12}
                    >
                        <Typography variant="body1" sx={{ fontWeight: '600', fontSize: '0.85rem', textDecoration: "none", paddingRight: '8px', color: '#616161' }}>
                            {t('goTo')}
                        </Typography>
                        <Typography
                            component={Link}
                            to="/register"
                            variant="subtitle"
                            color={'#616161'}
                            fontWeight={'600'}
                        >
                            {t('registerScreen')}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default AuthActivateForm;
