import React, { useEffect, useState } from 'react';
import { CircularProgress, Modal, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getProductId, purchaseProduct } from 'store/actions/paymentActions';
import { useNavigate } from 'react-router';
import StyledButton from 'ui-component/button/button';

// translation
import { useTranslation } from 'react-i18next';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '12px',
    p: 2,
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'column'
};

const CardPaymentModal = (props) => {
    const { open, setOpen, cardName, cardNumber, expDate, cardObjectId } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();
	const { t } = useTranslation();

	const theme = useTheme();
	const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

	const [ errorCvv, setErrorCvv ] = useState(false);
    const initialInputs = { cardCVC: ''}
    const [values, setValues] = useState(initialInputs);

    const productId = useSelector((state) => state?.utilsState?.utils?.productId)
    const product = useSelector((state) => state?.paymentState?.productById)
    const loading = useSelector((state) => state?.paymentState?.loadingPay)
    const playerHours = useSelector((state) => state?.playerState?.player?.gameplayHours)
    const [initialHours, setInitialHours] = useState(playerHours);

    const handleClose = () => {
        setOpen(false);
        setValues(initialInputs);
    };
    const handlePurchase = () => {
        const data = { productId, cardObjectId, cardCVC: values?.cardCVC }
        dispatch(purchaseProduct(data))
    }

    const handleDisable = (values) => !values?.cardCVC || errorCvv  ? true : false;

    useEffect(() => {
        dispatch(getProductId(productId))
        setInitialHours(playerHours) //eslint-disable-next-line
    }, [dispatch, productId])

    useEffect(() => {
        if (Number(initialHours) < Number(playerHours)) {
            setOpen(false)
            setInitialHours(playerHours)
            navigate('/all-matches')
        }
    }, [initialHours, playerHours, setOpen, navigate])

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-confirm-paymenttitle"
                aria-describedby="modal-modal-confirm-paymentdescription"
            >
                <Box sx={{ ...style, border: `2px solid ${theme.palette.secondary.dark}`, width: matchDownSM ? '100%' : '600px', height: matchDownSM ? '90%' : '520px' }}>
                    <Box >
                        <Typography id="modal-modal-confirm-paymenttitle" sx={{ fontSize: '20px', fontWeight: '700', color: `${theme.palette.secondary.main}` }}>
                            {t('cardPayment')}
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: matchDownSM ? 'column' : 'row', gap: !matchDownSM && '40px' }} >
                            <Box sx={{ display: 'flex', flexDirection: ' row', alignItems: 'center', gap: '8px' }} >
                                <Typography id="modal-modal-confirm-paymentdescription" sx={{ fontSize: '54px', fontWeight: '700' }}>
                                    {product?.gameplayHours}
                                </Typography>
                                <Typography sx={{ fontSize: '18px' }}>
                                    {product?.gameplayHours > 1 ? t('hoursLabel') : t('hourLabel')} {t('forLabel')}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', p: 2, my: !matchDownSM && 2 }}>
                                {product?.initialPrice > product?.finalPrice && <Typography sx={{ fontSize: '24px', textDecoration: 'line-through' }}>{product?.initialPrice}</Typography>}
                                <Typography sx={{ fontSize: '54px', fontWeight: '700' }}>{product?.finalPrice}</Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', pl: 2, justifyContent: 'center' }}>
                                    <Typography sx={{ fontSize: '20px' }}>RON</Typography>
                                    {product?.discount?.discountValue !== '0' && <Typography sx={{ fontSize: '16px' }}> - {product?.discount?.discountValue} {product?.discount?.discountType === 0 ? '' : '%'} discount</Typography>}
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'start', height: matchDownSM ? 'auto' : '200px', my: !matchDownSM && 4, gap: 2 }}>
                        <Box sx={{ display: 'flex', flexDirection: matchDownSM ? 'column' : 'row', alignItems: matchDownSM ? 'start' : 'center', gap: matchDownSM ? '0' : '12px'}} >
                            <Typography sx={{ fontSize: '18px', color: `${theme.palette.secondary.dark}`}}>
                                {t('cardNameLabel')}:
                            </Typography>
                            <Typography sx={{ fontSize: '18px' }}>
                                {cardName.toUpperCase()}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: matchDownSM ? 'column' : 'row', alignItems: matchDownSM ? 'start' : 'center', gap: matchDownSM ? '0' : '12px'}} >
                            <Typography sx={{ fontSize: '18px', color: `${theme.palette.secondary.dark}`}}>
                            {t('cardNumberLabel')}:
                            </Typography>
                            <Typography sx={{ fontSize: '18px' }}>
                                {cardNumber}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: matchDownSM ? 'column' : 'row', alignItems: matchDownSM ? 'start' : 'center', gap: matchDownSM ? '0' : '12px'}} >
                            <Typography sx={{ fontSize: '18px', color: `${theme.palette.secondary.dark}`}}>
                            {t('cardExpDateLabel')}:
                            </Typography>
                            <Typography sx={{ fontSize: '18px' }}>
                                {expDate}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'start', gap: '12px', width: '100%'}} >
                            <Typography sx={{ fontSize: '18px', color: `${theme.palette.secondary.dark}`, mt: '15px'}}>
                                CVC :
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', width: matchDownSM ? '70%' : '80%'}} >
                                <TextField sx={{width: matchDownSM ? '100%' : '50%'}} type="text" defaultValue={values?.cardCVC} inputProps={{ maxLength: '3'}} placeholder="CVV" 
                                    onChange={(e)=>{setValues({...values, cardCVC: e.target.value});
                                    setErrorCvv(!Boolean(/^[0-9]{3,3}$/.test(e.target.value)))
                                }} 
                                />
                                {errorCvv && <Typography sx={{ width: '100%', p: 1, color: 'red', fontSize: '12px'}}>{t('errorCVV')}</Typography>}
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: ' row', alignItems: 'center', justifyContent: matchDownSM ? 'center' : 'end', gap: '8px', mt: matchDownSM ? 3 :  1 }} >
                        <StyledButton disabled={handleDisable(values)} width={'120px'} handleClick={() => handlePurchase()} label={loading ? <CircularProgress size={'14px'} /> : `${t('payButton')}`} />
                        <StyledButton width={'120px'} variant='secondary' handleClick={() => setOpen(false)} label={t('cancelButton')}/>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}

CardPaymentModal.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    cardName: PropTypes.string,
    cardNumber: PropTypes.string,
    expDate: PropTypes.string,
    cardObjectId: PropTypes.string,
}
export default CardPaymentModal;