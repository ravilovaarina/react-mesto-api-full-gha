import React from "react";
import successfulSignUpImg from '../images/successful-sign-up.svg'
import notSuccessfulSignUpImg from '../images/not-successful-sign-up.svg'
export default function InfoTooltip(props) {
    return (
        <div className={`popup ${props.isOpen && 'popup_opened'}`}   >
            <div className="popup__container">
                <button onClick={props.onClose} type="button" className="popup__button-closed"></button>
                <img
                    className="popup__icon"
                    src={props.isSuccess ? successfulSignUpImg : notSuccessfulSignUpImg}
                    alt={props.isSuccess ? 'иконка успешной регистрации' : 'иконка не успешной регистрации'}
                />
                <h3 className="popup__name">{props.isSuccess ?
                    'Вы успешно зарегистрировались!'
                    :
                    'Что-то пошло не так! Пропробуйте ещё раз.'
                }</h3>
            </div>
        </div>
    )
}