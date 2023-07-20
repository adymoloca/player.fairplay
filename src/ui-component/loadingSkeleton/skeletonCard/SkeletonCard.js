import { Box, Skeleton } from '@mui/material';
import React from 'react';

const SkeletonCard = () => {

    const element = {
        address: <Skeleton animation={'pulse'} variant="rectangular" width={250} height={40} />,
        photo: <Skeleton animation={'pulse'} variant="rectangular" width={250} height={100} />,
        hour: <Skeleton animation={'pulse'} variant="rectangular" width={100} height={20} />,
        type: <Skeleton animation={'pulse'} variant="rectangular" width={100} height={20} />,
        actions: <Skeleton animation={'pulse'} variant="rectangular" width={200} height={40} />
    }

    return (
        <>
            {Array(4).fill(element)?.map((item, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: "flex",
                            p: 3,
                            gap: 2,
                            flexDirection: "column",
                            borderRadius: "15px",
                            width: "300px",
                            height: "300px",
                            bgcolor: '#fff',
                        }}
                    >
                        {item?.address} {item?.photo}
                        <Box display={'flex'} flex={'row'} justifyContent={'space-between'}>
                            {item?.hour}{item?.type}
                        </Box>
                        <Box display={'flex'} justifyContent={'center'}>
                            {item?.actions}
                        </Box>
                    </Box>
            ))}
        </>
    )
}

export default SkeletonCard;