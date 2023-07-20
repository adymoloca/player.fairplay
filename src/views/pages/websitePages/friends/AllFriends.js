import React from "react";
import CardSecondaryAction from "ui-component/cards/CardSecondaryAction";
import MainCard from "ui-component/cards/MainCard";
import AllFriendsTable from "./friendComponents/AllFriendsTable";
import {  Diversity3Outlined } from "@mui/icons-material";
import { Box, useMediaQuery } from "@mui/material";

// translation
import { useTranslation } from 'react-i18next';
import { useTheme } from "@mui/system";

const AllFriends = () => {
	const { t } = useTranslation();
    const theme = useTheme();
	const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <>
            <MainCard title={t('allFriendsMenu')} secondary={<CardSecondaryAction icon={<Diversity3Outlined />} title={t('favouriteFriendsMenu')} link={'/favorite-friends'} />} transparent contentSX={{padding: '8px 0'}}>
                <Box width={'100%'} sx={{ paddingTop: `${matchDownSM ? '8px' : '24px'}` }}>
                    <AllFriendsTable />
                </Box>
            </MainCard>
        </>
    );
};

export default AllFriends;
