import React from 'react';
import { Box, InputLabel, FilledInput, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

const StyledFilledInput = (props) => {
    const {
        name,
        values,
        setValues,
        type,
        fontSize,
        fontWeight,
        padding,
        height,
        flex,
        label,
        width,
        boxSx
    } = props;

    const theme = useTheme();

    const handleTextChange = (newValue) => {
        setValues((prev) => {
            return { ...prev, [name]: newValue };
        });
    };

    return (
        <Box display={flex ? 'flex' : 'block'} sx={boxSx}>
            {/* <form> */}
            {/* <FormControl fullWidth sx={{display: 'flex'}}> */}
                {label?.length > 0 && <InputLabel
                    id={`${name}-input-label-${window.location.pathname}`}
                    sx={{
                        display: flex ? 'flex' : 'block',
                        paddingBottom: padding?.label?.bottom,
                        paddingLeft: padding?.label?.left,
                        fontWeight: fontWeight || 500,
                        fontSize: fontSize?.label || 17,
                        color: theme.palette.getContrastText('#fff'),
                        alignItems: 'flex-end',
                        width: width?.label || '160px'
                    }}
                >
                    {label}
                </InputLabel>}
                <FilledInput
                    id={`${name}-filled-input-${window.location.pathname}`}
                    type={type || 'text'}
                    autoComplete="off"
                    value={values[name]}
                    name={name}
                    sx={{
                        height: height || '35px',
                        fontSize: fontSize?.input || 20,
                        paddingBottom: padding?.input?.bottom || '10px',
                        paddingLeft: padding?.input?.left || '5px',
                        width: width?.input || '350px'
                    }}
                    onChange={(e) => handleTextChange(e.target.value)}
                    // label="Email Address / Username"
                    inputProps={{}}
                />
            {/* </FormControl> */}
            {/* </form> */}
        </Box>
    );
};

StyledFilledInput.defaultProps = {
    name: '',
    values: {},
    setValues: ()=>undefined,
    type: 'text',
    flex: false,
    fontSize: {
        label: 17,
        input: 20
    },
    fontWeight: 400,
    padding: {
        label: {
            bottom: '10px',
            left: '0px'
        },
        input: {
            bottom: '15px',
            left: '5px'
        }
    },
    height: '35px',
    label: '',
    width: {
        label: '160px',
        input: '350px'
    }
}

StyledFilledInput.propTypes = {
    name: PropTypes.string.isRequired,
    values: PropTypes.object.isRequired,
    setValues: PropTypes.func.isRequired,
    type: PropTypes.oneOf(['text', 'number', 'email', 'password', 'date']),
    fontSize: PropTypes.exact({
        label: PropTypes.number,
        input: PropTypes.number
    }),
    fontWeight: PropTypes.number,
    padding: PropTypes.exact({
        label: PropTypes.exact({
            left: PropTypes.string,
            bottom: PropTypes.string
        }),
        input: PropTypes.exact({
            left: PropTypes.string,
            bottom: PropTypes.string
        })
    }),
    height: PropTypes.string,
    flex: PropTypes.bool,
    label: PropTypes.string,
    width: PropTypes.exact({
        label: PropTypes.string,
        input: PropTypes.string
    })
}

export default StyledFilledInput;
