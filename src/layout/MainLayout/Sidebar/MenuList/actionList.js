// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import menuItem from './menu-items'
// ==============================|| SIDEBAR MENU LIST ||============================== //

const ActionList = () => {
    const navItems = menuItem.actions.map((item) => {
        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item} />;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu actions Error
                    </Typography>
                );
        }
    });

    return <>{navItems}</>;
};

export default ActionList;
