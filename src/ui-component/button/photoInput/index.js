import { Avatar, Box, ButtonBase, Typography } from "@mui/material"
import { Add } from "@mui/icons-material"
import { getBase64Image } from "utils/base64";
import PropTypes from 'prop-types';

// translation
import { useTranslation } from 'react-i18next';

const PhotoInput = (props) => {
    const { t } = useTranslation();

    const { name, photo, setPhoto, title, radius, isAvatar } = props;
    
    const createCoverPhoto= async (photo)=>{
        const base64 = await getBase64Image(photo)
        setPhoto(base64)
    }

    return (
        <> 
            <Typography paddingLeft={1}>
                {photo ? `${t('change')} ${title}` : `${t('add')} ${title}`}
            </Typography>
            <input type={'file'} name={`${name}-button-input`} accept='image/*' id={`${name}-button-input`} style={{ display: 'none', height: 0, width: 0 }} onChange={e => createCoverPhoto(e.target.files[0])} />
            <ButtonBase aria-label={'change-update-photo-button'} >
                <label htmlFor={`${name}-button-input`} style={{height: 100, width:`${isAvatar ? '100px' : '200px'}`, cursor: 'pointer',
                    borderRadius: `${radius}`, border: '2px dashed #969696', display: 'flex', alignItems: 'center', justifyContent:'center'}}>
                    { photo && photo.length>50 ? ( isAvatar ? <Avatar sx={{ width: 100, height: 100 }} src={ photo } alt={'some-photo-for-profile'} /> : 
                    <>{ photo && photo.length>50 ? 
                    <Box component={'img'}
                        sx={{ width: '200px', height: '100px', objectFit: 'cover', objectPosition: 'center'}}
                        alt={'cover-image'}
                        src={photo}
                    /> :
                    <Add />}</>) : <Add /> }
                </label>
            </ButtonBase>
        </>
    )
}

PhotoInput.defaultProps = {
    photo: '',
    title: '',
    isAvatar: false,
    radius: '50%',
    setPhoto: () => undefined
}

PhotoInput.propTypes = {
    name: PropTypes.string.isRequired,
    photo: PropTypes.string,
    setPhoto: PropTypes.func,
    radius: PropTypes.string,
    isAvatar: PropTypes.bool,
}

export default PhotoInput