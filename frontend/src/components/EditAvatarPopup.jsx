import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup(props) {
  const avatarRef = React.useRef('');

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({
      link: avatarRef.current.value
    });
  }
  return (
    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      buttonText='Сохранить'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input type="url" name="link" className="popup__input" id="avatarUrl" placeholder="ссылка на картинку" required ref={avatarRef} />
        <span className="popup__input-error avatarUrl-error"></span>
      </label>
    </PopupWithForm>
  )
}