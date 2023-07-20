import React from "react";
import CardSecondaryAction from "ui-component/cards/CardSecondaryAction";
import MainCard from "ui-component/cards/MainCard";
import { Group } from "@mui/icons-material";
import { Box, useMediaQuery } from "@mui/material";
import FavoriteFriendsTable from "./friendComponents/FavoriteFriendsTable";

// translation
import { useTranslation } from 'react-i18next';
import { useTheme } from "@mui/styles";

const FavoriteFriends = () => {
	const { t } = useTranslation();
    const theme = useTheme();
	const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <>
            <MainCard title={t('favouriteFriendsMenu')} secondary={<CardSecondaryAction icon={<Group />} title={t('allFriendsMenu')} link={'/all-friends'} />} transparent contentSX={{padding: '8px 0'}}>
                <Box width={'100%'} sx={{ paddingTop: `${matchDownSM ? '8px' : '24px'}` }}>
                    <FavoriteFriendsTable />
                </Box>
            </MainCard>
        </>
    )
}

export default FavoriteFriends;