import { ArrowBackIosNewTwoTone } from "@mui/icons-material";
import { Typography, useMediaQuery } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import React from "react";
import CardSecondaryAction from "ui-component/cards/CardSecondaryAction";
import MainCard from "ui-component/cards/MainCard";
import FriendRequestTable from "./NotificationComponent/FriendRequestTable";
import SentRequestTable from "./NotificationComponent/SentRequestTable";

// translation
import { useTranslation } from 'react-i18next';

const NotificationPage = () => {
	const { t } = useTranslation();

	const theme = useTheme();
	const matchDownMD = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <>
            <MainCard title={t('notificationTitle')} secondary={<CardSecondaryAction icon={<ArrowBackIosNewTwoTone />} title={t('backTooltip')} link={'/'} />} 
                contentSX={{ p: matchDownMD && 0, m: matchDownMD && 0}} transparent>
                <Box width={'100%'} sx={{ paddingTop: 2}}>
                    <Typography fontSize={'1.6em'} sx={{ marginBottom: 2, paddingLeft: 1 }}>{t('receivedFriend')}</Typography>
                    <FriendRequestTable />
                </Box>
                <Box width={'100%'} sx={{ paddingTop: 2}}>
                    <Typography fontSize={'1.6em'} sx={{ marginBottom: 2, paddingLeft: 1 }}>{t('sentFriend')}</Typography>
                    <SentRequestTable />
                </Box>
            </MainCard>
        </>
    );
};

export default NotificationPage;
