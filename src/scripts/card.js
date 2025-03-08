import { openModal } from './modal';

export function showImage(evt) {
  const popup = document.querySelector('.popup_type_image');

  popup.querySelector('.popup__image').src = evt.target.src;
  popup.querySelector('.popup__caption').textContent = evt.target.parentElement.querySelector('.card__title').textContent;

  openModal(popup);
}

export function doLike(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

export function deleteCard(evt) {
  evt.target.parentElement.remove();
}

export function createCard(card, deleteCallback = deleteCard, likeCallback = doLike, imageClickCallback = showImage) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  
    cardElement.querySelector('.card__image').src = card.link;
  
    // Открытие картинки на весь экран
    cardElement.querySelector('.card__image').addEventListener('click', imageClickCallback);
  
    cardElement.querySelector('.card__title').textContent = card.name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCallback);
    cardElement.querySelector('.card__like-button').addEventListener('click', likeCallback);
  
    return cardElement;
  }
  