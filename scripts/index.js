// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

function createCard(card, callback) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', callback);

  return cardElement;
}

function deleteCard(event) {
  event.target.parentElement.remove();
}

const placesElement = document.querySelector('.places__list');

initialCards.forEach(function(card) {
  placesElement.append(createCard(card, deleteCard));
});