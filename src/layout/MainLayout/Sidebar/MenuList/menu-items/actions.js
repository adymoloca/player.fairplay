// assets
import {
    Info,
    AddBox,
    LiveHelp
} from '@mui/icons-material';

// constant
const icons = { Info, AddBox, LiveHelp };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const actions = {
    id: 'action',
    title: '',
    type: 'group',
    children: [
        {
            id: 'faq',
            title: 'FAQ',
            type: 'item',
            url: '/faq',
            icon: icons.LiveHelp,
            breadcrumbs: false,
        },
        {
            id: 'info',
            title: 'infoMenu',
            type: 'item',
            url: '/info',
            icon: icons.Info,
            breadcrumbs: false,
        },
        {
            id: 'create-a-ticket',
            title: 'ticketMenu',
            type: 'item',
            url: '/create-a-ticket',
            icon: icons.AddBox,
            breadcrumbs: false,
        },
    ],
};

export default actions;
