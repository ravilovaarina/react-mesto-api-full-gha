import PopupWithForm from "./PopupWithForm"
import React from "react"
export default function AddPlacePopup(props) {
    const [name, setName] = React.useState('')
    const [link, setLink] = React.useState('')

    function handleChangeName(evt) {
        setName(evt.target.value)
    }

    function handleChangeLink(evt) {
        setLink(evt.target.value)
    }

    function handleSubmit(evt) {
        evt.preventDefault(evt)
        props.onAddPlace({
            name: name,
            link: link,
        })
    }
    return (
        <PopupWithForm
            name='add'
            title='Новое место'
            buttonText='Создать'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <label className="popup__field">
                <input
                    type="text"
                    name="name"
                    className="popup__input"
                    id="place"
                    placeholder="название"
                    required
                    minLength="2"
                    maxLength="30"
                    value={name}
                    onChange={handleChangeName}
                />
                <span className="popup__input-error place-error"></span>
            </label>
            <label className="popup__field">
                <input
                    type="url"
                    name="link"
                    className="popup__input"
                    id="url"
                    placeholder="ссылка на картинку"
                    required
                    value={link}
                    onChange={handleChangeLink}
                />
                <span className="popup__input-error url-error"></span>
            </label>
        </PopupWithForm>
    )
}