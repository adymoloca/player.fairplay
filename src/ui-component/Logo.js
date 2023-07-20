import logo from 'assets/images/logo-fotbalist.svg';
import { Fragment } from 'react';

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {

    return (
        <Fragment>
            <img src={logo} alt="SmartBoxDigital" width="175" height={'50px'} />
        </Fragment>
    );
};

export default Logo;
