import { Close, Error } from '@mui/icons-material';
import { Avatar, CircularProgress, Divider, IconButton, InputAdornment, Modal, OutlinedInput, Tooltip, Typography, useMediaQuery } from '@mui/material';
import { Box, useTheme } from '@mui/system';
import { IconSearch } from '@tabler/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFriendsMatch } from 'store/actions/friendsActions';
import { invitePlayer } from 'store/actions/invitePlayerActions';
import { getPlayerMatch } from 'store/actions/searchActions';
import { clearErrorSearch, clearSearchedPlayers } from 'store/types/searchTypes';
import StyledButton from 'ui-component/button/button';
import useDebounce from 'utils/hooks/useDebounce';

// translation
import { useTranslation } from 'react-i18next';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '500px',
    minWidth: '300px',
    minHeight: '600px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '12px',
    p: 2,
};


const InviteModal = (props) => {
    const { open, setOpen, matchOwner } = props;

    const theme = useTheme();
	const matchDownMD = useMediaQuery(theme.breakpoints.down("sm"));

    const dispatch = useDispatch();
	const { t } = useTranslation();
    const [value, setValue ]= useState('');
    const valueDebounced = useDebounce(value)
    const userId = useSelector((state)=>state?.playerState?.player?._id)

    const searchedPlayer = useSelector((state) => state?.searchState?.playerUsername)
    const loadingSearch = useSelector((state) => state?.searchState?.loading)

    const friends = useSelector((state)=>state?.friendsState?.matchFriends)
    const friendsLoading = useSelector((state)=>state?.friendsState?.loading)
    const friendsError = useSelector((state)=>state?.friendsState?.error)

    const matchId = useSelector((state)=>state?.matchesState?.match?._id)
    const invitationLoading = useSelector((state)=>state?.invitationState?.loading)

    const handleClickSearch = () => {
        dispatch(getPlayerMatch(valueDebounced))
    }

    const handleClose = () => {
        setOpen();
        setValue('');
        dispatch(clearSearchedPlayers())
        dispatch(clearErrorSearch())
    }

    const handleInvite = (matchId, playerId) => {
        const data = {matchId, playerId}
        dispatch(invitePlayer(data, ()=> dispatch(getPlayerMatch(matchId, valueDebounced))))
    }

    const handleInviteFriend = (matchId, playerId) => {
        const data = {matchId, playerId}
        dispatch(invitePlayer(data, ()=> dispatch(getFriendsMatch(matchId))))
    }

    useEffect(() => {
        valueDebounced?.length > 1 && dispatch(getPlayerMatch(matchId, valueDebounced))
    }, [dispatch, valueDebounced, matchId])

    useEffect(() => {
        matchOwner === userId && matchId && dispatch(getFriendsMatch(matchId))
    }, [dispatch, matchId, matchOwner, userId])
    

    return (
        <>
            <Modal open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-invite-player-title"
                aria-describedby="modal-modal-invite-player-content"
            >
                <Box sx={{ ...style, border: `2px solid ${theme.palette.secondary.dark}`, width: matchDownMD ? '100%' : '500px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center'}} >
                        <Typography id="modal-modal-invite-player-title" sx={{ fontSize: '24px', fontWeight: '700', ml: '8px', color: `${theme.palette.secondary.main}` }}>
                            {t('invitePlayersTitle')}
                        </Typography>
                        <IconButton onClick={()=>handleClose()}>
                            <Close sx={{ fontSize: '30px'}} />
                        </IconButton>
                    </Box>
                    <OutlinedInput
                        id="input-invite-player"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder={t('invitePlayersInput')}
                        sx={{ width: matchDownMD ? '100%' : '450px', height: '45px', m: '20px 0 10px'}}
                        endAdornment={
                            <InputAdornment position={'end'}>
                                <Divider sx={{ height: 45, borderColor: 'rgba(133,133,133, 0.8)' }} orientation="vertical" />
                                    <IconSearch onClick={()=>handleClickSearch()} style={{ marginLeft: '10px', cursor: 'pointer'}}/>
                            </InputAdornment>
                        }
                        aria-describedby="invite-player-helper-text"
                        inputProps={{}}
                    />
                    <Box sx={{ width: matchDownMD ? '100%' : '450px', height:'380px',px: '10px', overflowY: 'scroll', mb:2}}>
                        { loadingSearch ? 
                            <Box sx={{width: '100%', height: '60px', display: 'flex', justifyContent: 'center'}}>
                                <CircularProgress size={'30px'} />
                            </Box> : <>
                            { searchedPlayer?.length === 0 ? 
                                <Box sx={{width: '100%', height: '30px', display: 'flex', justifyContent: 'start', alignItems: 'center', gap: '10px'}}>
                                    <Error sx={{ fontSize: '30px'}}/>
                                    <Typography sx={{ width: matchDownMD ? '100%' : '450px'}}> {t('noPlayerFoundError')}</Typography>
                                </Box> :
                                (searchedPlayer?.map((player)=>{
                                    return (<Box key={player?._id} sx={{ width: '100%', height: '60px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                                <Tooltip  placement="bottom" title={player?.position.join(', ')}>
                                                    <Box sx={{ width: '50%', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '15px'}}>
                                                        <Avatar src={player?.avatar} />
                                                        <Typography >{player?.firstName}{' '}{player?.lastName}</Typography>
                                                    </Box>
                                                </Tooltip>
                                                <StyledButton width={'120px'} name='invite-button' loading={invitationLoading} label={t('inviteButton')} 
                                                    handleClick={()=>handleInvite(matchId, player?._id)} disabled={player?.invited || player?.joined || player?.inPending} variant={'primary'} 
                                                />
                                            </Box>
                                        )
                                    })
                                )
                            }
                        </>}
                        <Divider >{t('friendsModalTitle')}</Divider>
                        { friendsLoading ? 
                            <Box sx={{width: '100%', height: '60px', display: 'flex', justifyContent: 'center'}}>
                                <CircularProgress size={'30px'} />
                            </Box> : <>
                            { friendsError?.status || friends?.length === 0 ? 
                                <Box sx={{width: '100%', height: '30px', display: 'flex', justifyContent: 'start', alignItems: 'center', gap: '10px'}}>
                                    <Error sx={{ fontSize: '30px'}}/>
                                    <Typography sx={{ width: matchDownMD ? '100%' : '400px'}}> {friends?.length === 0 && !friendsError?.status && `${t('friendsGetError')}`}{friendsError?.status && `${t('networkError')}`}</Typography>
                                </Box> :
                                (friends?.map((friend)=>{
                                    return (<Box key={`friend-${friend?._id}`} sx={{ width: '100%', height: '60px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                                <Box sx={{ width: '50%', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '15px'}}>
                                                    <Avatar src={friend?.avatar} />
                                                    <Typography >{friend?.firstName}{' '}{friend?.lastName}</Typography>
                                                </Box>
                                                <StyledButton width={'120px'} name='invite-button' loading={invitationLoading} disabled={friend?.invited || friend?.joined || friend?.inPanding}
                                                    label={t('inviteButton')} handleClick={()=>handleInviteFriend(matchId, friend?._id)} variant={'primary'} 
                                                />
                                            </Box>
                                        )
                                    })
                                )
                            }
                        </>}
                    </Box>
                    <Box sx={{ width: matchDownMD ? '100%' : '450px', height:'60px', pr: '15px', display: 'flex', alignItems: 'center', justifyContent: 'end', borderTop: '1px solid rgba(133,133,133,0.4)'}}>
                        <StyledButton width={'120px'} name='done-button' label={t('doneButton')} handleClick={()=>handleClose()} variant={'primary'} />
                    </Box>
                </Box>
            </Modal>
        </>
    )
}

export default InviteModal;