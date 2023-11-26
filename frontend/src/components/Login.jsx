import React from "react";
import Sign from "./Sign";
import { useNavigate } from "react-router-dom";

export default function Login({ onAuthorization, onCheckToken }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();

    function handleEmailChange(evt) {
        setEmail(evt.target.value)
    }
    function handlePasswordChange(evt) {
        setPassword(evt.target.value)
    }
    function handleSubmit(evt) {
        evt.preventDefault();
        onAuthorization({
            email: email,
            password: password,
        });
    }

    return (
        <Sign
            title='Вход'
            onSubmit={handleSubmit}
            buttonText='Войти'
        >
            <label className="popup__field">
                <input
                    type="email"
                    name="email"
                    className="popup__input popup__input_theme_dark"
                    id="email"
                    placeholder="Имя пользователя"
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
                    id="password"
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