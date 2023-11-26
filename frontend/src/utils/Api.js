import { apiConfig } from "./constants";

class Api {
    constructor(config) {
        this._url = config.url;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getInfo() {
        const token = localStorage.getItem('jwt')
        return fetch(`${this._url}/users/me`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then((res) => this._checkResponse(res))
    }

    getInitialCards() {
        const token = localStorage.getItem('jwt')
        return fetch(`${this._url}/cards`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then((res) => this._checkResponse(res))
    }

    editProfile(data) {
        const token = localStorage.getItem('jwt')
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                'Content-Type': "application/json",
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                name: data.name,
                about: data.bio
            })
        })
            .then((res) => this._checkResponse(res))
    }

    addNewCard(data) {
        const token = localStorage.getItem('jwt')
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then((res) => this._checkResponse(res))
    }

    setUserAvatar(data) {
        const token = localStorage.getItem('jwt')
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                'Content-Type': "application/json",
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                avatar: data.link,
            })
        })
            .then((res) => this._checkResponse(res))
    }

    deleteCard(cardId) {
        const token = localStorage.getItem('jwt')
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': "application/json",
                authorization: `Bearer ${token}`
            },
        })
            .then((res) => this._checkResponse(res))
    }
    changeLikeCardStatus(cardId, isLiked) {
        if (isLiked) {
            return this.deleteCardLike(cardId);
        } else {
            return this.putCardLike(cardId);
        }
    }

    deleteCardLike(cardId) {
        const token = localStorage.getItem('jwt')
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
                'Content-Type': "application/json",
                authorization: `Bearer ${token}`
            },
        })
            .then((res) => this._checkResponse(res))
    }


    putCardLike(cardId) {
        const token = localStorage.getItem('jwt')
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {
                'Content-Type': "application/json",
                authorization: `Bearer ${token}`
            },
        })
            .then((res) => this._checkResponse(res))
    }

    getInitialData() {
        return Promise.all([this.getInfo(), this.getInitialCards()]);
    }
}

const api = new Api(apiConfig)
export { api }