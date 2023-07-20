import React from 'react';

import { Typography, Box } from '@mui/material';

const SideBarSocial = () => {

    return(
        <>
            <Box width={'100%'} display={'flex'} justifyContent={'center'} >
               <Typography variant='body1' textAlign={'center'} sx={{ width: '100%', fontSize: '12px'}}>
                    ALL RIGHTS RESERVED &#169; FOTBALIST
                </Typography>
            </Box>
        </>
    )
}

export default SideBarSocial;