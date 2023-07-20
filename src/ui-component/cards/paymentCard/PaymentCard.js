import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Card, CardContent, ClickAwayListener, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import StyledButton from "ui-component/button/button";
import { Box } from "@mui/system";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setProductId } from "store/types/utilsTypes";

const PaymentCard = (props) => {
    const { icon, title, headingTitle, description, price, currency, discount, buttonName, packageId, initialPrice } = props;

	const theme = useTheme();
	const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ selected, setSelected ] = useState(false);

    const handleProductId = (productId) => {
        dispatch(setProductId(productId))
    }

    return (
        <>
            <ClickAwayListener onClickAway={()=> setSelected(false)}>
            <Card
                onClick={()=> setSelected(true) }
                sx={{
                    border: '1px solid',
                    borderColor: theme.palette.grey[500] + 75,
                    ':hover': {
                        boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)'
                    },
                    backgroundColor: `${ selected ? `${theme.palette.secondary.main}` : '#fff'}`,
                    marginTop: `${selected && !matchDownSM ? '0' : '30px' }`,
                    marginBottom: `${selected && !matchDownSM ? '30px' : '0' }`,
                    transition: 'all .3s' ,
                    minWidth: matchDownSM ? '280px' : '340px',
                    maxWidth: matchDownSM ? '340px' : 'auto',
                    minHeight: matchDownSM? '300px' : '340px',
                    color: `${selected ? '#fff' : '#000'}`,
                }}
            >
                <CardContent sx={{ p: matchDownSM ? 1 : 4, m: matchDownSM ? 1 : 0}}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', mb:4, pb: 2}}>
                        <Box sx={{ width: '54px', height: '54px', display: 'flex', alignItems: 'center', justifyContent: 'center'}} >{icon}</Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', pl: 2, justifyContent: 'end'}}>
                            <Typography>{headingTitle}</Typography>
                            <Typography sx={{ fontSize: '24px', fontWeight: '700' }}>{title}</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ my: 2}}>
                        <Typography sx={{ maxWidth: '340px'}}>{description}</Typography>
                    </Box>
                    <Box  sx={{ display: 'flex', flexDirection: 'row', pb:2}}>
                        {initialPrice > price && <Typography sx={{ fontSize: '24px', textDecoration: 'line-through' }}>{initialPrice}</Typography>}
                        <Typography sx={{ fontSize: '54px', fontWeight: '700' }}>{price}</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', pl: 2, justifyContent: 'center'}}>
                            <Typography sx={{ fontSize: '20px'}}>{currency}</Typography>
                            {discount !== '0' && <Typography sx={{ fontSize: '16px'}}> - {discount} discount</Typography>}
                        </Box>
                    </Box>
                    { selected ? 
                    <StyledButton
                        variant={'secondary'}
                        handleClick={()=> {handleProductId(packageId); navigate('/card-page')}}
                        label={<Typography variant="body1" sx={{ color: `${theme.palette.secondary.dark}`, fontSize: '16px', fontWeight: '500' }}>{buttonName}</Typography>}
                        name={"button-paymant"} 
                        sx={{ backgroundColor: '#fff !important', borderRadius: '8px'}}
                    /> 
                        : 
                    <StyledButton
                        loading={false}
                        variant={'primary'}
                        handleClick={() => {handleProductId(packageId); navigate('/card-page')}}
                        label={buttonName}
                        name={"button-paymant"} 
                    />
                    }
                </CardContent>
            </Card>
            </ClickAwayListener>
        </>
    )
}

PaymentCard.defaultProps = {
    buttonName: '',
    currency: 'RON',
    initialPrice: 0
}

PaymentCard.propTypes = {
    buttonName: PropTypes.string.isRequired,
    icon: PropTypes.element,
    headingTitle: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
    discount: PropTypes.string.isRequired,
    packageId: PropTypes.string,
    currency: PropTypes.string,
    initialPrice: PropTypes.number.isRequired,

}


export default PaymentCard;
