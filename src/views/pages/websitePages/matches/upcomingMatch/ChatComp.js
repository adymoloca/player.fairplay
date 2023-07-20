import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Box, Divider, IconButton, Typography, useMediaQuery } from '@mui/material';
import PropTypes from 'prop-types';
import { socket } from 'App';
import { useSelector } from 'react-redux';
import StyledOutlinedInput from 'ui-component/input/outlinedInput';
import { useTheme } from '@mui/styles';
import { MoreHoriz, Send, SentimentSatisfied } from '@mui/icons-material';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { requestAdmin } from 'utils/axios/axios-config';
import _ from 'lodash';

const ChatComp = (props) => {
    const { matchId } = props;
	const theme = useTheme();
	const matchDownMD = useMediaQuery(theme.breakpoints.down("md"));
	const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

    const socketLastPong = useSelector((state) => state?.utilsState?.utils?.socketLastPong);
    const [messages, setMessages] = useState([]);
    const [avatars, setAvatars] = useState([]);
    const [roomUsers, setRoomUsers] = useState([]);
    const [inputs, setInputs] = useState({ newMessage: '' });
    const [ showEmojiPicker, setShowEmojiPicker ] = useState(false)
    const room = matchId;
    const username = useSelector((state) => state?.playerState?.player?.username);
    const playerId = useSelector((state) => state?.playerState?.player?._id);

    const playerAvatar = useSelector((state) => state?.playerState?.player?.avatar);
    const messagesEndRef = useRef(null);
    const today = new Date();

    const sendMessage = () => {
        setShowEmojiPicker(false);
        setInputs((prev) => ({ ...prev, newMessage: '' }));
        socket.emit('send_message', {
            message: inputs?.newMessage,
            username: username,
            playerId: playerId,
            room: room,
            time: new Date().toISOString(),
        });
    };
    
    useEffect(() => {
        socket.emit('join_room', { username, room: room });
        socket.on('room_messages', (mess) => {
            setMessages(mess);
        });
    }, [room, username]);

    useEffect(()=> {
        const usrs = messages?.map( el => el?.playerId)
        setRoomUsers(_.uniq(usrs).filter(el => el !== playerId) || [])
    }, [messages, playerId])

    useEffect(()=> {
        (async function() {
            const avatars = []
            for(let i = 0; i < roomUsers.length; i++){
                requestAdmin.get(`get-player/${roomUsers[i]}/avatar`).then(res => avatars.push({userAvatar: res?.data?.player?.avatar, userId: roomUsers[i]})).catch(() => '')
            }
            roomUsers.forEach(async (el) => {
            })
            return avatars;
        })().then(avatars => setAvatars(avatars))
    }, [roomUsers])

    useEffect(() => {
        messagesEndRef?.current?.addEventListener('DOMNodeInserted', (event) => {
            const { currentTarget: target } = event;
            target?.scroll({ top: target.scrollHeight, behavior: 'smooth' });
        });
    }, []);

    return (
        <>
            <Box
                sx={{
                    width: matchDownMD ? '100%' : '60%',
                    backgroundColor: matchDownMD? '#F9F9FC' : 'rgba(255, 255, 255, 1)',
                    height: '600px',
                    position:'relative',
                    borderRadius: '15px',
                }}>

                    {/* ***************| EMIJI PICKER |*************** */}

                    <Box sx={{display: `${showEmojiPicker ? 'flex' : 'none'}`, width: '100%', position: 'absolute', 
                        left: {sm: '0' ,md:'10px'}, bottom: matchDownSM ? '-430px' : '70px'}}
                        >
                        <Picker perLine={matchDownSM ? (6 + (window.innerWidth > 400 && ( window.innerWidth <500 ? 2 : 6))) : 12} previewPosition={ matchDownMD ? 'none' : 'bottom'} data={data} 
                            onEmojiSelect={(e, prev)=> setInputs({...prev, newMessage:`${(inputs?.newMessage || '') + e.native}`})} 
                        />
                    </Box>

                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} pr={2}>
                    <Typography padding={'10px'} fontSize={'16px'} fontWeight={'500'} width={'40%'}>
                        Chat
                    </Typography>
                    <MoreHoriz
                        fontSize='large'
                        sx={{ color: `${socketLastPong === 'connected' ? '#37AE0F' : '#969696'}` }}
                    />
                </Box>
                <Box
                    sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '560px' }}>
                    <Divider />
                    <Box
                        ref={messagesEndRef}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '560px',
                            overflowY: 'scroll',
                            overflowX: 'hidden',
                            gap: '20px',
                            padding: '20px',
                        }}>
                        {Array.isArray(messages) &&
                            messages?.map((el) => (
                                <Box
                                    sx={{
                                        maxWidth: '100%',
                                        display: 'flex',
                                        alignItems: 'end',
                                        gap: '20px',
                                        justifyContent: `${el?.username === username ? 'end' : 'start'}`,
                                        flexDirection: `${el?.username === username ? 'row-reverse' : 'row'}`,
                                        flexWrap: 'nowrap',
                                        textOverflow: 'ellipsis'
                                    }}
                                    key={el?._id}>
                                    <Box sx={{ mb: '20px'}} >
                                        <Avatar src={`${el?.username === username ? playerAvatar : avatars?.filter(avatarsEl => avatarsEl?.userId === el?.playerId)[0]?.userAvatar }`} />
                                    </Box>
                                    <Box >
                                        <Typography sx={{ width: '100%', textAlign: `${ el?.username === username ? 'left' : `right` }`,
                                            padding: `${ el?.username === username ? '0 0 3px 20px' : '0 20px 3px 0'}`, fontSize: '10px', color: '#969696'
                                        }}> 
                                            {el?.username}
                                        </Typography>
                                    <Box
                                        sx={{
                                            maxWidth: '400px',
                                            backgroundColor: `${
                                                el?.username === username ? 'white' : `${theme.palette.primary.main}`
                                            }`,
                                            p: '15px 20px',
                                            borderRadius: `${
                                                el?.username === username ? '20px 20px 0px 20px' : '20px 20px 20px 0px'
                                            }`,

                                            border: '1px solid #E8E9EB',
                                        }}>
                                        <Typography
                                            style={{
                                                color: `${el?.username === username ? '#000' : '#fff'}`,
                                                fontSize: '15px',
                                                textOverflow: "ellipsis", overflow: "hidden", maxWidth: '100%' 
                                            }}>
                                            {el?.message}
                                        </Typography>
                                    </Box>
                                        <Typography sx={{ textAlign: `${ el?.username === username ? 'left' : `right` }`,
                                            padding: `${ el?.username === username ? '3px 0 0 20px' : '3px 20px 0 0'}`, fontSize: '10px', color: '#969696'}}> 
                                            {("0" + today.getHours()).slice(-2) + ":" + ("0" + today.getMinutes()).slice(-2) + " - " + ("0" + today.getDate()).slice(-2) + "/" + ("0"+(today.getMonth()+1)).slice(-2)}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}
                    </Box>
                    <Box
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                            width: '100%',
                            position: 'relative',
                            borderTop: '1px solid #E8E9EB',
                        }}>
                        <Box maxWidth={'10%'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <SentimentSatisfied sx={{ cursor: 'pointer' }} onClick={()=> setShowEmojiPicker(!showEmojiPicker)} />
                        </Box>
                        <Box width={'70%'}>
                            <StyledOutlinedInput
                                onKeyDown={(e) =>{ showEmojiPicker && setShowEmojiPicker(false); e?.key === 'Enter' && sendMessage()}}
                                name='newMessage'
                                values={inputs}
                                setValues={setInputs}
                                inputLength={4096}
                            />
                        </Box>
                        <Box maxWidth={'15%'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <IconButton
                                variant='contained'
                                onClick={sendMessage}
                                disabled={Boolean(inputs?.newMessage?.length === 0 || inputs?.newMessage?.trim() === '')}
                            >
                                <Box sx={{border: '1px solid #c5c5c5', width: '40px', height: '40px ', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent:'center',
                                    backgroundColor: !Boolean(inputs?.newMessage?.length === 0 || inputs?.newMessage?.trim() === '') ? `${theme.palette.secondary.dark}` : '#F9F9FC'
                                }}>
                                    <Send sx={{m: '0 0 2px 2px', transform: 'rotate(-50deg)',
                                        fill: !Boolean(inputs?.newMessage?.length === 0 || inputs?.newMessage?.trim() === '') ? '#fff' : '#c5c5c5'
                                    }}  fontSize='small' />
                                </Box>
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

ChatComp.propTypes = {
    matchId: PropTypes.string,
};

export default ChatComp;
