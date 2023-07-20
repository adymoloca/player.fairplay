import { useRoutes } from 'react-router-dom';

// routes
import WebsiteRoutes from './WebsiteRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    return useRoutes([WebsiteRoutes, AuthenticationRoutes]);
}
