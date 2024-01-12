import '../pages/index.css';
import {
  profileEditBtn,
  profileNewBtn,
  profileAvatarBtn,
  profileAvatar,
  profileTitle,
  profileDescription,
  cardContainer,
  popups,
  popupEdit,
  popupEditForm,
  popupNew,
  popupNewForm,
  popupAvatar,
  popupAvatarForm,
  popupImg,
  popupText,
  popupPhoto,
  popupDelete,
  nameInput,
  jobInput,
  placeInput,
  linkInput,
  avatarLinkInput,
  validationConfig,
} from './constants.js';
import { createCard, deleteCard, likeCard } from '../components/cards.js';
import { openModal, closeModal } from '../components/modal.js';
import { enableValidation, clearValidation } from '../components/validation.js';
import {
  getUserInfo,
  updateUserInfo,
  updateUserAvatar,
  getServerCards,
  addServerCard,
  deleteServerCard,
  likeServerCard,
  dislikeServerCard,
} from '../components/api.js';
import { handleSubmit } from '../components/utils/utils.js';

profileEditBtn.addEventListener('click', openEditPopup);
profileNewBtn.addEventListener('click', openNewPopup);
profileAvatarBtn.addEventListener('click', openAvatarPopup);
popupEdit.addEventListener('submit', handleFormEditSubmit);
popupNew.addEventListener('submit', handleFormNewSubmit);
popupDelete.addEventListener('submit', handleFormDeleteSubmit);
popupAvatar.addEventListener('submit', handleFormAvatarSubmit);
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('popup_is-opened')) {
      closeModal(popup);
    }
    if (event.target.classList.contains('popup__close')) {
      closeModal(popup);
    }
  });
});

enableValidation(validationConfig);

Promise.all([getUserInfo(), getServerCards()])
  .then(([userInfo, cardsInfo]) => {
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileAvatar.style.backgroundImage = `url(${userInfo.avatar})`;

    cardsInfo.reverse().forEach((item) => {
      const cardElement = createCard({
        name: item.name,
        link: item.link,
        cardId: item._id,
        like: item.likes,
        ownerId: item.owner._id,
        userId: userInfo._id,
        del: openDeletePopup,
        updateLike: updateLike,
        handleImageClick: openImgPopup,
      });
      addCard(cardElement);
    });
  })
  .catch(console.error);

function addCard(card) {
  cardContainer.insertBefore(card, cardContainer.firstChild);
}

function openEditPopup() {
  clearValidation(validationConfig, popupEditForm);

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  openModal(popupEdit);
}

function openNewPopup() {
  openModal(popupNew);
  clearValidation(validationConfig, popupNewForm);
}

function openImgPopup(name, link) {
  popupPhoto.src = link;
  popupPhoto.alt = 'Картинка карточки: ' + name;
  popupText.textContent = name;

  openModal(popupImg);
}

function openDeletePopup(id) {
  popupDelete.id = id;

  openModal(popupDelete);
}

function openAvatarPopup() {
  openModal(popupAvatar);
  clearValidation(validationConfig, popupAvatarForm);
}

function handleFormEditSubmit(event) {
  function makeRequest() {
    return updateUserInfo(nameInput.value, jobInput.value).then((userData) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
    });
  }
  handleSubmit(makeRequest, event).then((state) => {
    if (state) {
      closeModal(popupEdit);
    }
  });
}

function handleFormNewSubmit(event) {
  let cardElement;
  function makeRequest() {
    return addServerCard(placeInput.value, linkInput.value).then(
      (placeData) => {
        cardElement = createCard({
          name: placeData.name,
          link: placeData.link,
          cardId: placeData._id,
          like: placeData.likes,
          ownerId: placeData.owner._id,
          userId: placeData.owner._id,
          del: openDeletePopup,
          updateLike: updateLike,
          handleImageClick: openImgPopup,
        });
      }
    );
  }
  handleSubmit(makeRequest, event).then((state) => {
    if (state) {
      addCard(cardElement);
      closeModal(popupNew);
    }
  });
}

function handleFormDeleteSubmit(event) {
  const id = popupDelete.id;
  popupDelete.id = '';

  function makeRequest() {
    return deleteServerCard(id);
  }
  handleSubmit(makeRequest, event).then((state) => {
    console.log(state);
    if (state) {
      deleteCard(id);
      closeModal(popupDelete);
    }
  });
}
function handleFormAvatarSubmit(event) {
  function makeRequest() {
    return updateUserAvatar(avatarLinkInput.value).then((userData) => {
      profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
    });
  }
  handleSubmit(makeRequest, event).then((state) => {
    if (state) {
      closeModal(popupAvatar);
    }
  });
}

function updateLike(id, cardLikeBtn, cardLikesCounter) {
  const cardLikeActive = cardLikeBtn.classList.contains(
    'card__like-section_like-button_is-active'
  );

  if (!cardLikeActive) {
    likeServerCard(id)
      .then((res) => {
        cardLikesCounter.textContent = res.likes.length;
        likeCard(cardLikeBtn);
      })
      .catch(console.error);
  } else {
    dislikeServerCard(id)
      .then((res) => {
        cardLikesCounter.textContent = res.likes.length;
        likeCard(cardLikeBtn);
      })
      .catch(console.error);
  }
}
