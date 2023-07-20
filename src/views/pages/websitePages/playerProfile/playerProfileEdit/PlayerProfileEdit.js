import React, { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { useMediaQuery } from '@mui/material';
import CardSecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { ArrowBackIosNewTwoTone } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import PlayerProfileEditForm from './PlayerProfileEditForm';

// translation
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/styles';

const PlayerProfileEdit = () => {
    const { t } = useTranslation();

    const theme = useTheme();
	const matchDownMD = useMediaQuery(theme.breakpoints.down("md"));

    const playerRed = useSelector((state) => state?.playerState?.player);

    const [initialData, setInitialData] = useState(playerRed);

    return (
        <>
            <MainCard title={t('editProfileTitle')} secondary={<CardSecondaryAction icon={<ArrowBackIosNewTwoTone/>} title={t('backTooltip')} link={'/player-profile'} /> } contentSX={{p: matchDownMD && 0, m: matchDownMD && 0 }} >
                <PlayerProfileEditForm values={initialData} setValues={setInitialData} />
            </MainCard>
        </>   
    )
}

export default PlayerProfileEdit;