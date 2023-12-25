const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

function createCard(name, link, del, like, preparePopup) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImg = cardElement.querySelector('.card__image');
  const cardDeleteBtn = cardElement.querySelector('.card__delete-button');
  const cardLikeBtn = cardElement.querySelector('.card__like-button');

  cardElement.querySelector('.card__title').textContent = name;
  cardImg.setAttribute('src', link);
  cardImg.setAttribute('alt', 'Картинка карточки: ' + name);
  cardLikeBtn.addEventListener('click', like);
  cardDeleteBtn.addEventListener('click', del);
  cardImg.addEventListener('click', () => preparePopup(name, link));

  return cardElement;
}

function deleteCard(event) {
  event.target.closest('.card').remove();
}

function likeCard(event) {
  event.target.classList.toggle('card__like-button_is-active');
}

export { initialCards, createCard, deleteCard, likeCard };
