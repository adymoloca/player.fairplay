import { ReportProblem } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/styles';
import React from 'react';
import PropTypes from 'prop-types';

// translation
import { useTranslation } from 'react-i18next';

const ErrorPage = (props) => {
    const { error, cardVariant, noContentMessage} = props;

    const theme = useTheme();
    const { t } = useTranslation();

    return (
        <>
            <Box sx={{height:cardVariant? '250px' : '100%', width:cardVariant? '350px' : '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2, p:2, backgroundColor:'#fff'}} >
                <ReportProblem fontSize='large' sx={{ color: `${theme.palette.primary.main}`, width: '44px', height: '44px'}} />
                <Typography textAlign={'center'} fontSize={'22px'} >
                    {error ? t('errorOops') :  (noContentMessage?.length > 0 ? noContentMessage : t('errorGeneralNoContent'))}...
                </Typography>
            </Box>
        </>
    )
}


ErrorPage.defaultProps = {
    error: false,
    cardVariant: false,
}

ErrorPage.propTypes = {
    error: PropTypes.bool.isRequired,
    cardVariant: PropTypes.bool,
    noContentMessage: PropTypes.string,
}

export default ErrorPage;