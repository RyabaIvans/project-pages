import React, {useRef} from 'react';
import s from './header.module.css'
import logo from '../../img/Logo.png'


function Header() {



    return (
        <div className={s.main}>
            <div className={s.img_block}><img className={s.logo_image} src={logo} alt="logo"/></div>
            <div className={s.button_block}>


                <button className={s.button_sing}>Users</button>
                <button className={s.button_sing}>Sing up</button>
            </div>

        </div>
    );
};

export default Header;