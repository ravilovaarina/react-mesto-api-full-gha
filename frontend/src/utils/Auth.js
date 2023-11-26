class Auth {
    constructor(config) {
        this._url = config.baseUrl;
        this._headers = config.headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    register(data) {
        return fetch(`${this._url}/signup`, {
            method: 'POST',
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify({
                "password": data.password,
                "email": data.email
            })
        }).then(this._checkResponse)
    }

    authorize(data) {
        return fetch(`${this._url}/signin`, {
            method: 'POST',
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify({
                "password": data.password,
                "email": data.email
            })
        }).then(this._checkResponse)
    }

    checkToken() {
        const token = localStorage.getItem('jwt')
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${token}`
            }
        }).then(this._checkResponse)
    }
}

const auth = new Auth({
    baseUrl: 'https://api.mestoarina.nomoredomainsmonster.ru',
    //baseUrl: 'http://localhost:3001',
    headers: {
      'Content-Type': 'application/json'
    }
  })
 
  export default auth;