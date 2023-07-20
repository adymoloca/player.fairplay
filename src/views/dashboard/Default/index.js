
// material-ui
import { Box, Typography, useMediaQuery } from '@mui/material';

import NearYouComp from 'views/pages/websitePages/matches/matchesComponent/NearYouComp';
import FavoriteFriendsTable from 'views/pages/websitePages/friends/friendComponents/FavoriteFriendsTable';
import UpcomingMatchesComp from 'views/pages/websitePages/matches/upcomingMatchesComp/UpcomingMatchesComp';

// translation
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { getUpcomingMatches } from 'store/actions/matchesActions';
import { useEffect } from 'react';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const dispatch = useDispatch();

    const { t } = useTranslation();
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
    const matchDownXL = useMediaQuery(theme.breakpoints.down("xl"));
    const matchDown = useMediaQuery(theme.breakpoints.down("sm"));

    const upcomingMatches = useSelector((state) => state?.matchesState?.upcoming);

    useEffect(() => {
        dispatch(getUpcomingMatches());
    }, [dispatch])

    return (
        <Box sx={{ width: '100%', minHeight: '86vh', px: `${matchDownXL ? 0 : '30px'}` }}>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                { matchDown &&
                    <Typography
                        sx={{
                            fontSize: "18px",
                            fontWeight: "700",
                            color: "#37AE0F",
                            px: `${matchDownSM ? '10px' : '40px'}`,
                            py: 2,
                        }}
                    >
                        {t('upcomingMatch')}
                    </Typography>
                }
                <UpcomingMatchesComp upcomingMatches={upcomingMatches} />
            </Box>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography
                    sx={{
                        fontSize: "18px",
                        fontWeight: "700",
                        color: "#37AE0F",
                        px: `${matchDownSM ? '10px' : '40px'}`,
                        py: 2,
                    }}
                >
                    {t('matchesNearYou')}
                </Typography>
                <NearYouComp />
            </Box>
            <Box width={'100%'}>
                <Typography
                    sx={{
                        fontSize: "18px",
                        fontWeight: "700",
                        color: "#37AE0F",
                        px: `${matchDownSM ? '10px' : '40px'}`,
                        py: 2,
                    }}
                >
                    {t('favoriteFriends')}
                </Typography>
                <FavoriteFriendsTable />
            </Box>
        </Box>
    );
};

export default Dashboard;
