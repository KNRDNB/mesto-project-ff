const cardTmp = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.places__list');

const deleteCard = function (evt) {
  evt.target.parentNode.remove();
};

initialCards.forEach((item) => {
  addCards(item.name, item.link, deleteCard);
});

function addCards(name, link, del) {
  const cardElement = cardTmp.querySelector('.card').cloneNode(true);
  const cardImg = cardElement.querySelector('.card__image');
  const cardDeleteBtn = cardElement.querySelector('.card__delete-button');

  cardElement.querySelector('.card__title').textContent = name;
  cardImg.setAttribute('src', link);
  cardImg.setAttribute('alt', 'Картинка карточки');
  cardDeleteBtn.addEventListener('click', del);

  cardContainer.append(cardElement);
  return cardElement;
}
