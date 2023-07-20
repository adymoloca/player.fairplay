import { ArrowBackIosNewTwoTone } from "@mui/icons-material";
import { Grid, useMediaQuery } from "@mui/material";
import React from "react";
import CardSecondaryAction from "ui-component/cards/CardSecondaryAction";
import MainCard from "ui-component/cards/MainCard";
import TicketForm from "./ticketForm";

// translation
import { useTranslation } from 'react-i18next';
import { useTheme } from "@mui/styles";

const Ticket = () => {
    const { t } = useTranslation();

	const theme = useTheme();
	const matchDownMD = useMediaQuery(theme.breakpoints.down("md"));

    return(
        <>
            <MainCard title={t('createTicketTitle')} secondary={<CardSecondaryAction icon={<ArrowBackIosNewTwoTone />} title={t('backTooltip')} link={'/'} />} 
                contentSX={{ p: matchDownMD && 0, m: matchDownMD && 0}}>
                <Grid item container xs={12} minHeight={matchDownMD? '70vh' : '76vh'} p={matchDownMD? 1 : 5} sx={{ displa: 'flex', justifyContent: 'center' }}>
                        <TicketForm />
                </Grid>
            </MainCard>
        </>
    )
}

export default Ticket;