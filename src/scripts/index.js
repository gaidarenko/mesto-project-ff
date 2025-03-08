import '../pages/index.css';
import { initialCards } from './cards';
import { createCard, doLike, deleteCard, showImage } from './card';
import { closeModal, openModal } from './modal';

const placesElement = document.querySelector('.places__list');
// Форма редактирование профиля
const editForm = document.forms['edit-profile'];
// Форма добавления нового места
const newForm = document.forms['new-place'];

initialCards.forEach(function(card) {
  placesElement.append(createCard(card, deleteCard, doLike, showImage));
});

// Редактирование имени профиля
document.querySelector('.profile__edit-button').addEventListener('click', function(evt) {
  editForm.elements.name.value = document.querySelector('.profile__title').textContent;
  editForm.elements.description.value = document.querySelector('.profile__description').textContent;

  openModal(document.querySelector('.popup_type_edit'));
});

// Добавление новой карточки
document.querySelector('.profile__add-button').addEventListener('click', function(evt) {
  openModal(document.querySelector('.popup_type_new-card'));
});

// Сохранение имени профиля
editForm.addEventListener('submit', function(evt) {
  evt.preventDefault();

  document.querySelector('.profile__title').textContent = editForm.elements.name.value;
  document.querySelector('.profile__description').textContent = editForm.elements.description.value;

  closeModal(document.querySelector('.popup_type_edit'));
});

// Добавление нового места
newForm.addEventListener('submit', function(evt) {
  evt.preventDefault();

  const name = newForm.elements['place-name'].value;
  const link = newForm.elements.link.value;

  const card = createCard({ name, link });
  placesElement.prepend(card);

  newForm.elements['place-name'].value = '';
  newForm.elements.link.value = '';

  closeModal(document.querySelector('.popup_type_new-card'));
});