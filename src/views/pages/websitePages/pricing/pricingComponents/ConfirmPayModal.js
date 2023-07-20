import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, Modal, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getProductId, purchaseProduct } from 'store/actions/paymentActions';
import { useNavigate } from 'react-router';

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
};

const ConfirmPayModal = (props) => {
    const { open, setOpen } = props;

	const theme = useTheme();
	const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

    const dispatch = useDispatch();
    const navigate = useNavigate();
	const { t } = useTranslation();

    const productId = useSelector((state)=> state?.utilsState?.utils?.productId)
    const cardId = useSelector((state)=> state?.utilsState?.utils?.cardId)
    const product = useSelector((state)=> state?.paymentState?.productById)
    const loading = useSelector((state)=> state?.paymentState?.loadingPay)
    const playerHours = useSelector((state)=> state?.playerState?.player?.gameplayHours)
    const [initialHours, setInitialHours] = useState(playerHours);

    const handleClose = () => setOpen(false);
    const handlePurchase = () => {
        const data = { productId, cardId}
        dispatch(purchaseProduct(data))
    }

    useEffect(() => {
        dispatch(getProductId(productId))
        setInitialHours(playerHours) //eslint-disable-next-line
    }, [dispatch, productId])

    useEffect(() => {
        if(Number(initialHours) < Number(playerHours)){ 
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
                <Box sx={{...style, border: `2px solid ${theme.palette.secondary.dark}`, width: matchDownSM ? '100%' : '600px' }}>
                    <Typography id="modal-modal-confirm-paymenttitle" sx={{ fontSize: '18px', fontWeight: '700', color: `${theme.palette.secondary.main}`}}>
                        {t('confirmPaymentTitle')}
                    </Typography>
                    <Box  sx={{ display: 'flex', flexDirection: 'row', p:2, my: 2}}>
                        {product?.initialPrice > product?.finalPrice && <Typography sx={{ fontSize: '24px', textDecoration: 'line-through' }}>{product?.initialPrice}</Typography>}
                        <Typography sx={{ fontSize: '54px', fontWeight: '700' }}>{Math.floor(product?.finalPrice * 100)/100}</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', pl: 2, justifyContent: 'center'}}>
                            <Typography sx={{ fontSize: '20px'}}>RON</Typography>
                            {product?.discount?.discountValue !== '0' && <Typography sx={{ fontSize: '16px'}}> - {product?.discount?.discountValue} {product?.discount?.discountType === 0 ? '' : '%'} discount</Typography>}
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection:' row', alignItems: 'center', gap: '8px'}} >
                        <Typography id="modal-modal-confirm-paymentdescription" sx={{ fontSize: '18px'}}>
                            {t('buyPackage')} {product?.gameplayHours} {t('hoursTimeWith')}{' '}
                            {Math.floor(product?.finalPrice * 100)/100} RON !
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection:' row', alignItems: 'center', justifyContent: 'end', gap: '8px', mt: 1}} >
                        <Button onClick={()=>handlePurchase()} > {loading ? <CircularProgress size={'14px'}/> : `${t('payButton')}`} </Button>
                        <Button onClick={()=>setOpen(false)}> {t('cancelButton')} </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}

ConfirmPayModal.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
}
export default ConfirmPayModal;