import { ArrowBackIosNewTwoTone } from "@mui/icons-material";
import { Typography, useMediaQuery } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import React from "react";
import CardSecondaryAction from "ui-component/cards/CardSecondaryAction";
import MainCard from "ui-component/cards/MainCard";
import InvitationReceivedTable from "./InvitationComponent/InvitationReceivedTable";
import InvitationSentTable from "./InvitationComponent/InvitationSentTable";

// translation
import { useTranslation } from 'react-i18next';

const InvitationPage = () => {
	const { t } = useTranslation();

	const theme = useTheme();
	const matchDownLG = useMediaQuery(theme.breakpoints.down("lg"));

    return (
        <>
            <MainCard title={t('invitationsTitle')} secondary={<CardSecondaryAction icon={<ArrowBackIosNewTwoTone />} title={t('backTooltip')} link={'/'} />} 
                contentSX={{ p: matchDownLG && 0, m: matchDownLG && 0}} transparent>
                <Box width={'100%'} sx={{ paddingTop: 2}}>
                    <Typography fontSize={'1.6em'} sx={{ marginBottom: 2, paddingLeft: 1}}>{t('receivedInvitations')}</Typography>
                    <InvitationReceivedTable />
                </Box>
                <Box width={'100%'} sx={{ paddingTop: 2}}>
                    <Typography fontSize={'1.6em'} sx={{ marginBottom: 2, paddingLeft: 1}}>{t('sentInvitations')}</Typography>
                    <InvitationSentTable />
                </Box>
            </MainCard>
        </>
    );
};

export default InvitationPage;
