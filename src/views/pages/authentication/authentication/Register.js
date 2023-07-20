import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, useMediaQuery } from '@mui/material';

// project imports
import AuthWrapper from '../AuthWrapper';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthRegister from '../auth-forms/AuthRegister';
import AuthCardWrapperLogo from "../AuthCardWraperLogo";
import GridLang from '../GridLang';
import GridCopy from '../GrigCopy';

// translation
import { useTranslation } from 'react-i18next';

import PerfectScrollbar from 'react-perfect-scrollbar';

// ===============================|| AUTH - REGISTER ||=============================== //

const Register = () => {
	const theme = useTheme();
	const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
	const { t } = useTranslation();

	return (
		<AuthWrapper>
			<AuthCardWrapper>
				<GridLang >
					<Typography component={Link} to={'/login'} sx={{ cursor: 'pointer', textDecoration: 'underline', color: '#000' }}>
						{t('returnLogin')}
					</Typography>
				</GridLang>
				<Grid item
					xs={12}
					md={8}
					height={'80%'}
					container
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
										sx={{ fontWeight: '500', fontSize: '30px' }}
										gutterBottom
										variant={matchDownSM ? "h3" : "h2"}
									>
										{t('singUp')}
									</Typography>
								</Stack>
							</Grid>
						</Grid>
					</Grid>
					
					<PerfectScrollbar style={{ height: '100%', maxHeight: 'calc(100vh - 205px)', overflowX: 'hidden' }} >
						<Grid item xs={12} sx={{ px: '20px'}}>
							<AuthRegister />
						</Grid>
					</PerfectScrollbar>

				</Grid>
			</AuthCardWrapper>
			<GridCopy />
			<AuthCardWrapperLogo />
		</AuthWrapper >
	);
};

export default Register;
