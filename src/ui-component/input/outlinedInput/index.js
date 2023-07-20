import React from 'react';
import {
    InputLabel,
    OutlinedInput,
    FormControl,
    MenuItem,
    TextField,
    Select,
    TextareaAutosize,
    FormHelperText,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';

const StyledOutlinedInput = (props) => {
    const {
        name,
        values,
        setValues,
        defaultValue,
        onChange,
        type,
        label,
        select,
        options,
        multipleSelect,
        isDescription,
        widthDescription,
        selectObject,
        inputLength,
        onKeyDown,
    } = props;

    const theme = useTheme();

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const handleTextChange = (newValue) => {
        !onChange
            ? setValues((prev) => {
                  return { ...prev, [name]: newValue };
              })
            : onChange(newValue);
    };

    return (
        <>
            <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                {select === true ? (
                    <>
                        <TextField
                            sx={{
                                '& label': {
                                    marginTop: '-10px',
                                    color: '#616161',
                                    '&.Mui-focused': {
                                        marginTop: '-10px',
                                    },
                                },
                            }}
                            label={label}
                            id={`${name}-outlined-input-${window.location.pathname}`}
                            type={'text'}
                            onChange={(e) => handleTextChange(e.target.value)}
                            select
                            SelectProps={{
                                classes: {
                                    height: '50px',
                                },
                            }}
                            name={name}
                            value={defaultValue || values[name] || ``}
                            inputProps={{}}>
                            {selectObject === false
                                ? options.map((option) => (
                                      <MenuItem key={option} value={option}>
                                          {option}
                                      </MenuItem>
                                  ))
                                : options.map((option, index) => (
                                      <MenuItem key={option} value={index + 1}>
                                          {option}
                                      </MenuItem>
                                  ))}
                        </TextField>
                    </>
                ) : multipleSelect === true ? (
                    <>
                        <InputLabel id={`${name}-multuple-input-${window.location.pathname}`} sx={{ color: '#616161'}}>{label}</InputLabel>
                        <Select
                            labelId={`${name}-multiple-input-${window.location.pathname}`}
                            id={`${name}-multiple-id-input-${window.location.pathname}`}
                            multiple
                            value={defaultValue || values[name] || ` `}
                            onChange={(e) => handleTextChange(e.target.value)}
                            input={<OutlinedInput label='Name' />}
                            MenuProps={MenuProps}>
                            {selectObject === false
                                ? options.map((option) => (
                                      <MenuItem key={option} value={option}>
                                          {option}
                                      </MenuItem>
                                  ))
                                : options.map((option, index) => (
                                      <MenuItem key={option} value={index}>
                                          {option}
                                      </MenuItem>
                                  ))}
                        </Select>
                    </>
                ) : isDescription ? (
                    <>
                        <TextareaAutosize
                            id={`${name}-outlined-input-description-${window.location.pathname}`}
                            aria-label='minimum height'
                            name={name}
                            value={defaultValue || values[name]}
                            onChange={(e) => handleTextChange(e.target.value)}
                            minRows={10}
                            style={{ width: `${widthDescription}`, m: 1, resize:'vertical', maxHeight: '250px', minHeight: '100px' }}
                            maxLength={`${inputLength}`}
                        />
                        {Boolean(values[name]?.length > inputLength - 1) === true && (
                            <FormHelperText
                                id={`${name}-outlined-input-description-${window.location.pathname}`}>{`Please enter max ${inputLength} characters`}</FormHelperText>
                        )}
                    </>
                ) : (
                    <>
                        <InputLabel htmlFor={`${name}-outlined-input-${window.location.pathname}`}>{label} </InputLabel>
                        <OutlinedInput
                            onKeyDown={onKeyDown}
                            id={`${name}-outlined-input-${window.location.pathname}`}
                            type={type || 'text'}
                            autoComplete='off'
                            value={defaultValue || values[name]}
                            name={name}
                            maxLength={ `${inputLength}`}
                            onChange={(e) => handleTextChange(e.target.value)}
                            inputProps={{ maxLength: `${inputLength}`, sx: label?.length === 0 ? {background: 'transparent !important'} : {} }}
                            error={Boolean(values[name]?.length > inputLength - 1)}
                            sx={ label?.length === 0 ? { pb: '10px', height: '50px', fontSize: '16px'} : {}}
                        />
                        {inputLength !== 100 && Boolean(values[name]?.length > inputLength - 1) === true && (
                            <FormHelperText
                                id={`${name}-outlined-input-${window.location.pathname}`}>{`Please enter max ${inputLength} characters`}</FormHelperText>
                        )}
                    </>
                )}
            </FormControl>
        </>
    );
};

StyledOutlinedInput.defaultProps = {
    name: '',
    values: {},
    setValues: () => undefined,
    type: 'text',
    label: '',
    select: false,
    options: [],
    indexSelected: 0,
    multipleSelect: false,
    isDescription: false,
    widthDescription: '100%',
    selectObject: false,
    inputLength: 100,
    onKeyDown: () => undefined,
};

StyledOutlinedInput.propTypes = {
    name: PropTypes.string.isRequired,
    values: PropTypes.object.isRequired,
    setValues: PropTypes.func.isRequired,
    type: PropTypes.oneOf(['text', 'number', 'email', 'password', 'date']),
    label: PropTypes.string,
    select: PropTypes.bool,
    options: PropTypes.array,
    indexSelected: PropTypes.number,
    isDescription: PropTypes.bool,
    multipleSelect: PropTypes.bool,
    widthDescription: PropTypes.string,
    selectObject: PropTypes.bool,
    inputLength: PropTypes.number,
    onKeyDown: PropTypes.func,
};

export default StyledOutlinedInput;
