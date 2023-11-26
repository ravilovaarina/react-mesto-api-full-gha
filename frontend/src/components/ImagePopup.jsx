import React from "react"
function ImagePopup(props) {
    return (
        <div className={`popup popup-image ${props.isOpeped && 'popup_opened'}`}>
            <div className="popup-image__container">
                <button onClick={props.onClose} type="button" className="popup__button-closed popup-image__button-closed"></button>
                <img alt={`${props.card.name}`} className="popup-image__pic" src={`${props.card.link}`} />
                <p className="popup-image__caption">{props.card.name}</p>
            </div>
        </div>
    )
}
export default ImagePopup