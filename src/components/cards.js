function createCard(cardInfo) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImg = cardElement.querySelector('.card__image');
  const cardDeleteBtn = cardElement.querySelector('.card__delete-button');
  const cardLikeBtn = cardElement.querySelector('.card__like-section_like-button');
  const cardLikesCounter = cardElement.querySelector('.card__like-section_likes-counter');

  cardElement.querySelector('.card__title').textContent = cardInfo.name;
  cardElement.id = cardInfo.cardId;
  cardImg.setAttribute('src', cardInfo.link);
  cardImg.setAttribute('alt', 'Картинка карточки: ' + cardInfo.name);
  cardLikesCounter.textContent = cardInfo.like.length;
  cardElement.id = cardInfo.cardId;

  if (cardInfo.ownerId !== cardInfo.userId){
    cardDeleteBtn.remove();
  }
  cardInfo.like.forEach(element => {
    if (element._id === cardInfo.userId){
      likeCard(cardLikeBtn);
    }
  });

  cardLikeBtn.addEventListener('click', () => cardInfo.updateLike(cardInfo.cardId, cardLikeBtn, cardLikesCounter));
  cardDeleteBtn.addEventListener('click', () => cardInfo.del(cardInfo.cardId));
  cardImg.addEventListener('click', () => cardInfo.handleImageClick(cardInfo.name, cardInfo.link));

  return cardElement;
}

function deleteCard(id) {
  document.getElementById(id).remove();
}

function likeCard(cardLikeBtn) {
  cardLikeBtn.classList.toggle('card__like-section_like-button_is-active');
}

export { createCard, deleteCard, likeCard };
