import '../pages/index.css';
import { initialCards } from './cards';

function createCard(card, deleteCallback, likeCallback = doLike) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  cardElement.querySelector('.card__image').src = card.link;

  cardElement.querySelector('.card__image').addEventListener('click', function() {
    const popup = document.querySelector('.popup_type_image');
    popup.querySelector('.popup__image').src = card.link;
    popup.querySelector('.popup__caption').textContent = card.name;
    popup.style.display = "flex";  
  });

  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCallback);
  cardElement.querySelector('.card__like-button').addEventListener('click', likeCallback);

  return cardElement;
}

function doLike(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

function deleteCard(event) {
  event.target.parentElement.remove();
}

const placesElement = document.querySelector('.places__list');

initialCards.forEach(function(card) {
  placesElement.append(createCard(card, deleteCard, doLike));
});

document.querySelector('.profile__edit-button').addEventListener('click', function(evt) {
  document.forms['edit-profile'].elements.name.value = document.querySelector('.profile__title').textContent;
  document.forms['edit-profile'].elements.description.value = document.querySelector('.profile__description').textContent;

  const popup = document.querySelector('.popup_type_edit');
  popup.style.display = "flex";
});

document.querySelector('.profile__add-button').addEventListener('click', function(evt) {
  const popup = document.querySelector('.popup_type_new-card');
  popup.style.display = "flex";
});

function closePopups() {
  document.querySelectorAll('.popup').forEach(popup => popup.style.display = null );
}

// Кнопка закрытия "X"
document.querySelectorAll('.popup__close').forEach(button => button.addEventListener('click', closePopups));


// Закрытие кликом на оверлее
document.querySelectorAll('.popup').forEach(popup => popup.addEventListener('click', evt => {
  if (evt.target.classList.contains('popup')) {
    closePopups();
  }
}));


// Закрытие по ESC
window.addEventListener('keydown', function(evt) {
  if (evt.key === 'Escape') {
    closePopups();
  }
});

document.forms['edit-profile'].addEventListener('submit', function(evt) {
  evt.preventDefault();

  document.querySelector('.profile__title').textContent = document.forms['edit-profile'].elements.name.value;
  document.querySelector('.profile__description').textContent = document.forms['edit-profile'].elements.description.value;

  closePopups();
});