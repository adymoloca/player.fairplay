import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { SportsSoccer } from '@mui/icons-material';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

const BallRating = () => {
  return (
    <Box
      sx={{
        '& > legend': { mt: 0 },
      }}
    >
      <StyledRating
        readOnly
        name="customized-color"
        defaultValue={8.5}
        getLabelText={(value) => `${value} Ball${value !== 1 ? 's' : ''}`}
        precision={0.5}
        icon={<SportsSoccer fontSize="inherit" />}
        emptyIcon={<SportsSoccer fontSize="inherit" />}
        max={10}
      />
    </Box>
  );
}
 export default BallRating;