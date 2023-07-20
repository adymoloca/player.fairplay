import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import MainCard from "ui-component/cards/MainCard";
import { Grid, Box, Skeleton, useMediaQuery } from "@mui/material";
import TeamsComp from "./upcomingMatch/TeamsComp";
import { getMatch } from "store/actions/matchesActions";
import { useNavigate } from "react-router";
import UpcomingMatchHero from "./upcomingMatch/UpcomingMatchHero";
import PendingComp from "./upcomingMatch/PendingComp";
import AcceptedComp from "./upcomingMatch/AcceptedComp";
import ChatComp from "./upcomingMatch/ChatComp";
import InvitedComp from "./upcomingMatch/matchModalComp/InvitedComp";

import { useTheme } from "@emotion/react";
import MatchDescription from "./upcomingMatch/MatchDescription";
import ErrorPage from "ui-component/error";

const UpcomingMatch = () => {

	const theme = useTheme();
	const matchDownXL = useMediaQuery(theme.breakpoints.down("xl"));
	const matchDownMD = useMediaQuery(theme.breakpoints.down("md"));

	const upcoming = useSelector(state => state?.matchesState?.match);
	const status = useSelector(state => state?.matchesState?.joinedStatus);
	const loading = useSelector(state => state?.matchesState?.loading);
	const error = useSelector(state => state?.matchesState?.error?.status);
	const match_id = useSelector(state => state?.utilsState?.utils?.matchId);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		match_id?.length > 0 ? dispatch(getMatch(match_id)) : navigate('/all-matches');
	}, [match_id, dispatch, navigate])

	return (
		<>
			<MainCard sx={{ margin: 0, backgroundColor: matchDownMD ? '#fff' : "transparent", border: 'none', minHeight: '100vh', p: 0, position: 'relative' }} >
				{ error &&
					<Box sx={{ position: 'absolute', bottom: 0, lrft: 0, width: '100%', height: '100%'}}>
						<ErrorPage error={error} />
					</Box>
				}
				{loading ? <Skeleton variant="rectangular" width={'100%'} height={'400px'} /> : <UpcomingMatchHero data={upcoming} status={status} />}
				<Grid item xs={12}>
					{matchDownMD &&
						<MatchDescription matchDescription={`${upcoming?.matchDescription}`} />
					}
					{loading ?
						<Box display={'flex'} justifyContent={'center'} width={'100%'} sx={{ columnGap: '50px', my: 0, py: 0 }}>
							<Skeleton width={'600px'} height={'650px'} />
							<Skeleton width={'600px'} height={'650px'} />
						</Box> :
						<Box
							display="flex"
							flexDirection={matchDownMD ? 'column' : "row"}
							justifyContent={matchDownXL ? 'left' : (upcoming?.teams?.length < 3 ? 'center' : 'left')}
							alignItems={matchDownMD && 'center'}
							width={"100%"}
							marginTop={"40px"}
							sx={{ overflowX: 'scroll', gap: '50px', pb: '20px' }}
						>
							{upcoming?.teams?.map((item, index) => {
								return <TeamsComp key={`team-card-match-${index}`} data={item} loading={loading} matchId={upcoming?._id} teamSize={upcoming?.teamSize}/>
							})}
						</Box>
					}
					<Grid item xs={12} display="flex" flexDirection="row" justifyContent="space-around" marginTop={"80px"} >

						{!matchDownMD &&
							<MatchDescription matchDescription={`${upcoming?.matchDescription}`} />
						}
						<ChatComp matchId={upcoming?._id} />
					</Grid>

					<Grid item container xs={12} marginTop={"80px"} display="flex" flexDirection="row" >
						{loading ? <Skeleton variant="rectangular" width={'100%'} height={'500px'} /> :
							<Box sx={{ 
									width: "100%", minHeight: "500px",
									backgroundColor: matchDownMD? '#fff' : "transparent", borderRadius: "15px",
									display: "flex", flexDirection: matchDownMD ? 'column' : "row", gap: '50px',
									justifyContent: matchDownMD ? 'start' : (upcoming?.privateMatch ? `start` : 'center'),
									marginBottom: '50px', px: matchDownMD ? 0 : '50px', overflowX: 'scroll'
								}}
							>
								{upcoming?.privateMatch && <>

									<PendingComp data={upcoming?.pendingPlayers} matchId={match_id} ownerId={upcoming?.playerId} />

									<AcceptedComp data={upcoming?.acceptedPlayers} matchId={match_id} ownerId={upcoming?.playerId} />

								</>}

								<InvitedComp data={upcoming?.invitedPlayers} matchId={match_id} ownerId={upcoming?.playerId} />
							</Box>
						}
					</Grid>
				</Grid>
			</MainCard>
		</>
	);
};
export default UpcomingMatch;