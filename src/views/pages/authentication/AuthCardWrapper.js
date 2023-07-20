import PropTypes from 'prop-types';

// material-ui
import { Box } from '@mui/material';

// project import
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| AUTHENTICATION CARD WRAPPER ||============================== //

const AuthCardWrapper = ({ children, ...other }) => (
    <MainCard
        sx={{
            display: 'flex',
            position: 'relative',
            alignItems: 'center',
            width: '100%' ,
            height: '100vh',
            border: 'none',
            borderRadius: '0',
        }}
        content={false}
        {...other}
    >
        <Box width={'100%'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{children}</Box>
    </MainCard>
);

AuthCardWrapper.propTypes = {
    children: PropTypes.node
};

export default AuthCardWrapper;
