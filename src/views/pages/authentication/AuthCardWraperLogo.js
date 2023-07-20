import PropTypes from 'prop-types';


// material-ui
import { Box, Typography } from '@mui/material';

// project import
import MainCard from 'ui-component/cards/MainCard';

// assets
import Fotbalist from '../../../assets/backgrounds/fotbal.jpg'

// ==============================|| AUTHENTICATION CARD WRAPPER ||============================== //

const AuthCardWrapperLogo = ({ children, ...other }) => (
    <MainCard
        sx={{
            backgroundImage: `url(${Fotbalist})` ,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: {md:'flex', xs:'none'},
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%' ,
            minHeight: '100vh',
            border: 'none',
            borderRadius: '0',
        }}
        content={false}
        {...other}
    >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '0', border: 'none', width: '100%', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.3)'}}>
            <Typography sx={{ color: 'white', fontSize: '96px', textAlign: 'left', fontWeight: '700', width: '410px'}}>
                Let's
            </Typography>
            <Typography sx={{ color: 'white',textAlign: 'left', fontSize: '96px', fontWeight: '700', width: '410px'}}>
                Play
            </Typography><Typography sx={{ color: 'white', textAlign: 'left', fontSize: '96px', fontWeight: '700', width: '410px'}}>
                Football
            </Typography><Typography sx={{ color: 'white', textAlign: 'left', fontSize: '96px', fontWeight: '700', width: '410px'}}>
                Together!
            </Typography>
        </Box>
    </MainCard>
);

AuthCardWrapperLogo.propTypes = {
    children: PropTypes.node
};

export default AuthCardWrapperLogo;
