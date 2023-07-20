import React from "react";
import { Typography, Box, Grid, useMediaQuery } from "@mui/material";
import NearYouComp from "./matchesComponent/NearYouComp";
import AllMatchesTable from "./matchesComponent/AllMatchesTable";
import { ArrowBackIosNewTwoTone } from "@mui/icons-material";
import MainCard from "ui-component/cards/MainCard";
import CardSecondaryAction from "ui-component/cards/CardSecondaryAction";

// translation
import { useTranslation } from 'react-i18next';
import { useTheme } from "@mui/styles";

const AllMatches = () => {
	const { t } = useTranslation();

    const theme = useTheme();
    const matchDownMD = useMediaQuery(theme.breakpoints.down("md"));
    // const matchDownXL = useMediaQuery(theme.breakpoints.down("xl"));

	return (
		<>
			<MainCard
				title={t('allMatchesPageTitle')}
				transparent
				secondary={
					<CardSecondaryAction
						icon={<ArrowBackIosNewTwoTone />}
						title={t('backTooltip')}
						link={"/"}
					/>
				}
				contentSX={{ p: matchDownMD && 0, m: matchDownMD && 0}}
			>
				<Typography
					sx={{
						display: "flex",
						fontSize: "18px",
						fontWeight: "700",
						color: "#37AE0F",
						px: `${matchDownMD ? '0px' : '10px'}`,
						py: 2,
					}}
				>
					{t('nearYouMatches')}
				</Typography>
				<Box sx={{
						minHeight: "300px",
						width: "100%",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						bgcolor: "transparent",
						color: (theme) =>
							theme.palette.mode === "dark" ? "grey.300" : "grey.800",
						borderColor: (theme) =>
							theme.palette.mode === "dark" ? "grey.800" : "grey.300",
					}}
				>
					<NearYouComp />
				</Box>
				<Box>
					<Typography
						sx={{
							display: "flex",
							fontSize: "18px",
							fontWeight: "700",
							color: "#37AE0F",
							px: `${matchDownMD ? '0px' : '10px'}`,
							py: 2,
						}}
					>
						{t('allMatches')}
					</Typography>
					<Grid
						container
						justifyContent={"space-between"}
						sx={{ width: "100%" }}
					>
						<Box sx={{
								minHeight: "300px",
								width: "100%",
								display: "flex",
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
							<AllMatchesTable />
						</Box>
					</Grid>
				</Box>
			</MainCard>
		</>
	);
};

export default AllMatches;
