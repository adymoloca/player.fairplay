import { useState } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, ButtonBase, Card, Grid, InputAdornment, OutlinedInput, Popper, useMediaQuery } from '@mui/material';

// third-party
import PopupState, { bindPopper, bindToggle } from 'material-ui-popup-state';

// project imports
import Transitions from 'ui-component/extended/Transitions';

// assets
import { IconSearch, IconX } from '@tabler/icons';
import { shouldForwardProp } from '@mui/system';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { clearSetSearch, setSearch } from 'store/types/utilsTypes';
import StyledButton from 'ui-component/button/button';

// translation
import { useTranslation } from 'react-i18next';

// styles
const PopperStyle = styled(Popper, { shouldForwardProp })(({ theme }) => ({
    zIndex: 1100,
    width: '99%',
    top: '-55px !important',
    padding: '0 12px',
    [theme.breakpoints.down('sm')]: {
        padding: '0 10px'
    }
}));

const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(({ theme }) => ({
    width: 434,
    marginLeft: 16,
    paddingLeft: 16,
    paddingRight: 16,
    '& input': {
        background: 'transparent !important',
        paddingLeft: '4px !important'
    },
    [theme.breakpoints.down('lg')]: {
        width: 250
    },
    [theme.breakpoints.down('md')]: {
        width: '100%',
        marginLeft: 4,
        background: '#fff'
    }
}));

const HeaderAvatarStyle = styled(Avatar, { shouldForwardProp })(({ theme }) => ({
    ...theme.typography.commonAvatar,
    ...theme.typography.mediumAvatar,
    background: theme.palette.secondary.light,
    color: theme.palette.secondary.dark,
    '&:hover': {
        background: theme.palette.secondary.dark,
        color: theme.palette.secondary.light
    }
}));

// ==============================|| SEARCH INPUT - MOBILE||============================== //

const MobileSearch = ({ popupState }) => {
    const theme = useTheme();

    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const handleClickSearch = () => {
        navigate('/search'); 
        dispatch(setSearch(`${searchValue}`))
    }
    
    return (
        <OutlineInputStyle
            id="input-search-header"
            value={searchValue}
            onFocus={()=>dispatch(clearSetSearch())}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={t('searchInput')}
            sx={{ height: '45px', pr: 1}}
            endAdornment={
                <InputAdornment position="end">
                    <HeaderAvatarStyle variant="rounded">
                        <StyledButton name='mobile-search-burron' label={<IconSearch />} handleClick={()=>handleClickSearch()} width={65} disabled={!Boolean(searchValue?.length >2)}/>
                    </HeaderAvatarStyle>
                    <Box sx={{ ml: 2 }}>
                        <ButtonBase sx={{ borderRadius: '12px' }}>
                            <Avatar
                                variant="rounded"
                                sx={{
                                    ...theme.typography.commonAvatar,
                                    ...theme.typography.mediumAvatar,
                                    background: theme.palette.orange.light,
                                    color: theme.palette.orange.dark,
                                    '&:hover': {
                                        background: theme.palette.orange.dark,
                                        color: theme.palette.orange.light
                                    }
                                }}
                                {...bindToggle(popupState)}
                            >
                                <IconX stroke={1.5} size="1.3rem" />
                            </Avatar>
                        </ButtonBase>
                    </Box>
                </InputAdornment>
            }
            aria-describedby="search-helper-text"
            inputProps={{ 'aria-label': 'weight' }}
        />
    );
};

// ==============================|| SEARCH INPUT ||============================== //

const SearchSection = () => {
    const theme = useTheme();
    const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));

    const [value, setValue] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const handleClickSearch = () => {
        navigate('/search'); 
        dispatch(setSearch(`${value}`))
    }

    return (
        <>
            { matchDownMD &&
                <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                    <PopupState variant="popper" popupId="demo-popup-popper">
                        {(popupState) => (
                            <>
                                <Box sx={{ ml: 2 }}>
                                    <ButtonBase aria-label='search-togle-button' sx={{ borderRadius: '12px'}}>
                                        <HeaderAvatarStyle variant="rounded" {...bindToggle(popupState)}>
                                            <IconSearch stroke={1.5} size="1.2rem" />
                                        </HeaderAvatarStyle>
                                    </ButtonBase>
                                </Box>
                                <PopperStyle {...bindPopper(popupState)} transition>
                                    {({ TransitionProps }) => (
                                        <>
                                            <Transitions type="zoom" {...TransitionProps} sx={{ transformOrigin: 'center left' }}>
                                                <Card
                                                    sx={{
                                                        background: '#fff',
                                                        [theme.breakpoints.down('sm')]: {
                                                            border: 0,
                                                            boxShadow: 'none'
                                                        }
                                                    }}
                                                >
                                                    <Box sx={{ p: 2 }}>
                                                        <Grid container alignItems="center" justifyContent="space-between">
                                                            <Grid item xs>
                                                                <MobileSearch value={value} setValue={setValue} popupState={popupState} />
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </Card>
                                            </Transitions>
                                        </>
                                    )}
                                </PopperStyle>
                            </>
                        )}
                    </PopupState>
                </Box>
            }
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <OutlineInputStyle
                    id="input-search-header"
                    value={value}
                    onFocus={()=>dispatch(clearSetSearch())}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={t('searchInput')}
                    sx={{ width: '300px', height: '45px', mr: 0, pr: 1}}
                    endAdornment={
                        <InputAdornment position={'end'}>
                                <HeaderAvatarStyle variant="rounded">
                                    <StyledButton label={<IconSearch />} name={'search-button-web'} handleClick={()=>handleClickSearch()} width={65} disabled={!Boolean(value?.length >2)}/>
                                </HeaderAvatarStyle>
                        </InputAdornment>
                    }
                    aria-describedby="search-helper-text"
                    inputProps={{ 'aria-label': 'weight' }}
                />
            </Box>
        </>
    );
};

export default SearchSection;
