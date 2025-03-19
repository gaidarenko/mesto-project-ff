
import { addLike } from './api';

const cardTemplate = document.querySelector('#card-template').content;

export function createCard(card, deleteCallback, likeCallback, showFullImage, clientId) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = card.link;
  cardImage.alt = getImageAltText(card.name);
  
  // Открытие картинки на весь экран
  cardImage.addEventListener('click', () => showFullImage(card.name, card.link));
  
  cardElement.querySelector('.card__title').textContent = card.name;

  const cardDeleteButton = cardElement.querySelector('.card__delete-button');

  // console.log(`card.owner._id = ${card.owner._id}, clientId = ${clientId}`);

  if (card.owner._id === clientId) {
    cardDeleteButton.addEventListener('click', (evt) => deleteCallback(evt, card._id));
  } else {
    cardDeleteButton.setAttribute('hidden', '');
  }

  cardElement.querySelector('.card__like-button').addEventListener('click', (evt) => likeCallback(evt, card._id));
  
  return cardElement;
}

export function doLike(evt, id) {
  console.log(`Like card ${id}`);
  evt.target.classList.toggle('card__like-button_is-active');

  addLike(id)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
}
  
export function deleteCard(evt, id) {
  console.log(`Delete card ${id}`);
  evt.target.closest('.card').remove();
}

export function getImageAltText(name) {
    return `Фотография места ${name}`;
}