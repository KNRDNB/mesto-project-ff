import {createCard,addCard,deleteCard,likeCard} from '../components/cards.js';

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNew = document.querySelector('.popup_type_new-card');
const nameInput = popupEdit.querySelector('.popup__input_type_name');
const jobInput = popupEdit.querySelector('.popup__input_type_description');
const placeInput = popupNew.querySelector('.popup__input_type_card-name');
const linkInput = popupNew.querySelector('.popup__input_type_url');

function imagePopupOpen(event) {
  const card = event.target.closest('.card');
  const imgLink = card.querySelector('.card__image').src;
  const imgText = card.querySelector('.card__title').textContent;

  const popup = document.querySelector('.popup_type_image');
  const popupText = popup.querySelector('.popup__caption');
  const popupImg = popup.querySelector('.popup__image');
  const closeBtn = popup.querySelector('.popup__close');

  popupImg.src = imgLink;
  popupText.textContent = imgText;
  popup.classList.add('popup_is-animated');
  setTimeout(() => {
    popup.classList.add('popup_is-opened');
  }, "1");
  closeBtn.addEventListener('click', closeModal);
  popup.addEventListener('click', closeModal);
  document.addEventListener('keydown', closeModalKey);
}

function openModal(popup) {
  const closeBtn = popup.querySelector('.popup__close');

  if (popup.classList.contains('popup_type_edit')) {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
  }

  popup.classList.add('popup_is-animated');
  setTimeout(() => {
    popup.classList.add('popup_is-opened');
  }, "1");
  closeBtn.addEventListener('click', closeModal);
  popup.addEventListener('click', closeModal);
  popup.addEventListener('submit', handleFormSubmit);
  document.addEventListener('keydown', closeModalKey);
}

function closeModal(event) {
  const popup = document.querySelector('.popup_is-opened');
  const form = popup.querySelector('.popup__form');

  if (event) {
    event.stopPropagation();
    if (!event.target.closest('.popup__content') || event.target.closest('.popup__close')) {
      popup.classList.remove('popup_is-opened');
      setTimeout(() => {
        popup.classList.remove('popup_is-animated');
      }, "600");
      if (form) {
        resetForm(form);
      }
    }
  } else {
    popup.classList.remove('popup_is-opened');
    setTimeout(() => {
      popup.classList.remove('popup_is-animated');
    }, "600");
    if (form) {
      resetForm(form);
    }
  }
}

function closeModalKey(event) {
  const popup = document.querySelector('.popup_is-opened');
  const form = popup.querySelector('.popup__form');

  if (event.key == 'Escape') {
    popup.classList.remove('popup_is-opened');
    setTimeout(() => {
      popup.classList.remove('popup_is-animated');
    }, "600");
    if (form) {
      resetForm(form);
    }
    document.removeEventListener('keydown', closeModalKey);
  }
}

function resetForm(form){
  form.reset();
}

function handleFormSubmit(event) {
  event.preventDefault();
  if (event.currentTarget.classList.contains('popup_type_new-card')) {
    const cardElement = createCard(
      placeInput.value,
      linkInput.value,
      deleteCard,
      imagePopupOpen,
      likeCard
    );
    addCard(cardElement);
    closeModal();
  } else if (event.currentTarget.classList.contains('popup_type_edit')) {
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal();
  }
}

export {imagePopupOpen,openModal,closeModal,closeModalKey,resetForm,handleFormSubmit}