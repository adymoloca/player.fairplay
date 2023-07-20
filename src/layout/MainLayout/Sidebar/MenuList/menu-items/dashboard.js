// assets
import {
    SportsSoccer,
    PeopleAlt,
    Stadium,
    Dashboard,
    Settings,
    Chat,
} from '@mui/icons-material';

// constant
const icons = { SportsSoccer, PeopleAlt, Stadium, Dashboard, Settings, Chat };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: '',
    type: 'group',
    children: [
        {
            id: '',
            title: 'Dashboard',
            type: 'item',
            url: '/',
            icon: icons.Dashboard,
            breadcrumbs: false,
        },
        {
            id: 'matches',
            title: 'matchesMenu',
            type: 'collapse',
            icon: icons.SportsSoccer,
            breadcrumbs: false,
            children: [
                {
                    id: 'all-matches',
                    title: 'allMatchesMenu',
                    type: 'item',
                    url: 'all-matches',
                },
                {
                    id: 'matches-near-you',
                    title: 'nearMatchesMenu',
                    type: 'item',
                    url: 'matches-near-you',
                },
                {
                    id: 'create-match',
                    title: 'createMatchMenu',
                    type: 'item',
                    url: 'create-match',
                },
            ],
        },
        {
            id: 'fields',
            title: 'fieldsMenu',
            type: 'collapse',
            url: '/fields',
            icon: icons.Stadium,
            breadcrumbs: false,
            children: [
                {
                    id: 'all-fields',
                    title: 'allFieldsMenu',
                    type: 'item',
                    url: 'all-fields',
                },
                {
                    id: 'fields-near-you',
                    title: 'nearFieldsMenu',
                    type: 'item',
                    url: 'fields-near-you',
                },
            ],
        },
        {
            id: 'friends',
            title: 'friendsMenu',
            type: 'collapse',
            url: '/friends',
            icon: icons.PeopleAlt,
            breadcrumbs: false,
            children: [
                {
                    id: 'all-friends',
                    title: 'allFriendsMenu',
                    type: 'item',
                    url: 'all-friends',
                },
                {
                    id: 'favorite-friends',
                    title: 'favouriteFriendsMenu',
                    type: 'item',
                    url: 'favorite-friends',
                },
            ],
        },
        {
            id: 'settings',
            title: 'settingsMenu',
            type: 'collapse',
            icon: icons.Settings,
            breadcrumbs: false,
            children: [
                {
                    id: 'change-password',
                    title: 'changePasswordMenu',
                    type: 'item',
                    url: 'change-password',
                },
                {
                    id: 'edit-player-profile',
                    title: 'editProfileMenu',
                    type: 'item',
                    url: 'edit-player-profile',
                },
            ],
        },
    ],
};

export default dashboard;
