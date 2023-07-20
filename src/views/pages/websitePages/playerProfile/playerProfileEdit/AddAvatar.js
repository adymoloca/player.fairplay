import { Avatar, Grid } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import PhotoInput from 'ui-component/button/photoInput';

const AddAvatar = (value) => {

    const [values, setValues]= useState(value)

    const playerAvatar = useSelector((state)=> state?.playerState?.player?.avatar)

    return(
        <>
            <Grid container item xs={12} md={12} marginTop={3} alignItems={'center'} gap={3}>
                <PhotoInput
                    name={`avatar-photo`}
                    title={'Profile picture'}
                    photo={values["avatar"]}
                    setPhoto={(photo) => setValues({ ...values, avatar: photo })}
                > 
                    <Avatar sx={{ width: 100, height: 100 }} src={ playerAvatar } />
                </PhotoInput>
			</Grid>
        </>
    )
}

export default AddAvatar;