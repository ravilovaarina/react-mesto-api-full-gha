import React from "react";
import Sign from "./Sign";
import { Link } from "react-router-dom";

export default function Register({ onRegistration }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const linkMarkup = (
        <p
            className="sign-form__link-markup"
        >
            Уже зарегистрированы? <Link className="sign-form__link" to="/sign-in">Войти</Link>
        </p>
    )
    function handleEmailChange(evt) {
        setEmail(evt.target.value)
    }
    function handlePasswordChange(evt) {
        setPassword(evt.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        onRegistration({
            email: email,
            password: password,
        })
    };


    return (
        <Sign
            title='Регистрация'
            buttonText='Зерегистрироваться'
            onSubmit={handleSubmit}
            linkMarkup={linkMarkup}
        >
            <label className="popup__field">
                <input
                    type="email"
                    name="email"
                    className="popup__input popup__input_theme_dark"
                    id="email"
                    placeholder="Почта"
                    required
                    minLength="2"
                    maxLength="40"
                    value={email || ""}
                    onChange={handleEmailChange}
                />
                <span className="popup__input-error username-error"></span>
            </label>
            <label className="popup__field">
                <input
                    type="text"
                    name="password"
                    className="popup__input popup__input_theme_dark"
                    id="bio"
                    placeholder="Пароль"
                    required
                    minLength="2"
                    maxLength="200"
                    value={password || ""}
                    onChange={handlePasswordChange}
                />
                <span className="popup__input-error password-error"></span>
            </label>
        </Sign>
    )
}