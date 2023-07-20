import React, { useState, useEffect } from 'react';
import { Typography, Box, Button, Tooltip, useMediaQuery } from '@mui/material';
import StyledTable from 'ui-component/table/StyledTable';
import Avatar from 'ui-component/extended/Avatar';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { Delete } from '@mui/icons-material';
import { kickPlayer } from 'store/actions/matchesActions';
import PositionComp from 'ui-component/positionComp/PositionComp';

// translation
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/styles';

const tableColumns = [
	{
		key: 'name',
		label: 'nameLabel',
		width: '40%',
		align: 'left',
	},
	{
		key: 'position',
		label: 'roleLabel',
		width: '40%',
		align: 'left',
	},
	{
		key: 'actions',
		label: 'actionsLabel',
		width: '20%',
		align: 'left',
	},
];

const AcceptedComp = (props) => {

	const theme = useTheme();
	const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

	const { data, matchId, ownerId} = props;
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const [rows, setRows] = useState([]);
	const [isDisabled, setIsDisabled] = useState(false);
	const loading = useSelector(state=> state?.matchesState?.loading);
	const loadingExit = useSelector(state=> state?.matchesState?.loadingExit);

	const userId = useSelector((state)=> state?.playerState?.player?._id);

	const kickMember = useCallback((idPlayer) => {
		const data = {matchId: `${matchId}`, playerId: `${idPlayer}`};
		dispatch(kickPlayer(data))
	},[dispatch, matchId])

	const disableButton = useCallback(() => {
			!loadingExit && ownerId === userId ? setIsDisabled(false) : setIsDisabled(true);
	}, [userId, ownerId, loadingExit])

	useEffect(() => {
		async function workArray() {
			const myData = await data?.map((el) => {
				return {
					...el,
					name: <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1}} >
							<Avatar src={`${el?.playerAvatar}`}/>
							<Typography>
								{el?.playerName}
							</Typography>
						</Box> ,
					position: <PositionComp positions={el?.playerPosition} />,
					actions: <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', gap: 2}}>
							<Tooltip title={t('kickPlayerTooltip')} >
								<Button variant="outlined" 
								disabled={isDisabled} color={'error'}
								sx={{ color:`${isDisabled && '#969696!important'}`}}
								onClick={()=>kickMember(el?.playerId)}>
									<Delete />
								</Button>
							</Tooltip>
						</Box>
				};
			});
			return myData;
		}
		data && workArray().then((res) => setRows(res));
		// eslint-disable-next-line
	}, [data, isDisabled, kickMember]);

	useEffect(() => {
		disableButton()
	}, [disableButton])
	
	return (
		<>
			<Box display='flex' flexDirection='column' justifyContent='space-between' alignItems={'center'} minWidth={matchDownSM ? '100%' : '500px'}
			 	minHeight={'400px'} sx={{ backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #E8E9EB'}} >
				<Box sx={{ m:0, p:0,  width: '100%'}} >
                    <Typography sx={{ fontSize: '16px', fontWeight: 700, width: '100%', textAlign: 'left', p: '20px 0px 10px 15px', color: '#000'}}>
                        {t('acceptedTableTitle')}
					</Typography>
					<Typography sx={{ fontSize: '12px',  width: '100%', textAlign: 'left', p: '0px 0px 10px 15px', borderBottom: '1px solid rgba(224, 224, 224, 1)'}}>
						{t('acceptedTableDescription')}
					</Typography>
					<StyledTable name={'ACCEPTED'} noContentMessage={t('acceptedGetError')} loading={loading} data={{ rows: rows, columns: tableColumns }} />
				</Box>
			</Box>
		</>
	);
};

AcceptedComp.propTypes = {
    data: PropTypes.array,
	matchId: PropTypes.string,
	ownerId: PropTypes.string,
}
export default AcceptedComp;
