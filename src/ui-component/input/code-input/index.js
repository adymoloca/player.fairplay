import React from 'react';
import { useState, useRef, useImperativeHandle, useEffect, forwardRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField, Typography } from '@mui/material';

const SingleInput = forwardRef((props, ref) => {

    const { value, handleChange, index, handleFocus, disabled } = props;

    const inputRef = useRef();

    useEffect(() => {
        index === 0 && value === '' && handleFocus(0);
    }, [value, index, handleFocus])

    useImperativeHandle(ref, () => ({
        focus: () => {
            inputRef.current.focus();
        }
    }));

    return (
        <TextField variant='outlined' label={<Typography fontSize='40px' sx={{ width: '100%'}}>{' '}</Typography>}
            autoComplete={'off'} value={value} type={'text'} inputRef={inputRef} disabled={disabled} 
            onKeyDown={(e) => e.key === 'Backspace' && index !== 0 && value === '' && handleFocus(prev => prev - 1)} 
            sx={{ maxWidth: '60px', fontSize: '40px',p:0, m: 0, textAlign: 'center', display: 'flex', justifyContent: 'center',
                '& > label': {
                    width: '100%',
                    display: 'none ',
                    left: 0,
                    top: -10,
                    color: '#616161',
                    '&[data-shrink="false"]': {
                        display: value !== '' ? 'none' : 'flex',
                        justifyContent: 'center', alignItems: 'center', textAlign: 'center',
                        top: -10,
                    },
                },
                '& > div > fieldset > legend > span': {
                    display: 'none !important'
                },
                '& > div': {
                    height: '100% !important'
                },
            }} 
            onChange={(e) => handleChange(e.target.value, index)} key={`code-single-input-index-${index}`} 
            inputProps={{maxLength: 1, style: { p: 0, m: 0, textAlign: 'center' } }} 
        />
    )
})

const CodeInput = (props) => {
    const { setActivationCode, onCodeEntered = () => undefined, codeProp } = props;
    const [focusOn, setFocusOn] = useState(0);
    const inputRef = useRef();

    const handleChange = (newValue, index) => {
        const array = [...codeProp];
        array.splice(index, 1, newValue);
        onCodeEntered(array);
        index < codeProp.length - 1 && newValue !== '' && setFocusOn(prev => prev + 1);
    }

    const codeEntered = useCallback(() => {
        const codeJoined = codeProp.join('');
        setActivationCode(codeJoined)
    }, [codeProp, setActivationCode])

    useEffect(() => {
        focusOn === codeProp.length - 1 && codeProp[focusOn] !== '' && codeEntered();
    }, [codeProp, focusOn, codeEntered])

    useEffect(() => {
        inputRef.current.focus();
    }, [focusOn])

    return (<>
        <Grid container sx={{justifyContent:'space-between', columnGap: 1, marginY: 3, display: 'flex', flexWrap: 'nowrap'}}>
            {codeProp.map((el, index) => {
                return (
                    <SingleInput value={codeProp[index]} key={`codeProp-input-index-${index}`}
                        ref={focusOn === index ? inputRef : null} handleFocus={setFocusOn}
                        handleChange={handleChange} index={index} disabled={focusOn !== index}/>
                )
            })}
        </Grid>
    </>
    );
}

CodeInput.propTypes = {
    onCodeEntered: PropTypes.func
}

export default CodeInput; 