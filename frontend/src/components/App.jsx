import React from 'react';
import Footer from './Footer.jsx';
import Header from './Header.jsx';
import Main from './Main.jsx';
import PopupWithForm from './PopupWithForm.jsx';
import ImagePopup from './ImagePopup.jsx';
import { CurrentUserContext } from '../contexts/CurrentUserContext.jsx';
import EditProfilePopup from './EditProfilePopup.jsx';
import EditAvatarPopup from './EditAvatarPopup.jsx';
import AddPlacePopup from './AddPlacePopup.jsx';
import { api } from '../utils/Api.js';
import { Routes, Route, useNavigate } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import InfoTooltip from './InfoToolTip.jsx';
import auth from '../utils/Auth.js';
import '../index.css'
function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
    const [cards, setCards] = React.useState([]);
    const [selectedCard, setSelectedCard] = React.useState({})
    const [isImageOpen, setIsImageOpen] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState({});
    const [loggedIn, setLoggedIn] = React.useState(false)
    const [isSuccessfulSignUp, setIsSuccessfulSignUp] = React.useState(false)
    const [authorizationUserEmail, setAutorizationUserEmail] = React.useState(null);
    const navigate = useNavigate()
    React.useEffect(() => {
        api.getInfo()
            .then((data) => {
                setCurrentUser(data)
            })
            .catch(console.error)
    }, [])

    function handleEditProfilePopupOpen() {
        setIsEditProfilePopupOpen(!isEditProfilePopupOpen)
    }
    function handleAddPlacePopupOpen() {
        setIsAddPlacePopupOpen(!isAddPlacePopupOpen)
    }
    function handleEditAvatarPopupOpen() {
        setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)
    }

    function handleInfoTooltipPopupOpen() {
        setIsInfoTooltipOpen(!isInfoTooltipOpen)
    }

    function handleCardClick(card) {
        setIsImageOpen(!isImageOpen)
        setSelectedCard(card)
    }
    function closeAllPopups() {
        setIsEditProfilePopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setIsImageOpen(false)
        setIsInfoTooltipOpen(false)
        setSelectedCard({})
    }
    React.useEffect(() => {
        api.getInitialCards()
            .then((data) => {
                setCards(data);
            })
            .catch(console.error)
    }, [])
    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch(console.error)
    }
    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(
                () => {
                    setCards((state) => state.filter((item) => item._id !== card._id));
                })
            .catch(console.error)
    }
    function handleUpdateUser(data) {
        api.editProfile(data)
            .then(
                (data) => {
                    setCurrentUser(data)
                    closeAllPopups()
                }
            )
            .catch(console.error)
    }
    function handleUpdateAvatar(data) {
        api.setUserAvatar(data)
            .then(
                (data) => {
                    setCurrentUser(data);
                    closeAllPopups();
                })
            .catch(console.error)
    }
    function handleAddPlaceSubmit(data) {
        api.addNewCard(data)
            .then(
                (newCard) => {
                    setCards([newCard, ...cards]);
                    closeAllPopups();
                })
            .catch(console.error)

    }


    function handleRegistration(data) {
        auth.register(data)
            .then(
                (data) => {
                    setIsSuccessfulSignUp(true);
                    handleInfoTooltipPopupOpen();
                })
            .catch((err) => {
                console.log(err)
                setIsSuccessfulSignUp(false)
                handleInfoTooltipPopupOpen();
            })
    }

    function handleAuthorization(data) {
        auth.authorize(data)
            .then(
                (data) => {
                    setLoggedIn(true);
                    localStorage.setItem('jwt', data.token);
                    handleCheckToken()
                    navigate('/')
                })
            .catch((err) => {
                console.log(err)
                setIsSuccessfulSignUp(false)
                handleInfoTooltipPopupOpen();
            })
    }
    const handleCheckToken = React.useCallback(
        () => {
            const token = localStorage.getItem('jwt');
            auth.checkToken(token)
                .then(
                    (data) => {
                        setAutorizationUserEmail(data.email);
                        setLoggedIn(true);
                        navigate('/')
                    })
                .catch(console.error)
        }
    )
    
    React.useEffect(() => {
        const token = localStorage.getItem('jwt');

        if (token) {
            handleCheckToken();
        }
    }, [])


    function handleSignOut() {
        localStorage.removeItem('jwt');
        setLoggedIn(false);
        navigate('/sign-in')
    }
    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header
                    loggedIn={loggedIn}
                    onSignOut={handleSignOut}
                    authorizationUserEmail={authorizationUserEmail}
                />
                <Routes>
                    <Route path='/sign-up' element={<Register onRegistration={handleRegistration} />} />
                    <Route path='/sign-in' element={<Login onAuthorization={handleAuthorization} onCheckToken={handleCheckToken} />} />
                    <Route
                        path='/'
                        element={
                            <ProtectedRoute
                                loggedIn={loggedIn}
                                component={Main}
                                cards={cards}
                                onEditProfile={handleEditProfilePopupOpen}
                                onAddPlace={handleAddPlacePopupOpen}
                                onEditAvatar={handleEditAvatarPopupOpen}
                                onCardClick={handleCardClick}
                                onCardLike={handleCardLike}
                                onCardDelete={handleCardDelete}
                            />
                        }
                    />
                </Routes>
                {loggedIn && <Footer />}
                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                    isOpeped={isImageOpen}
                />
                <PopupWithForm
                    name='delete'
                    title='Вы уверены?'
                    buttonText='Да'
                />
                <InfoTooltip
                    isOpen={isInfoTooltipOpen}
                    onClose={closeAllPopups}
                    isSuccess={isSuccessfulSignUp}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
