import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Box, Typography } from '@mui/material'
import PositionComp from 'ui-component/positionComp/PositionComp'

const MobileSeacrhPlayerCard = (props) => {
    const { playerAvatar, playerName, playerPositions, cardButtons} = props
  return (
    <Box sx={{ width: '100%', minHeight: '60px', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1, py: 2, borderBottom: '1px solid #DDD'}}>
        <Avatar variant='rounded' sx={{ width: '55px', height: '55px', m: '5px'}} alt={'player-avatar'} src={playerAvatar} />
        <Box sx={{width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 1}}>
            <Box sx={{width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', pr: 1}}>
                <Typography sx={{ width: '120px'}} noWrap textOverflow={'ellipsis'}>{playerName}</Typography>
                <PositionComp positions={playerPositions} />
            </Box>
            <Box sx={{width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'start', gap: 1}}>
                {cardButtons()}
            </Box>
        </Box>
    </Box>
  )
}

MobileSeacrhPlayerCard.propTypes = {
    playerAvatar: PropTypes.string,
    playerName: PropTypes.string,
    cardButtons: PropTypes.func,
    playerPositions: PropTypes.array,
}

export default MobileSeacrhPlayerCard;