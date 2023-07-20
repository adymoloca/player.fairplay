import { Link } from "react-router-dom";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Grid, Stack, Typography, useMediaQuery } from "@mui/material";

// project imports
import AuthWrapper from "../AuthWrapper";
import AuthCardWrapper from "../AuthCardWrapper";
import AuthForgotPass from "../auth-forms/AuthForgotPass";
import AuthCardWrapperLogo from "../AuthCardWraperLogo";
import GridLang from "../GridLang";
import GridCopy from "../GrigCopy";

// translation
import { useTranslation } from 'react-i18next';

// ================================|| AUTH - FORGOT ||================================ //

const ForgotPass = () => {

	const theme = useTheme();
	const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
	const { t } = useTranslation();

	return (
		<AuthWrapper>
			<AuthCardWrapper>
				<GridLang >
					<Typography component={Link} to={'/login'} sx={{ cursor: 'pointer', textDecoration: 'underline', color: '#616161' }}>
						{t('returnLogin')}
					</Typography>
				</GridLang>
				<Grid item
					xs={10}
					md={8}
					lg={6}
					height={'100%'}
					container
					spacing={2}
					display='flex'
					alignItems="center"
					justifyContent="center"
				>
					<Grid item xs={12}>
						<Grid
							container
							direction={matchDownSM ? "column-reverse" : "row"}
							alignItems="center"
							justifyContent="center"
						>
							<Grid item>
								<Stack
									alignItems="center"
									justifyContent="center"
									spacing={1}
								>
									<Typography
										color='#000'
										sx={{ fontWeight: '500', fontSize: '30px'}}
										gutterBottom
										variant={matchDownSM ? "h3" : "h2"}
									>
										{t('forgotPassword')}
									</Typography>
								</Stack>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<AuthForgotPass />
					</Grid>

				</Grid>
			</AuthCardWrapper>
			<GridCopy />
			<AuthCardWrapperLogo />
		</AuthWrapper >
	);
};

export default ForgotPass;
