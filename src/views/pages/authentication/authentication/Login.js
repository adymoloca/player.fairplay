// material-ui
import { useTheme } from "@mui/material/styles";
import { Grid, Stack, useMediaQuery } from "@mui/material";

// project imports
import AuthWrapper from "../AuthWrapper";
import AuthCardWrapper from "../AuthCardWrapper";
import AuthLogin from "../auth-forms/AuthLogin";
import AuthCardWrapperLogo from "../AuthCardWraperLogo";

import logo from 'assets/images/logo-fotbalist.svg';
import { Fragment } from 'react';
import GridLang from "../GridLang";
import GridCopy from "../GrigCopy";

// assets

// ================================|| AUTH - LOGIN ||================================ //

const Login = () => {
	const theme = useTheme();
	const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

	return (
		<AuthWrapper>
			<AuthCardWrapper>
{/* ***************| TOP GRID WITH LANGUAGE SETTINGS AND NAVIGATION |***************** */}
				<GridLang />

				<Grid item
					xs={10}
					md={8}
					lg={6}
					height={'100%'}
					container
					spacing={0}
					display='flex'
					alignItems="center"
					justifyContent="center"
					sx={{ m: 0, p: 0}}
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
									<Fragment>
										<img src={logo} alt="SmartBoxDigital" width={matchDownSM ? '200px' : '300px'} height={'100px'} />
									</Fragment>
								</Stack>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12} sx={{ m:0, p:'0!important'}}>
						<AuthLogin />
					</Grid>

				</Grid>
			</AuthCardWrapper>
			<GridCopy />
			<AuthCardWrapperLogo />
		</AuthWrapper >
	);
};

export default Login;
