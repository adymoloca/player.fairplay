import React, { useState } from 'react'
import { Box, TextField, Typography } from '@mui/material';
import Modal from "../../../../../ui-component/modal/Modal";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { setFieldId } from 'store/types/utilsTypes';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// translation
import { useTranslation } from 'react-i18next';
import StyledButton from 'ui-component/button/button';
import { AccessTime, Email, Fastfood, Key, Lightbulb, LocalParking, Phone, Share, Shower, Stadium, Wifi } from '@mui/icons-material';
import { useTheme } from '@mui/styles';

const FieldStatisticsMobile = (props) => {
    const { fieldId, fieldName, fieldEmail, fieldPhone, fieldType, fieldHours, fieldAddress, fieldBenefits } = props;
    const { t } = useTranslation();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();

    const [modalStatus, setModalStatus] = useState({ share: false, emailModal: false, phoneModal: false });
    const modalHandler = (name) => { setModalStatus((prev) => ({ ...prev, [name]: !prev[name] })) }

    const handleRequestFieldId = (fieldId) => {
        dispatch(setFieldId(fieldId));
        navigate('/create-match')
    }

    const buttonBox = {
        border: '1px solid #2B2B2B', height: '27px', width: '27px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '5px'
    }

    const all_benefits = [
        <>
            <Shower  />
            <Typography fontSize={"16px"} fontWeight={"500"} >
                {t('showerBenefits')}
            </Typography>
        </>,
        <>
            <Lightbulb  />
            <Typography fontSize={"16px"} fontWeight={"500"} >
                {t('lightBenefits')}
            </Typography>
        </>,
        <>
            <Fastfood  />
            <Typography fontSize={"16px"} fontWeight={"500"} >
                {t('shopBenefits')}
            </Typography>
        </>,
        <>
            <Key  />
            <Typography fontSize={"16px"} fontWeight={"500"} >
                {t('lockerBenefits')}
            </Typography>
        </>,
        <>
            <LocalParking  />
            <Typography fontSize={"16px"} fontWeight={"500"} >
                {t('parkingBenefits')}
            </Typography>
        </>,
        <>
            <Wifi  />
            <Typography fontSize={"16px"} fontWeight={"500"} >
                {t('wiFiBenefits')}
            </Typography>
        </>]
    return (
        <>
            <Box sx={{ width: '100%', backgroundColor: '#fff', mt: 2, borderRadius: '10px' }}>
                <Box sx={{ width: '100%', height: '60px', p: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <StyledButton
                        handleClick={() => handleRequestFieldId(fieldId)}
                        width={"200px"}
                        label={t('createMatchButton')}
                        name={"button"}
                    />
                    <Box sx={{ width: '50%', display: 'flex', justifyContent: 'end', gap: 1, alignItems: 'center' }}>
                        <Box sx={buttonBox} >
                            <Share sx={{ fontSize: '16px' }} onClick={() => modalHandler('share')}/>
                        </Box>
                        <Box sx={buttonBox} >
                            <Phone sx={{ fontSize: '16px' }} onClick={() => modalHandler('phoneModal')}/>
                        </Box>
                        <Box sx={buttonBox} >
                            <Email sx={{ fontSize: '16px' }} onClick={() => modalHandler('emailModal')}/>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', p: '10px', gap: '5px' }}>
                    <Typography noWrap textOverflow={'ellipsis'} fontSize={'20px'} color={'#000'}>{fieldName}</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
                        <Stadium sx={{ color: `${theme?.palette?.secondary?.dark}` }} />
                        <Typography sx={{ color: `${theme?.palette?.secondary?.dark}`, width: '120px' }} >{fieldType}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
                        <AccessTime sx={{ color: `${theme?.palette?.secondary?.dark}` }} />
                        <Typography sx={{ color: `${theme?.palette?.secondary?.dark}`, width: '120px' }} >{fieldHours}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
                        <LocationOnIcon style={{ color: 'red' }} />
                        <Typography noWrap textOverflow={'ellipsis'} fontSize={"16px"} >
                            {fieldAddress}
                        </Typography>
                    </Box>
                    <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column'}}>
                    {fieldBenefits?.map((el, index)=> 
                        <Box display="flex" sx={{ backgroundColor: `${index % 2 === 0 && '#F9F9FC'}`, py: '5px'}} flexDirection="row" justifyContent={'space-between'} 
                            alignItems={'center'} width={'100%'} key={`benefits-${el}`}>
                            {all_benefits[el]}
                        </Box>)
                    }
                    </Box>
                </Box>
            </Box>
            <Modal open={modalStatus.share} setOpen={() => modalHandler('share', !modalStatus.share)}
				title={t('shareWithFriends')}
				content={
					<>
						<Box display='flex' flexDirection='column' marginY={"20px"}>
							<TextField width={"80%"} label={""} />
						</Box>
						<Box display='flex' flexDirection='row' justifyContent='flex-end' marginY={"20px"}>
							<StyledButton name="copy" label={t('copyButton')} width={"40%"} variant='primary' />
						</Box>
					</>
				} 
			/>
			<Modal open={modalStatus.emailModal} setOpen={() => modalHandler('emailModal', !modalStatus.emailModal)}
				title={t('emailInput')}
				content={
					<>
						<Typography sx={{ width: '300px', my: 4}}>
							{fieldEmail}
						</Typography>
					</>
				} 
			/>
			<Modal open={modalStatus.phoneModal} setOpen={() => modalHandler('phoneModal', !modalStatus.phoneModal)}
				title={t('phoneNumberInput')}
				content={
					<>
						<Typography sx={{ width: '300px', my: 4}}>
							{fieldPhone}
						</Typography>
					</>
				} 
            />
        </>
    )
}

export default FieldStatisticsMobile;