import React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import MainCard from "ui-component/cards/MainCard";
import NearYouTable from "./matchesComponent/NearYouTable";
import { ArrowBackIosNewTwoTone } from "@mui/icons-material";
import CardSecondaryAction from "ui-component/cards/CardSecondaryAction";

// translation
import { useTranslation } from 'react-i18next';
import { useTheme } from "@mui/styles";

const MatchesNearYou = () => {
	const { t } = useTranslation();

    const theme = useTheme();
    const matchDownMD = useMediaQuery(theme.breakpoints.down("md"));
    const matchDownXL = useMediaQuery(theme.breakpoints.down("xl"));

	return (
		<>
			<MainCard title={t('nearMatchesPageTitle')} secondary={ <CardSecondaryAction icon={<ArrowBackIosNewTwoTone />} title={t('backTooltip')} link={"/"} /> } 
				contentSX={{ p: matchDownMD && 0, m: matchDownMD && 0}} transparent >
				<Typography 
				sx={{
					display: "flex",
					fontSize: "18px",
					fontWeight: "700",
					color: "#37AE0F",
					px: `${matchDownMD ? '10px' : '40px'}`,
					py: 2,
				}}>
					{t('matchesNearYou')}
				</Typography>
				<Box sx={{
						minHeight: "300px",
						width: "100%",
						display: "flex",
						px: `${matchDownXL ? 0 : '40px'}`,
						pt: 1,
						gap: 2,
						flexDirection: 'column',
						alignItems: "center",
						justifyContent: "center",
						bgcolor: "transparent",
						color: (theme) =>
							theme.palette.mode === "dark" ? "grey.300" : "grey.800",
						borderColor: (theme) =>
							theme.palette.mode === "dark" ? "grey.800" : "grey.300",
					}}
				>
					<NearYouTable />
				</Box>
			</MainCard>
		</>
	);
};

export default MatchesNearYou;
