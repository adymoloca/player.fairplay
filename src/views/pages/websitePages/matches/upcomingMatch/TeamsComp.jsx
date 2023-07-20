import React, { useState, useEffect } from 'react';
import { Typography, Box, useMediaQuery } from '@mui/material';
// import { useDispatch } from 'react-redux';
import StyledButton from 'ui-component/button/button';
import StyledTable from 'ui-component/table/StyledTable';
import Avatar from 'ui-component/extended/Avatar';
import PropTypes from 'prop-types';
import { chooseTeam } from 'store/actions/matchesActions';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import PositionComp from 'ui-component/positionComp/PositionComp';

// translation
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/styles';

const tableColumns = [
	{
		key: 'no',
		label: 'NR.CRT.',
		width: '20%',
		align: 'left',
	},
	{
		key: 'name',
		label: 'nameLabel',
		width: '60%',
		align: 'left',
	},
	{
		key: 'position',
		label: 'roleLabel',
		width: '20%',
		align: 'left',
	},
];

const TeamsComp = (props) => {

	const theme = useTheme();
	const matchDownMD = useMediaQuery(theme.breakpoints.down("md"));
	const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

	const { data, matchId, loading, teamSize} = props;
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const [rows, setRows] = useState([]);
	const [isDisabled, setIsDisabled] = useState(false);

	const loadingTeam = useSelector((state)=>state?.matchesState?.loadingJoinTeam);
	const userId = useSelector((state)=> state?.playerState?.player?._id);

	const handleJoinTeam = ( idTeam) => {
		const data = {matchId: `${matchId}`, teamId: `${idTeam}`};
		dispatch(chooseTeam(data))
	}

	const disableJoinTeam = useCallback(() => {
			data?.players?.find( e => e.playerId === userId) || data?.players?.length >= teamSize ? setIsDisabled(true) : setIsDisabled(false);
	}, [userId, data, teamSize])

	useEffect(() => {
		async function workArray() {
			const myData = await data?.players?.map((el, index) => {
				return {
					...el,
					no: <Typography>{`${index + 1}`}</Typography>,
					name: <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1}} >
							<Avatar src={`${el?.playerAvatar}`}/>
							<Typography>
								{el?.playerName}
							</Typography>
						</Box> ,
					position: <PositionComp positions={el?.playerPosition} />,
				};
			});
			return myData;
		}
		data && workArray().then((res) => setRows(res));
	}, [data]);

	useEffect(() => {
		disableJoinTeam()
	}, [disableJoinTeam])
	

	return (
		<>
			<Box display='flex' flexDirection='column' justifyContent='space-between' alignItems={'center'} minWidth={matchDownSM ? '100%' : '500px'} maxWidth={'600px'} 
				minHeight={'450px'} sx={{ backgroundColor: '#fff', borderRadius: '10px', border: matchDownMD ? '1px solid #E8E9EB' : 'none'}} >
				<Box sx={{ m:0, p:0, width: '100%'}} >
				<Typography sx={{ fontSize: matchDownMD ? '1.2em' : '1.5em', fontWeight: 700, width: '100%', textAlign: 'left', p: matchDownMD? '20px 0px 10px 15px' : '20px 0px 10px 40px', borderBottom: '1px solid rgba(224, 224, 224, 1)', color: '#000'}}>
					{t('teamLabel')} {data?.teamName?.split(' ')[1]}
					</Typography>
					<StyledTable name={'matches'} noContentMessage={t('noTeamMembers')} loading={loading} data={{ rows: rows, columns: tableColumns }} />
				</Box>
				<Box sx={{  borderTop: '1px solid rgba(224, 224, 224, 1)', width: '100%', display: 'flex', justifyContent: 'center' }} >
				<StyledButton 
					handleClick={()=> handleJoinTeam(data?._id )}
					loading={loadingTeam}
					disabled={isDisabled}
					name='join-team' 
					label={t('joinATeam')} 
					width={matchDownMD? '200px' : '300px'} 
					sx={{ m: 2}} />
				</Box>
			</Box>
		</>
	);
};

TeamsComp.propTypes = {
    data: PropTypes.object.isRequired,
	matchId: PropTypes.string.isRequired,
	loading: PropTypes.bool,
	teamSize: PropTypes.number,
}
export default TeamsComp;
