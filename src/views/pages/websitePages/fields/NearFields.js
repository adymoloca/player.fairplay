import React from "react";
import MainCard from "ui-component/cards/MainCard";
import CardSecondaryAction from "ui-component/cards/CardSecondaryAction";
import { ArrowBackIosNewTwoTone } from "@mui/icons-material";
import NearFieldsTable from "./fieldsComp/NearFieldsTable";
import { Box, Typography, useMediaQuery } from "@mui/material";

// translation
import { useTranslation } from 'react-i18next';

import { useTheme } from "@mui/styles";

const NearFields = () => {
	const { t } = useTranslation();
    const theme = useTheme();
	const matchDownMD = useMediaQuery(theme.breakpoints.down("md"));

	return (
		<>
			<MainCard
				title={t('nearFieldsMenu')}
				secondary={
					<CardSecondaryAction
						icon={<ArrowBackIosNewTwoTone />}
						title={t('backTooltip')}
						link={"/all-fields"}
					/>
				}
				transparent
				contentSX={{ p: matchDownMD && 0, m: matchDownMD && 0}}
			>
				<Typography
					fontSize={"18px"}
					fontWeight={700}
					px={ '10px'}
					marginTop={"20px"}
					marginBottom={"5px"}
					color={"rgba(55, 174, 15, 1)"}
				>
					{t('fieldsNearLabel')}
				</Typography>
				<Box sx={{
						minHeight: "300px",
						width: "100%",
						display: "flex",
						pt: 1,
						gap: 2,
						flexDirection: 'column',
						alignItems: "start",
						justifyContent: "start",
						bgcolor: "transparent",
						color: (theme) =>
							theme.palette.mode === "dark" ? "grey.300" : "grey.800",
						borderColor: (theme) =>
							theme.palette.mode === "dark" ? "grey.800" : "grey.300",
					}}
				>
					<NearFieldsTable />
				</Box>
			</MainCard>
		</>
	);
};
export default NearFields;
