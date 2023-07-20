import { Settings } from '@mui/icons-material';
import { Box, ClickAwayListener, Typography, useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@emotion/react';
import { useDispatch } from 'react-redux';
import { setCard } from 'store/types/utilsTypes';
import CardPaymentModal from './CardPaymentModal';

// translation
import { useTranslation } from 'react-i18next';

const CardComp = (props) => {
    const { number, expMonth, expYear, cardName, cardId, cardObjectId} = props;
	const { t } = useTranslation();


	const theme = useTheme();
	const matchDownLG = useMediaQuery(theme.breakpoints.down("lg"));
	const matchDownMD = useMediaQuery(theme.breakpoints.down("md"));
	const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

    const splitNumber = number.match(/[\s\S]{1,4}/g)
    const [ selected, setSelected ] = useState(false);
    const [ open, setOpen ] = useState(false);
    const dispatch = useDispatch();
    
    const handleSelect = (cardId) => {
        setSelected(true);
        setOpen(true)
        dispatch(setCard(cardId));
    }

    const handleAway = () => {
        setSelected(false);
    }

    return (<>
        <ClickAwayListener onClickAway={()=> handleAway()}>
            <Box  sx={{ display: 'flex', maxWidth: '1000px', minWidth: matchDownMD ? '100%' : ( matchDownLG ? '780px' : '900px'), minHeight:'80px', m: `${matchDownSM  && 0 }`, 
                flexDirection:'row', justifyContent: 'space-between', alignItems: matchDownSM ? 'start' : 'center', p: matchDownSM ? 1 : '30px',
                borderRadius: '14px', boxShadow: `${selected ? '-12px 12px 30px -12px rgba(75,242,94,0.88)' : ''}`, border: `2px solid ${theme?.palette?.secondary?.main}`,
            }}>
                <Box onClick={()=> handleSelect(cardId)}
                    sx={{display: 'flex', width: '100%', minWidth: matchDownSM ? '100px' : '80%', minHeight: matchDownMD ? '120px' : '80px', flexDirection: matchDownMD ? 'column' : 'row', 
                        justifyContent: matchDownMD ? 'center' : 'space-between', alignItems: matchDownMD ? 'start' : 'center', mr: matchDownSM ? 0 : 4, gap: 1}}>
                    <Typography sx={{ color: '#000', fontSize: '18px', pr: matchDownSM ? 0 : '20px', width: matchDownMD? '100%' : '300px'}} >
                        {cardName.toUpperCase()}
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: '12px'}}>
                        <Typography sx={{ color: '#000', fontSize: '18px', display: matchDownLG && 'none'}} >
                            {t('cardNumberInput')}:
                        </Typography>
                        <Typography sx={{ color: '#000', fontSize: '18px'}} >
                            {splitNumber.join(' ')}
                        </Typography>
                    </Box>
                    <Typography sx={{ color: '#000', fontSize: '18px', textAlign: 'bottom'}} >
                        {expMonth}{' / '}{expYear}
                    </Typography>
                </Box>
                <Settings sx={{ m: matchDownSM && 2}} />
            </Box>
        </ClickAwayListener>
        <CardPaymentModal open={open} setOpen={setOpen} cardObjectId={cardObjectId}
            cardName={cardName} cardNumber={splitNumber.join(' ')} expDate={`${expMonth + ' / ' + expYear}`}/>
        </>
    )
}

CardComp.propTypes = {
    cardName: PropTypes.string,
    number: PropTypes.string,
    expMonth: PropTypes.string,
    expYear: PropTypes.string,
    cardId: PropTypes.object,
    cardObjectId: PropTypes.string,
}

export default CardComp;