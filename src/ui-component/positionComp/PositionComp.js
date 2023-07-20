import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/styles';

const PositionComp = (props) => {
    const { positions, contentTo } = props;

	const theme = useTheme();
	const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Box sx={{ width: 'auto', display: 'flex', alignItems: 'center', justifyContent: `${contentTo}`, flexDirection: 'row', gap: '10px'}}>
            { positions?.map((item, index) => {
                return(
                    <Fragment key={`${item + index}`} >
                        {item === 'Defender' && <Box sx={{ borderRadius: '50%', width: `${matchDownSM ? '18px' : '30px'}`, height: `${matchDownSM ? '18px' : '30px'}`, color: '#fff', backgroundColor: 'blue',
                            display: 'flex', justifyContent: 'center', alignItems: 'center'}}><Typography sx={{ fontSize: `${matchDownSM ? '8px': '10px'}`}}>DEF</Typography></Box>
                        }
                        {item === 'GoalKeeper' && <Box sx={{ borderRadius: '50%', width: `${matchDownSM ? '18px' : '30px'}`, height: `${matchDownSM ? '18px' : '30px'}`, color: '#fff', backgroundColor: 'black',
                            display: 'flex', justifyContent: 'center', alignItems: 'center'}}><Typography sx={{ fontSize: `${matchDownSM ? '8px': '10px'}`}}>GK</Typography></Box>
                        }
                        {item === 'Midfielder' && <Box sx={{ borderRadius: '50%', width: `${matchDownSM ? '18px' : '30px'}`, height: `${matchDownSM ? '18px' : '30px'}`, color: '#fff', backgroundColor: '#37AE0F',
                            display: 'flex', justifyContent: 'center', alignItems: 'center'}}><Typography sx={{ fontSize: `${matchDownSM ? '8px': '10px'}`}}>MID</Typography></Box>
                        }
                        {item === 'Striker' && <Box sx={{ borderRadius: '50%', width: `${matchDownSM ? '18px' : '30px'}`, height: `${matchDownSM ? '18px' : '30px'}`, color: '#fff', backgroundColor: 'red',
                            display: 'flex', justifyContent: 'center', alignItems: 'center'}}><Typography sx={{ fontSize: `${matchDownSM ? '8px': '10px'}`}}>ATK</Typography></Box>
                        }
                    </Fragment>
                )
            })}
        </Box>
    )
}

PositionComp.defaultPrips = {
    contentTo: 'start',
}
PositionComp.propsTypes = {
    positions: PropTypes.array,
    contentTo: PropTypes.oneOf(['start', 'end'])
}
export default PositionComp;