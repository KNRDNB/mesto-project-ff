function createCard(name, link, del, cardId, like, likeCount, preparePopup) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImg = cardElement.querySelector('.card__image');
  const cardDeleteBtn = cardElement.querySelector('.card__delete-button');
  const cardLikeBtn = cardElement.querySelector('.card__like-section_like-button');
  const cardLikesCounter = cardElement.querySelector('.card__like-section_likes-counter');

  cardElement.querySelector('.card__title').textContent = name;
  cardElement.id = cardId;
  cardImg.setAttribute('src', link);
  cardImg.setAttribute('alt', 'Картинка карточки: ' + name);
  cardLikesCounter.textContent = likeCount;

  cardLikeBtn.addEventListener('click', () => like(cardId));
  cardDeleteBtn.addEventListener('click', () => del(cardId));
  cardImg.addEventListener('click', () => preparePopup(name, link));

  return cardElement;
}

function deleteCard(id) {
  document.getElementById(id).remove();
}

function likeCard(id) {
  document.getElementById(id).querySelector('.card__like-section_like-button').classList.toggle('card__like-section_like-button_is-active');
}

export { createCard, deleteCard, likeCard };
