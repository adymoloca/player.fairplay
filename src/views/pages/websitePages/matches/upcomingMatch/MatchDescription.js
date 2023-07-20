import React from 'react'
import PropTypes from 'prop-types'
import { Box, Divider, Typography, useMediaQuery } from '@mui/material';

// translation
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/styles';

const MatchDescription = (props) => {
    const { matchDescription } = props;
	const { t } = useTranslation();

	const theme = useTheme();
	const matchDownXL = useMediaQuery(theme.breakpoints.down("xl"));
	const matchDownMD = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <>
            { matchDescription?.length > 0 &&
                <Box
                    sx={{
                        width: matchDownMD ? '100%' : (matchDownXL ? '40%' : "30%"),
                        backgroundColor: "rgba(255, 255, 255, 1)",
                        minHeight: matchDownMD? 'auto' : "600px",
                        maxHeight: '600px',
                        borderRadius: "15px",
                        mr: matchDownXL && 3,
                        my: matchDownMD && 4,
                    }}
                >
                    <Typography padding={"10px"} fontSize={"16px"} fontWeight={"700"}>
                        {t('descriptionTitle')}
                    </Typography>
                    <Divider />
                    <Typography
                        padding={"10px"}
                        fontSize={"14px"}
                        fontWeight={"400"}
                        color={"rgba(150, 150, 150, 1)"}
                        sx={{ overflowY: 'scroll', height:matchDownMD? 'auto' : '500px' }}
                    >
                        {matchDescription}
                    </Typography>
                </Box>
            }
        </>
    )
}

MatchDescription.propTypes = {
    matchDescription: PropTypes.string,
}

export default MatchDescription;