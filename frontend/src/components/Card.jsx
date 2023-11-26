import React from "react"
import { CurrentUserContext } from "../contexts/CurrentUserContext"
function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner._id === currentUser._id;
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);


    const cardLikeButtonClassName = `${isLiked ? 'cards__button-like cards__button-like_active' : 'cards__button-like'}`
    function handleCardClick() {
        props.onCardClick(props.card)
    }
    function handleDeleteClick() {
        props.onCardDelete(props.card)
    }
    function handleCardLike() {
        props.onCardLike(props.card)
    }
    return (
        <div className="cards__item">
            {isOwn && <button type="button" className='cards__button-delete' onClick={handleDeleteClick} />}
            <img onClick={handleCardClick} alt={props.card.name} className="cards__pic" src={props.card.link} />
            <div className="cards__info">
                <h2 className="cards__text">{props.card.name}</h2>
                <div className="cards__like-group">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleCardLike}></button>
                    <span className="cards__like-count">{props.card.likes.length}</span>
                </div>
            </div>
        </div>
    )
}
export default Card