import React from 'react';
// assets
import Romania from '../../assets/images/ilustrations/romania.svg';
import Uk from '../../assets/images/ilustrations/uk.svg';

// language translation
import { Box, IconButton, Stack } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setLanguage } from 'store/types/utilsTypes';

const TranslateMenu = () => {

    const dispatch = useDispatch();

    // *********************LANGUAGE CONFIGURATION*********************
    const changeLanguage = (lng) => {
        dispatch(setLanguage(lng))
    };

    return (
        <>
            <Stack direction="row" spacing={0.5} alignItems="center">
                <IconButton aria-label="uk"  onClick={() => changeLanguage('en')} >
                    <Box component={'img'} alt={'uk'} src={Uk} sx={{ width: 'auto', height: '25px', objectFit: 'contain'}}/>
                </IconButton>
                <IconButton aria-label="romania"   onClick={() => changeLanguage('ro')}>
                    <Box component={'img'} alt={'ro'} src={Romania} sx={{ width: 'auto', height: '25px', objectFit: 'contain'}}/>
                </IconButton>
            </Stack>

        </>
    )
}

export default TranslateMenu;