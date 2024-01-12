export const profileEditBtn = document.querySelector('.profile__edit-button');
export const profileNewBtn = document.querySelector('.profile__add-button');
export const profileAvatarBtn = document.querySelector('.profile__avatar_overlay');
export const profileAvatar = document.querySelector('.profile__avatar_image');
export const profileTitle = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__description');
export const cardContainer = document.querySelector('.places__list');

export const popups = document.querySelectorAll('.popup');

export const popupEdit = document.querySelector('.popup_type_edit');
export const popupEditForm = document.forms['edit-profile'];

export const popupNew = document.querySelector('.popup_type_new-card');
export const popupNewForm = document.forms['new-place'];

export const popupAvatar = document.querySelector('.popup_type_update-avatar');
export const popupAvatarForm = document.forms['update-avatar'];

export const popupImg = document.querySelector('.popup_type_image');
export const popupText = popupImg.querySelector('.popup__caption');
export const popupPhoto = popupImg.querySelector('.popup__image');

export const popupDelete = document.querySelector('.popup_type_delete');

export const nameInput = popupEdit.querySelector('.popup__input_type_name');
export const jobInput = popupEdit.querySelector('.popup__input_type_description');
export const placeInput = popupNew.querySelector('.popup__input_type_card-name');
export const linkInput = popupNew.querySelector('.popup__input_type_url');
export const avatarLinkInput = popupAvatar.querySelector('.popup__input_type_url');

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};