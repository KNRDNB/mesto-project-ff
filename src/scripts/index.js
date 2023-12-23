import '../pages/index.css';

import { initialCards,createCard,addCard,deleteCard,likeCard} from '../components/cards.js';
import {imagePopupOpen,openModal,closeModal,closeModalKey,resetForm,handleFormSubmit} from '../components/module.js';


const profileEditBtn = document.querySelector('.profile__edit-button');
const profileNewBtn = document.querySelector('.profile__add-button');

const popupEdit = document.querySelector('.popup_type_edit');
const popupNew = document.querySelector('.popup_type_new-card');


initialCards.reverse().forEach((item) => {
  const cardElement = createCard(
    item.name,
    item.link,
    deleteCard,
    imagePopupOpen,
    likeCard
  );
  addCard(cardElement);
});

profileEditBtn.addEventListener('click', () => openModal(popupEdit));
profileNewBtn.addEventListener('click', () => openModal(popupNew));