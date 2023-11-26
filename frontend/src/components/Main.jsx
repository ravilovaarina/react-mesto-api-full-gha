
import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
export default function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);
    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-group" onClick={props.onEditAvatar}>
                    <img alt="Аватар профиля" src={currentUser.avatar} className="profile__avatar" />
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
                    <p className="profile__bio">{currentUser.about}</p>
                </div>
                <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
            </section>
            <section className="cards">
                {props.cards.map(card =>(
                    <Card
                        key={card._id}
                        card={card}
                        onCardClick={props.onCardClick}
                        onCardLike={props.onCardLike}
                        onCardDelete={props.onCardDelete}
                    />
                ))}
            </section>
        </main>
    )
}