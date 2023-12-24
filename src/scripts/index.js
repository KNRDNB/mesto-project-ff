import '../pages/index.css';
import {initialCards, createCard, deleteCard, likeCard} from '../components/cards.js';
import {openModal, closeModal, closeModalKey, closeModalOverlay} from '../components/module.js';

const profileEditBtn = document.querySelector('.profile__edit-button');
const profileNewBtn = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const cardContainer = document.querySelector('.places__list');

const popupEdit = document.querySelector('.popup_type_edit');
const popupEditCloseBtn = popupEdit.querySelector('.popup__close');
const popupEditForm = popupEdit.querySelector('.popup__form')

const popupNew = document.querySelector('.popup_type_new-card');
const popupNewCloseBtn = popupNew.querySelector('.popup__close');
const popupNewForm = popupNew.querySelector('.popup__form')

const popupImg = document.querySelector('.popup_type_image');
const popupText = popupImg.querySelector('.popup__caption');
const popupPhoto = popupImg.querySelector('.popup__image');
const popupImgCloseBtn = popupImg.querySelector('.popup__close');

const nameInput = popupEdit.querySelector('.popup__input_type_name');
const jobInput = popupEdit.querySelector('.popup__input_type_description');
const placeInput = popupNew.querySelector('.popup__input_type_card-name');
const linkInput = popupNew.querySelector('.popup__input_type_url');

initialCards.reverse().forEach((item) => {
  const cardElement = createCard(
    item.name,
    item.link,
    deleteCard,
    likeCard
  );
  cardElement.querySelector('.card__image').addEventListener('click', () => prepareImgPopup(item.name, item.link))
  addCard(cardElement);
});

profileEditBtn.addEventListener('click', prepareEditPopup);
profileNewBtn.addEventListener('click', prepareNewPopup);

function addCard(card) {
  cardContainer.insertBefore(card, cardContainer.firstChild);
}

function prepareEditPopup(){
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupEdit)
  addPopupListener(popupEdit,popupEditCloseBtn)
  popupEdit.addEventListener('submit', handleFormEditSubmit);
}

function prepareNewPopup(){
  openModal(popupNew)
  addPopupListener(popupNew,popupNewCloseBtn)
  popupNew.addEventListener('submit', handleFormNewSubmit);
}

function prepareImgPopup(name, link) {
  popupPhoto.src = link;
  popupPhoto.alt = "Картинка карточки: " + name;
  popupText.textContent = name;
  openModal(popupImg)
  addPopupListener(popupImg,popupImgCloseBtn)
}

function resetForm(form){
  form.reset();
}

function addPopupListener(popup, closeBtn){
  closeBtn.addEventListener('click', () => closeModal(popup));
  popup.addEventListener('click', closeModalOverlay);
  document.addEventListener('keydown', closeModalKey);
}

function handleFormEditSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupEdit);
  resetForm(popupEditForm);
}
function handleFormNewSubmit(event){
  event.preventDefault();
  let place = placeInput.value;
  let link = linkInput.value;

  const cardElement = createCard(
    placeInput.value,
    linkInput.value,
    deleteCard,
    likeCard
  );

  cardElement.querySelector('.card__image').addEventListener('click',() => prepareImgPopup(place, link))
  addCard(cardElement);
  closeModal(popupNew);
  resetForm(popupNewForm);
}