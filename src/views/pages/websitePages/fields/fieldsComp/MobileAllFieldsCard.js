import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@mui/material';
import { AccessTime, LocationOn, Stadium } from '@mui/icons-material';
import fieldCover from 'assets/images/ilustrations/cover.png'
import { useTheme } from '@mui/styles';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { setFieldId } from 'store/types/utilsTypes';

const MobileAllFieldsCard = props => {
    const { fieldPhoto, fieldName, fieldType, fieldHours, fieldAddress, fieldId } = props;
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDetails = useCallback((fieldId) => {
        dispatch(setFieldId(fieldId));
        navigate('/field-page')
    },[dispatch, navigate])

    return (
        <>
            <Box sx={{minWidth: '260px', width: '100%', height: '100px', backgroundColor: '#fff', 
                borderRadius: '10px', display: 'flex', p: '10px', flexDirection: 'row', alignItems: 'center'
            }} onClick={() => handleDetails(fieldId)}>
                <Box component={'img'} sx={{ width: '30%', height: '80px', objectFit: 'cover', position: 'center', borderRadius: '10px' }}
                    src={fieldPhoto?.length > 50 ? fieldPhoto : fieldCover} alt='field-photo'
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px', pl: 1, width: '70%' }}>
                    <Typography sx={{ fontSize: '16px', color: '#000' }} noWrap textOverflow={'ellipsis'}>{fieldName}</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '3px' }}>
                            <Stadium style={{ fontSize: '16px', color: `${theme.palette.secondary.dark}` }} />
                            <Typography noWrap maxWidth={'100px'} sx={{ fontSize: '16px', color: `${theme.palette.secondary.dark}` }}>{fieldType}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '3px', mr: 1 }}>
                            <AccessTime style={{ fontSize: '16px', color: `${theme.palette.secondary.dark}` }} />
                            <Typography noWrap maxWidth={'100px'} sx={{ fontSize: '16px', color: `${theme.palette.secondary.dark}` }}>
                                {fieldHours}
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <LocationOn style={{ fontSize: '16px', color: 'red' }} />
                        <Typography noWrap textOverflow={'ellipsis'}>
                            {fieldAddress}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

MobileAllFieldsCard.propTypes = {
    fieldPhoto: PropTypes.string,
    fieldName: PropTypes.string,
    fieldType: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    fieldHours: PropTypes.string,
    fieldAddress: PropTypes.string,
    fieldId: PropTypes.string,
}

export default MobileAllFieldsCard