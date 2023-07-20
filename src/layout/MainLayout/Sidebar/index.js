import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Divider, Drawer, useMediaQuery } from '@mui/material';

// third-party
import { BrowserView, MobileView } from 'react-device-detect';

// project imports
import MenuList from './MenuList';
import LogoSection from '../LogoSection';
import { drawerWidth } from 'store/constant';
import UserAvatar from 'ui-component/userAvatar/UserAvatar';
import SideBarSocial from './SideBarSocial/SideBarSocial';
import ActionList from './MenuList/actionList';

// ==============================|| SIDEBAR DRAWER ||============================== //

const Sidebar = ({ drawerOpen, drawerToggle, window }) => {
    const theme = useTheme();
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

    const drawer = (
        <Box>
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', p: { xs: 1, md: 2}, mx: 'auto' }}>
                    <LogoSection />
                </Box>
            </Box>
            <Box sx={{ display: { xs: 'block', md: 'block' } }}>
                <Box sx={{ display: 'flex',  px: 2, mx: 'auto', mt: {xs: 0 ,md: '20px'},  py: {xs: 0 , md: 2} }}>
                    <UserAvatar />
                </Box>
            </Box>
            <Divider />
            <BrowserView>
                <Box
                    style={{
                        overflow: 'scroll',
                        minHeight: '250px',
                        maxHeight: '450px',
                    }}>
                    <MenuList />
                </Box>
                <Divider />
                <Box
                    style={{
                        height: '100px', display: 'flex', alignItems: 'start'
                    }}>
                    <ActionList />
                </Box>
                <Box sx={{ position: 'absolute', bottom: '20px', left: '13px' }}>
                    <SideBarSocial />
                </Box>
            </BrowserView>
            <MobileView>
            <Box
                    style={{
                        overflow: 'scroll',
                        height: '280px',
                    }}>
                    <MenuList />
                </Box>
                <Divider />
                <Box
                    style={{
                        height: '100px', display: 'flex', alignItems: 'start'
                    }}>
                    <ActionList />
                </Box>
                <Box sx={{ position: 'absolute', bottom: '10px', left: '13px' }}>
                    <SideBarSocial />
                </Box>
            </MobileView>
        </Box>
    );

    const container = window !== undefined ? () => window.document.body : undefined;

    return (
        <Box
            component='nav'
            sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : 'auto' }}
            aria-label='mailbox folders'>
            <Drawer
                container={container}
                variant={matchUpMd ? 'persistent' : 'temporary'}
                anchor='left'
                open={drawerOpen}
                onClose={drawerToggle}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        background: theme.palette.background.default,
                        color: theme.palette.text.primary,
                        borderRight: 'none',
                    },
                }}
                ModalProps={{ keepMounted: true }}
                color='inherit'>
                {drawer}
            </Drawer>
        </Box>
    );
};

Sidebar.propTypes = {
    drawerOpen: PropTypes.bool,
    drawerToggle: PropTypes.func,
    window: PropTypes.object,
};

export default Sidebar;
