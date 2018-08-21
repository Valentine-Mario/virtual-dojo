import React from 'react';
import { isLoggedIn } from '../../config';
import AuthMenu from './authMenu';
import UnAuthMenu from './unAuthMenu';

const MenuNav = () => {
    return (
        <div>
           { isLoggedIn('user') ? 
                <AuthMenu />
                    :
                <UnAuthMenu />
            }
        </div>
    )
}

export default MenuNav;
