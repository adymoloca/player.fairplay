import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Grid, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/styles';

const PlayerProfileSlider = (props) => {

    const theme = useTheme();
	const matchDownMD = useMediaQuery(theme.breakpoints.down("md"));
	const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

    const {
        arr, 
        styledChild,
    } = props

    const settings = {
        dots: true,
        pauseOnHover: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 4000,
        slidesToShow: matchDownSM ? 1 : (matchDownMD ? 2 : 3),
        slidesToScroll: 1,
        cssEase: "linear",
    };

    return (
        <Grid item container xs={12} justifyContent={'center'}>
            <Slider {...settings} style={{width: '95%', height:`${matchDownSM ? 'auto' : (matchDownMD ? '300px' : '400px')}`, margin: '30px', display: 'flex', alignItems: 'center'}}>
                {arr.map((item, index)=>{
                    return(
                        <div key={`slider-image-card-${index}`} style={{ width: '30%' }}>
                            <Box 
                                component={'img'}
                                sx={{ ...styledChild,
                                    height: 'auto',
                                    width: '90%', 
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                    mx: 'auto',
                                }} 
                                src={item?.src}
                                alt={item.alt}
                            >
                            </Box>
                        </div>
                    )
                })}
            </Slider>
        </Grid>
    );
}

export default PlayerProfileSlider;