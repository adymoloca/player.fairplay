import { Grid, Skeleton, Typography, useMediaQuery } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PlayerProfileSlider from '../../playerProfile/playerProfilePage/playerProfileComponent/playerProfileSlider/PlayerProfileSlider';
import { playerProfile } from '../../playerProfile/playerProfilePage/playerProfileComponent/playerProfileTest';

// translation
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/styles';

const FieldDescription = () => {
    const customization = useSelector((state) => state.customization);
	const { t } = useTranslation();

	const theme = useTheme();
	const matchDownMD = useMediaQuery(theme.breakpoints.down("md"));

    const [loading, setLoading] = useState(true);
    const loadingHandler = useCallback(
      () => {
        setTimeout(function () { setLoading(false) }, 1500);
      },
      [setLoading],
    )
    useEffect(() => {
      loadingHandler()
    }, [loadingHandler])
    
    return (
        <>
            <Grid item container xs={12} sx={{ backgroundColor: '#fff', px: 2, mt: matchDownMD ? 2 : '50px', borderRadius: `${customization.borderRadius}px` }} minHeight={'40vh'}>
                <Grid item container xs={12} mt={matchDownMD ? 1 : 3} sx={{ p: 3 }} justifyContent={'space-between'}>
                    <Grid item xs={12} md={4} marginLeft={matchDownMD ? 0 : 2} marginBottom={matchDownMD && 2}>
                        <Typography variant='subtitle1' textAlign={'start'}>{t('descriptionLabel')}</Typography>
                    </Grid>
                    <Grid item xs={12} md={7} sx={{ minHeight: '30vh' }}>
                        { loading ? <>
                            <Skeleton variant='rectangular' width={'100%'} height={'80px'} sx={{ mt: 2 }} />
                            <Skeleton variant='rectangular' width={'100%'} height={'80px'} sx={{ mt: 2 }} />
                            <Skeleton variant='rectangular' width={'100%'} height={'80px'} sx={{ mt: 2 }} />
                        </> : <>
                            <Typography variant='body1' textAlign={'start'}>{playerProfile?.description}</Typography>
                            <Typography variant='body1' sx={{ mt: 2 }} textAlign={'start'}>{playerProfile?.description}</Typography>
                            <Typography variant='body1' sx={{ mt: 2 }} textAlign={'start'}>{playerProfile?.description}</Typography>
                        </>}
                    </Grid>
                </Grid>

                <PlayerProfileSlider arr={playerProfile?.slideImge} />

            </Grid>
        </>
    )
}

export default FieldDescription;