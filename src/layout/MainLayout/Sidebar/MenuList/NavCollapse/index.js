import PropTypes from 'prop-types';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';

// project imports
import NavItem from '../NavItem';

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ActiveMenuBox from 'ui-component/ActiveMenuBox/ActiveMenuBox';

// translation
import { useTranslation } from 'react-i18next';

// ==============================|| SIDEBAR MENU LIST COLLAPSE ITEMS ||============================== //

const NavCollapse = ({ menu, level }) => {
    const theme = useTheme();
    const location = useLocation();
    const listItmRef = useRef(null);
	const { t } = useTranslation();

    const customization = useSelector((state) => state.customization);

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);

    const isItemInMenu = useCallback(() => {
        menu?.children?.map((obj) => {
            const values = Object.values(obj);
            ((values.includes(customization?.isOpen[0]) && values.includes(location?.pathname?.replace('/', ''))) ||
                open) &&
                listItmRef?.current?.click();
            return obj;
        });
        // eslint-disable-next-line
    }, [customization?.isOpen, location?.pathname, menu?.children]);

    useEffect(() => {
        isItemInMenu();
    }, [isItemInMenu]);

    const handleClick = () => {
        setOpen(!open);
        setSelected(!selected ? menu.id : null);
    };

    // menu collapse & item
    const menus = menu?.children?.map((item) => {
        switch (item?.type) {
            case 'collapse':
                return <NavCollapse key={item?.id} menu={item} level={level + 1} />;
            case 'item':
                return <NavItem key={item?.id} item={item} level={level + 1} />;
            default:
                return (
                    <Typography key={item?.id} variant='h6' color='error' align='center'>
                        Menu Items Error
                    </Typography>
                );
        }
    });

    const Icon = menu.icon;
    const menuIcon = menu.icon ? (
        <Icon strokeWidth={1.5} size='1.3rem' style={{ marginTop: 'auto', marginBottom: 'auto' }} />
    ) : (
        <FiberManualRecordIcon
            sx={{
                width: selected === menu.id ? 8 : 6,
                height: selected === menu.id ? 8 : 6,
            }}
            fontSize={level > 0 ? 'inherit' : 'medium'}
        />
    );

    return (
        <> 
            <ListItemButton
                sx={{
                    mb: 0.5,
                    alignItems: 'flex-start',
                    backgroundColor: 'inherit',
                    py: level > 1 ? 1 : 1.25,
                    position: 'relative',
                    pl: `${level * 24}px`,
                }}
                selected={selected === menu.id}
                onClick={handleClick}
                ref={listItmRef}>
                {selected === menu.id && <ActiveMenuBox selected={open} />}
                <ListItemIcon sx={{ my: 'auto', minWidth: !menu.icon ? 18 : 36 }}>{menuIcon}</ListItemIcon>
                <ListItemText
                    primary={<Typography sx={{ my: 'auto', color: '#616161' }}>{t(menu.title)}</Typography>}
                    secondary={
                        menu.caption && (
                            <Typography
                                variant='caption'
                                sx={{ ...theme.typography.subMenuCaption }}
                                display='block'
                                gutterBottom>
                                {t(menu.caption)}
                            </Typography>
                        )
                    }
                />
            </ListItemButton>
            <Collapse in={open} timeout='auto'>
                <List
                    component='div'
                    disablePadding
                    sx={{
                        position: 'relative',
                        '&:after': {
                            content: "''",
                            position: 'absolute',
                            left: '32px',
                            top: 0,
                            height: '100%',
                            width: '1px',
                            opacity: 1,
                            background: theme.palette.primary.light,
                        },
                    }}>
                    {menus}
                </List>
            </Collapse>
        </>
    );
};

NavCollapse.propTypes = {
    menu: PropTypes.object,
    level: PropTypes.number,
};

export default NavCollapse;
