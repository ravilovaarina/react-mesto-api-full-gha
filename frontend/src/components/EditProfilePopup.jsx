import PopupWithForm from "./PopupWithForm"
import React from "react"
import { CurrentUserContext } from "../contexts/CurrentUserContext";
export default function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')
    function handleNameChange(evt) {
        setName(evt.target.value)
    }
    function handleDescriptionChange(evt) {
        setDescription(evt.target.value)
    }
    function handleSubmit(evt) {
        evt.preventDefault();

        props.onUpdateUser({
            name: name,
            bio: description,
        });
    }
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);
    return (
        <PopupWithForm
            name="profile"
            title="Редактировать профиль"
            buttonText='Сохранить'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <label className="popup__field">
                <input
                    type="name"
                    name="name"
                    className="popup__input"
                    id="name"
                    placeholder="Имя"
                    required
                    minLength="2"
                    maxLength="40"
                    value={name || ""}
                    onChange={handleNameChange}
                />
                <span className="popup__input-error name-error"></span>
            </label>
            <label className="popup__field">
                <input
                    type="text"
                    name="bio"
                    className="popup__input"
                    id="bio"
                    placeholder="Описание"
                    required
                    minLength="2"
                    maxLength="200"
                    value={description || ""}
                    onChange={handleDescriptionChange}
                />
                <span className="popup__input-error bio-error"></span>
            </label>
        </PopupWithForm>
    )
}