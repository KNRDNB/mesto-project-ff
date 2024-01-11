import '../pages/index.css';
import {
  createCard,
  deleteCard,
  likeCard
} from '../components/cards.js';
import {
  openModal,
  closeModal,
  closeModalKey,
  closeModalOverlay
} from '../components/module.js';
import {
  enableValidation,
  clearValidation
} from '../components/validation.js';
import {
  getUserInfo,
  userInfoUpdate,
  userAvatarUpdate,
  getInitialCards,
  addInitialCard,
  deleteInitialCard,
  likeInitialCard,
  dislikeInitialCard
} from '../components/api.js';

const profileEditBtn = document.querySelector('.profile__edit-button');
const profileNewBtn = document.querySelector('.profile__add-button');
const profileAvatarBtn = document.querySelector('.profile__avatar_overlay');
const profileAvatar = document.querySelector('.profile__avatar_image');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const cardContainer = document.querySelector('.places__list');

const popupEdit = document.querySelector('.popup_type_edit');
const popupEditCloseBtn = popupEdit.querySelector('.popup__close');
const popupEditForm = popupEdit.querySelector('.popup__form');
const popupEditSubmitBtn = popupEditForm.querySelector('.popup__button');

const popupNew = document.querySelector('.popup_type_new-card');
const popupNewCloseBtn = popupNew.querySelector('.popup__close');
const popupNewForm = popupNew.querySelector('.popup__form');
const popupNewSubmitBtn = popupEditForm.querySelector('.popup__button');

const popupAvatar = document.querySelector('.popup_type_update-avatar');
const popupAvatarCloseBtn = popupAvatar.querySelector('.popup__close');
const popupAvatarForm = popupAvatar.querySelector('.popup__form');
const popupAvatarSubmitBtn = popupAvatarForm.querySelector('.popup__button');

const popupImg = document.querySelector('.popup_type_image');
const popupText = popupImg.querySelector('.popup__caption');
const popupPhoto = popupImg.querySelector('.popup__image');
const popupImgCloseBtn = popupImg.querySelector('.popup__close');

const popupDelete = document.querySelector('.popup_type_delete');
const popupDeleteCloseBtn = popupDelete.querySelector('.popup__close');

const nameInput = popupEdit.querySelector('.popup__input_type_name');
const jobInput = popupEdit.querySelector('.popup__input_type_description');
const placeInput = popupNew.querySelector('.popup__input_type_card-name');
const linkInput = popupNew.querySelector('.popup__input_type_url');
const avatarLinkInput = popupAvatar.querySelector('.popup__input_type_url');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'};

profileEditBtn.addEventListener('click', prepareEditPopup);
profileNewBtn.addEventListener('click', prepareNewPopup);
profileAvatarBtn.addEventListener('click', prepareAvatarPopup);
popupEditCloseBtn.addEventListener('click', () => closeModal(popupEdit));
popupNewCloseBtn.addEventListener('click', () => closeModal(popupNew));
popupImgCloseBtn.addEventListener('click', () => closeModal(popupImg));
popupDeleteCloseBtn.addEventListener('click', () => closeModal(popupDelete));
popupAvatarCloseBtn.addEventListener('click', () => closeModal(popupAvatar));
popupEdit.addEventListener('click', closeModalOverlay);
popupNew.addEventListener('click', closeModalOverlay);
popupImg.addEventListener('click', closeModalOverlay);
popupAvatar.addEventListener('click', closeModalOverlay);
popupDelete.addEventListener('click', closeModalOverlay);
popupEdit.addEventListener('submit', handleFormEditSubmit);
popupNew.addEventListener('submit', handleFormNewSubmit);
popupDelete.addEventListener('submit', handleFormDeleteSubmit);
popupAvatar.addEventListener('submit', handleFormAvatarSubmit);

enableValidation(validationConfig);

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userInfo, cardsInfo]) => {
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileAvatar.style.backgroundImage = `url(${userInfo.avatar})`;

    cardsInfo.reverse().forEach((item) => {
      const cardElement = createCard(item.name, item.link, prepareDeletePopup, item._id, updateLike, item.likes.length, prepareImgPopup);
      cardElement.id = item._id;

      if (item.owner._id !== userInfo._id){
        cardElement.querySelector('.card__delete-button').remove();
      }

      addCard(cardElement);

      item.likes.forEach(element => {
        if (element._id === userInfo._id){
          likeCard(item._id);
        }
      });

    });
  })
  .catch((err) => {
    console.log(err);
  });

function addCard(card) {
  cardContainer.insertBefore(card, cardContainer.firstChild);
}

function prepareEditPopup() {
  clearValidation(validationConfig, popupEditForm);

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  openModal(popupEdit);
}

function prepareNewPopup() {
  openModal(popupNew);
  clearValidation(validationConfig, popupNewForm);
}

function prepareImgPopup(name, link) {
  popupPhoto.src = link;
  popupPhoto.alt = 'Картинка карточки: ' + name;
  popupText.textContent = name;

  openModal(popupImg);
}

function prepareDeletePopup(id){
  popupDelete.id = id;

  openModal(popupDelete);
}

function prepareAvatarPopup() {
  openModal(popupAvatar);
  clearValidation(validationConfig, popupAvatarForm);
}

function resetForm(form) {
  form.reset();
}

function handleFormEditSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  popupEditSubmitBtn.textContent = "Сохранение..."

  userInfoUpdate(nameInput.value, jobInput.value)
    .then((res) => {
      console.log(res)
      popupEditSubmitBtn.textContent = "Сохранить"

      closeModal(popupEdit);
      resetForm(popupEditForm);
    })
    .catch((err) => {
      console.log(err);

      closeModal(popupEdit);
      resetForm(popupEditForm);
    });
}

function handleFormNewSubmit(event) {
  event.preventDefault();
  popupNewSubmitBtn.textContent = "Сохранение..."

  addInitialCard(placeInput.value,linkInput.value)
    .then((res) => {
      console.log(res)
      console.log(res._id)

      const cardElement = createCard(
        res.name,
        res.link,
        prepareDeletePopup,
        res._id,
        updateLike,
        res.likes.length,
        prepareImgPopup
      );
      console.log(cardElement)
      addCard(cardElement);
      popupNewSubmitBtn.textContent = "Сохранить"
      closeModal(popupNew);
      resetForm(popupNewForm);
    })
    .catch((err) => {
      console.log(err);

      closeModal(popupNew);
      resetForm(popupNewForm);
    });
}

function handleFormDeleteSubmit(event){
  event.preventDefault();
  const id = popupDelete.id;
  popupDelete.id = '';

  deleteInitialCard(id)
    .then((res) => {
      console.log(res);

      deleteCard(id);
      closeModal(popupDelete);
    })
    .catch((err) => {
      console.log(err);

      closeModal(popupDelete);
    });
}

function handleFormAvatarSubmit(event){
  event.preventDefault();
  popupAvatarSubmitBtn.textContent = "Сохранение..."

  userAvatarUpdate(avatarLinkInput.value)
  .then((res) => {
    console.log(res);

    profileAvatar.style.backgroundImage = `url(${avatarLinkInput.value})`;
    popupAvatarSubmitBtn.textContent = "Сохранить"
    closeModal(popupAvatar);
    resetForm(popupAvatarForm);
  })
  .catch((err) => {
    console.log(err);

    closeModal(popupAvatar);
    resetForm(popupAvatarForm);
  });

}

function updateLike(id){
  const cardLikesCounter = document.getElementById(id).querySelector('.card__like-section_likes-counter');
  const cardLikeActive = document.getElementById(id).querySelector('.card__like-section_like-button_is-active');

  if (!cardLikeActive){
    likeInitialCard(id)
      .then((res) => {
        cardLikesCounter.textContent = res.likes.length;
        likeCard(id);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  else{
    dislikeInitialCard(id)
      .then((res) => {
        cardLikesCounter.textContent = res.likes.length;
        likeCard(id);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
