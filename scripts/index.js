const cardTemplate = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.places__list');

initialCards.forEach((item) => {
  const cardElement = createCard(item.name, item.link, function (event) {
    event.target.closest('.card').remove();
  });
  addCard(cardElement);
});

function createCard(name, link, del) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImg = cardElement.querySelector('.card__image');
  const cardDeleteBtn = cardElement.querySelector('.card__delete-button');

  cardElement.querySelector('.card__title').textContent = name;
  cardImg.setAttribute('src', link);
  cardImg.setAttribute('alt', 'Картинка карточки');
  cardDeleteBtn.addEventListener('click', del);

  return cardElement;
}

function addCard(card){
  cardContainer.append(card);
}