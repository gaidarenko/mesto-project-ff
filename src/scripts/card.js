
import { addLike, deleteLike } from './api';

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

  if (card.owner._id === clientId) {
    cardDeleteButton.addEventListener('click', (evt) => deleteCallback(evt, card._id));
  } else {
    cardDeleteButton.setAttribute('hidden', '');
  }

  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const isLiked = card.likes.some(like => like._id === clientId);

  if (isLiked) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }

  const cardLikeNumber = cardElement.querySelector('.card__like-number');
  showLikesNumber(cardLikeNumber, card.likes.length);

  cardLikeButton.addEventListener('click', (evt) => likeCallback(evt, card._id, cardLikeNumber));
  
  return cardElement;
}

function showLikesNumber(element, number) {
  if (number) {
    element.textContent = number;
    element.removeAttribute('hidden');
  } else {
    element.setAttribute('hidden', '');
  }
}

export function doLike(evt, id, element) {
  console.log(`Like card ${id}`);

  if (evt.target.classList.contains('card__like-button_is-active')) {
    deleteLike(id)
      .then(res => {
        console.log(res);
        showLikesNumber(element, res.likes.length);
        evt.target.classList.toggle('card__like-button_is-active');
      })
      .catch(err => {
        console.log(err);
      })

  } else {
    addLike(id)
      .then(res => {
        console.log(res);
        showLikesNumber(element, res.likes.length);
        evt.target.classList.toggle('card__like-button_is-active');
      })
      .catch(err => {
        console.log(err);
      })
  }
}
  
export function deleteCard(evt, id) {
  console.log(`Delete card ${id}`);
  evt.target.closest('.card').remove();
}

export function getImageAltText(name) {
    return `Фотография места ${name}`;
}