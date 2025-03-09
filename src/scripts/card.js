
const cardTemplate = document.querySelector('#card-template').content;

export function createCard(card, deleteCallback, likeCallback, imageClickCallback) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = card.link;
  
  // Открытие картинки на весь экран
  cardImage.addEventListener('click', imageClickCallback);
  
  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCallback);
  cardElement.querySelector('.card__like-button').addEventListener('click', likeCallback);
  
  return cardElement;
}

export function doLike(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}
  
export function deleteCard(evt) {
  evt.target.closest('.card').remove();
}
  