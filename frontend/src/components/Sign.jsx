import React from "react";

export default function Sign({ title, onSubmit, buttonText, children, linkMarkup }) {
    return (
        <div className='sign-form__container'>
            <div className='popup__container popup__container_theme_dark'>
            <h3 className="popup__name popup__name_theme_dark">{title}</h3>
            <form className="popup__form" onSubmit={onSubmit} >
                <fieldset className="popup__form-set">
                    {children}
                    <button type="submit" className="popup__button popup__button_theme_dark">{buttonText}</button>
                    {linkMarkup && linkMarkup}
                </fieldset>
            </form>
        </div>
        </div>
    )
}