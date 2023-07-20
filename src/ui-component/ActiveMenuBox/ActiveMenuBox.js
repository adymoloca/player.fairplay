import { Box, useTheme } from '@mui/system';
import React from 'react';

const ActiveMenuBox = (selected) => {
    const theme = useTheme();
    return (
        <>
            <Box sx={{ backgroundColor: `${ selected ? `${theme.palette.secondary.main}` : '#fff'}`, position: 'absolute', top:0, left: '0px', 
                height: '100%', width: '5px', borderTopRightRadius: '10px', borderBottomRightRadius: '10px'
            }} />
        </>
    )
}

export default ActiveMenuBox;