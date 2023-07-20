import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'utils/routes';
import NavigationScroll from 'layout/NavigationScroll';

// defaultTheme
import themes from 'utils/themes';

// project imports
import SnackNotifyGlobal from 'ui-component/notification/snackNotifyGlobal/SnackNotifyGlobal';
import { clearSetSearch, setSocketLastPong } from 'store/types/utilsTypes';
import { decodeAccessToken } from 'utils/function/decodeAccsessToken';
import { refresh } from 'store/actions/userActions';
import { logout } from 'store/types/userTypes';
import { io } from 'socket.io-client';
import { herokuURL } from 'utils/axios/constants';
import i18n from 'i18n/config';

// ==============================|| APP ||============================== //
export const socket = io(herokuURL);

const App = () => {
    const customization = useSelector((state) => state.customization);
    const language = useSelector((state)=> state?.utilsState.utils?.language);
    const token = useSelector((state) => state?.playerState?.token);
    const refreshToken = useSelector((state) => state?.playerState?.refreshToken);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const param = !Boolean(window?.location?.reload);

    useEffect(() => {
        socket.on('connect', () => {
            dispatch(setSocketLastPong('connected'));
        });

        socket.on('disconnect', () => {
            dispatch(setSocketLastPong('disconnected'));
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
        };

        //  eslint-disable-next-line
    }, []);

    useEffect(() => {
        param === false && dispatch(clearSetSearch());
    }, [dispatch, param]);

    useEffect(() => {
        const verifyToken = () => {
            const { exp } = decodeAccessToken(token);
            if (exp * 1000 - Date.now() <= 120000 && exp * 1000 - Date.now() > 0)
                dispatch(refresh({ refreshToken: refreshToken }));
            else if (exp * 1000 - Date.now() <= 0) dispatch(logout());
        };

        !token &&
            location.pathname !== '/login' &&
            location.pathname !== '/register' &&
            location.pathname !== '/forgot' &&
            location.pathname !== '/reset' &&
            location.pathname !== '/reset-password' &&
            location.pathname !== '/activate' &&
            navigate('/login');

        window.addEventListener('click', verifyToken);

        return () => window.removeEventListener('click', verifyToken);
    }, [dispatch, token, refreshToken, navigate, location.pathname]);

    useEffect(()=> {
        i18n.changeLanguage(language);
        // eslint-disable-next-line
    }, [language])

    return (
        <>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={themes(customization)}>
                    <CssBaseline /> <SnackNotifyGlobal />
                    <NavigationScroll>
                        <Routes />
                    </NavigationScroll>
                </ThemeProvider>
            </StyledEngineProvider>
        </>
    );
};

export default App;
