import logo from '../images/logo.svg'
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
export default function Header({ loggedIn, onSignOut, authorizationUserEmail }) {
    
    const location = useLocation();
    const [menuIsOpen, setMenuIsOpen] = React.useState(false);
    function handleToggleMenu() {
        setMenuIsOpen(!menuIsOpen);
    }
    function handleSignOut() {
        setMenuIsOpen(false);
        onSignOut();
    }
    
    return (
        <header className={loggedIn ? 'header header_row-reverse' : 'header'}>
            {loggedIn &&
                (
                    <div
                        className={menuIsOpen ? 'header__container header__container_opened' : 'header__container'}
                    >
                        <address
                            className="header__address"
                        >
                            {authorizationUserEmail && authorizationUserEmail}
                        </address>
                        <button
                            className="header__button"
                            type="button"
                            onClick={handleSignOut}
                        >
                            Выйти
                        </button>
                    </div>
                )
            }
            <div className='header__container-main'>
                <img src={logo} alt="Логотип" className="header__logo" />
                {loggedIn &&
                    (
                        <button
                            className={menuIsOpen ? 'header__menu-button header__menu-button_opened' : 'header__menu-button'}
                            type="button"
                            aria-label="кнопка меню"
                            onClick={handleToggleMenu}
                        />
                    )
                }
                {!loggedIn &&
                    (<nav>
                        {location.pathname === '/sign-in' &&
                            (
                                <Link to="/sign-up" className="header__navlink">Регистрация</Link>
                            )
                        }
                        {location.pathname === '/sign-up' &&
                            (
                                <Link to="/sign-in" className="header__navlink">Войти</Link>
                            )
                        }
                    </nav>
                    )
                }
            </div>
        </header>
    )
}