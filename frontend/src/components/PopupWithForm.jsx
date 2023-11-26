export default function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}   >
            <div className="popup__container">
                <button onClick={props.onClose} type="button" className="popup__button-closed"></button>
                <h3 className="popup__name">{props.title}</h3>
                <form name={props.name} className="popup__form" onSubmit={props.onSubmit} >
                    <fieldset className="popup__form-set">
                        {props.children}
                        <button type="submit" className="popup__button">{props.buttonText}</button>
                    </fieldset>
                </form>
            </div>
        </div>
    )
}