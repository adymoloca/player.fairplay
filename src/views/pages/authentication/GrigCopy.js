import React from 'react';
import { Grid, Typography } from '@mui/material';



const GridCopy = () => { 

    const DateCopy = ( new Date().getFullYear())

    return (
        <>
        <Grid item container xs={12} position={'absolute'} bottom={'20px'} left={0} sx={{ pt: '15px', px: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Typography variant='body1' textAlign={'start'} sx={{ fontSize: '12px', fontWeight: '400', color: '#696969'}}>Fotbalist app &#169; {DateCopy}.</Typography>
		</Grid>
        </>
    )
}

export default GridCopy;