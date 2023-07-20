import React from 'react';
import { Box, Grid, IconButton } from '@mui/material';

// assets
import Romania from '../../../assets/images/ilustrations/romania.svg';
import Uk from '../../../assets/images/ilustrations/uk.svg';

// language translation
import { useDispatch } from 'react-redux';
import { setLanguage } from 'store/types/utilsTypes';

const GridLang = ({children}) => {

    const dispatch = useDispatch();

    // *********************LANGUAGE CONFIGURATION*********************
    const changeLanguage = (lng) => {
        dispatch(setLanguage(lng))
    };

    return (
        <>
        <Grid item container xs={12} position={'absolute'} top={0} left={0} sx={{ pt: '15px', px: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Grid item container xs={5}>
					<IconButton aria-label="uk"  onClick={() => changeLanguage('en')} >
						<Box component={'img'} alt={'uk'} src={Uk} sx={{ width: '40px', height: '30px', objectFit: 'contain'}}/>
					</IconButton>
					<IconButton aria-label="romania"   onClick={() => changeLanguage('ro')}>
						<Box component={'img'} alt={'ro'} src={Romania} sx={{ width: '40px', height: '30px', objectFit: 'contain'}}/>
					</IconButton>
            </Grid>
            <Grid item container xs={6} display={'flex'} justifyContent={'end'}>
                {children}
            </Grid>

		</Grid>
        </>
    )
}

export default GridLang;