/* eslint-disable no-unused-vars */
import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

const Posts = Loadable(lazy(() => import('views/dashboard/news')));
const Projects = Loadable(lazy(() => import('views/dashboard/projects')));
const Matches = Loadable(lazy(() => import('views/pages/websitePages/matches/Matches.jsx')));
const AllFriends = Loadable(lazy(() => import('views/pages/websitePages/friends/AllFriends.js')));
const FavoriteFriends = Loadable(lazy(() => import('views/pages/websitePages/friends/FavoriteFriends.js')));
const AllMatches = Loadable(lazy(() => import('views/pages/websitePages/matches/AllMatches.jsx')));
const CreateAMatch = Loadable(lazy(() => import('views/pages/websitePages/matches/CreateAMatch.jsx')));
const MatchesNearYou = Loadable(lazy(() => import('views/pages/websitePages/matches/MatchesNearYou.jsx')));
const UpdateInfo = Loadable(lazy(() => import('views/pages/websitePages/updateInfo/UpdateInfo.js')));
const Faq = Loadable(lazy(() => import('views/pages/websitePages/faq/Faq.jsx')));
const Info = Loadable(lazy(() => import('views/pages/websitePages/info/Info.jsx')));
const Ticket = Loadable(lazy(() => import('views/pages/websitePages/ticket/Ticket.js')));
const PlayerProfile = Loadable(lazy(() => import('views/pages/websitePages/playerProfile/playerProfilePage/PlayerProfilePage.js')));
const EditPlayer = Loadable(lazy(() => import('views/pages/websitePages/playerProfile/playerProfileEdit/PlayerProfileEdit')));
const ChangePassword = Loadable(lazy(() => import('views/pages/websitePages/changePassword/index')));
const UpcomingMatch = Loadable(lazy(() => import('views/pages/websitePages/matches/UpcomingMatch.jsx')));
const AllFields = Loadable(lazy(() => import('views/pages/websitePages/fields/AllFields.js')));
const NearFields = Loadable(lazy(() => import('views/pages/websitePages/fields/NearFields.js')));
const FieldPage = Loadable(lazy(() => import('views/pages/websitePages/fields/FieldPage.js')));
const Search = Loadable(lazy(() => import('views/pages/websitePages/search/Search')));
const NotificationPage = Loadable(lazy(() => import('views/pages/websitePages/notificationPage/NotificationPage')));
const FriendProfilePage = Loadable(lazy(() => import('views/pages/websitePages/friends/FriendProfile')));
const Pricing = Loadable(lazy(() => import('views/pages/websitePages/pricing/PricingTables')));
const Checkout = Loadable(lazy(() => import('views/pages/websitePages/pricing/CheckoutPage')));
const CardPage = Loadable(lazy(() => import('views/pages/websitePages/pricing/CardPage')));
const InvitationPage = Loadable(lazy(() => import('views/pages/websitePages/invitationsPage/InvitationPage')));


// ==============================|| MAIN ROUTING ||============================== //

const WebsiteRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />,
        },
        {
            path: 'dashboard',
            element: <DashboardDefault />,
        },
        {
            path: '/matches',
            element: <Matches />,
        },
        {
            path: '/all-friends',
            element: <AllFriends />,
        },
        {
            path: '/favorite-friends',
            element: <FavoriteFriends />,
        },
        {
            path: '/all-fields',
            element: <AllFields />,
        },
        {
            path: '/fields-near-you',
            element: <NearFields />,
        },
        {
            path: '/faq',
            element: <Faq />,
        },
        {
            path: '/info',
            element: <Info />,
        },
        {
            path: '/create-a-ticket',
            element: <Ticket />,
        },
        {
            path: '/all-matches',
            element: <AllMatches />,
        },
        {
            path: '/matches-near-you',
            element: <MatchesNearYou />,
        },
        {
            path: '/create-match',
            element: <CreateAMatch />,
        },
        {
            path: '/upcoming-match',
            element: <UpcomingMatch />,
        },
        {
            path: '/update-info',
            element: <UpdateInfo />,
        },
        {
            path: '/player-profile',
            element: <PlayerProfile />,
        },
        {
            path: 'edit-player-profile',
            element: <EditPlayer />,
        },
        {
            path: 'change-password',
            element: <ChangePassword />,
        },
        {
            path: 'faq',
            element: <Faq />,
        },
        {
            path: 'info',
            element: <Info />,
        },
        {
            path: 'create-a-ticket',
            element: <Ticket />,
        },
        {
            path: 'field-page',
            element: <FieldPage />,
        },
        {
            path: 'search',
            element: <Search />,
        },
        {
            path: 'notification',
            element: <NotificationPage />,
        },
        {
            path: 'friend-profile',
            element: <FriendProfilePage />,
        },
        {
            path: 'posts',
            element: <Posts />,
        },
        {
            path: 'projects',
            element: <Projects />,
        },
        {
            path: 'pricing',
            element: <Pricing />,
        },
        {
            path: 'checkout',
            element: <Checkout />,
        },
        {
            path: 'card-page',
            element: <CardPage />,
        },
        {
            path: 'invitation-page',
            element: <InvitationPage />,
        },
        {
            path: 'icons',
            children: [
                {
                    path: 'tabler-icons',
                    element: <UtilsTablerIcons />,
                },
            ],
        },
    ],
};

export default WebsiteRoutes;
