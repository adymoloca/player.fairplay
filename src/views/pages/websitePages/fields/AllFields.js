import React from "react";
import MainCard from "ui-component/cards/MainCard";
import CardSecondaryAction from "ui-component/cards/CardSecondaryAction";
import { ArrowBackIosNewTwoTone } from "@mui/icons-material";
import NearFieldsCard from "./fieldsComp/NearFieldsCard";
import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import AllFieldsTable from "./fieldsComp/AllFieldsTable";

// translation
import { useTranslation } from 'react-i18next';
import { useTheme } from "@mui/styles";

const AllFields = () => {
	const { t } = useTranslation();
    const theme = useTheme();
	const matchDownMD = useMediaQuery(theme.breakpoints.down("md"));

	return (
		<>
			<MainCard
				title={t('allFieldsMenu')}
				transparent
				contentSX={{ p: matchDownMD && 0, m: matchDownMD && 0}}
				secondary={
					<CardSecondaryAction
						icon={<ArrowBackIosNewTwoTone />}
						title={t('backTooltip')}
						link={"/"}
					/>
				}
			>
					<Typography
						sx={{
							display: "flex",
							fontSize: "18px",
							fontWeight: "700",
							color: "#37AE0F",
							px: '10px',
							pt: 2,
						}}
					>
						{t('fieldsNearLabel')}
					</Typography>
					<Box
						sx={{
							minHeight: "300px",
							width: "100%",
							display: "flex",
							py: 1,
							bgcolor: "transparent",
							color: (theme) =>
								theme.palette.mode === "dark" ? "grey.300" : "grey.800",
							borderColor: (theme) =>
								theme.palette.mode === "dark" ? "grey.800" : "grey.300",
						}}
					>
						<NearFieldsCard />
					</Box>
				<Box>
					<Typography
						sx={{
							display: "flex",
							fontSize: "18px",
							fontWeight: "700",
							color: "#37AE0F",
							px: '10px',
							py: 2,
						}}
					>
						{t('allFieldsLabel')}
					</Typography>
					<Grid
						container
						justifyContent={"space-between"}
						sx={{ width: "100%" }}
					>
						<Box
							sx={{
								minHeight: "300px",
								width: "100%",
								display: "flex",
								gap: 2,
								flexDirection: 'column',
								alignItems: "start",
								justifyContent: "center",
								bgcolor: "transparent",
								color: (theme) =>
									theme.palette.mode === "dark" ? "grey.300" : "grey.800",
								borderColor: (theme) =>
									theme.palette.mode === "dark" ? "grey.800" : "grey.300",
							}}
						>
							<AllFieldsTable />
						</Box>
					</Grid>
				</Box>
			</MainCard>
		</>
	);
};

export default AllFields;
