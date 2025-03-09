import '../pages/index.css';
import { initialCards } from './cards';
import { createCard, doLike, deleteCard } from './card';
import { closeModal, openModal } from './modal';

const placesElement = document.querySelector('.places__list');

// Форма редактирование профиля
const editForm = document.forms['edit-profile'];
const editPopup = document.querySelector('.popup_type_edit');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Форма добавления нового места
const newForm = document.forms['new-place'];
const newPopup = document.querySelector('.popup_type_new-card');

// Попап показа картинки во весь экран
const imagePopup = document.querySelector('.popup_type_image');
const image = document.querySelector('.popup__image');
const caption = document.querySelector('.popup__caption');

initialCards.forEach(function(card) {
  placesElement.append(createCard(card, deleteCard, doLike, showImage));
});

// Редактирование имени профиля
document.querySelector('.profile__edit-button').addEventListener('click', function(evt) {
  editForm.elements.name.value = profileTitle.textContent;
  editForm.elements.description.value = profileDescription.textContent;

  openModal(editPopup);
});

// Добавление новой карточки
document.querySelector('.profile__add-button').addEventListener('click', function(evt) {
  openModal(newPopup);
});

// Сохранение имени профиля
editForm.addEventListener('submit', function(evt) {
  evt.preventDefault();

  profileTitle.textContent = editForm.elements.name.value;
  profileDescription.textContent = editForm.elements.description.value;

  closeModal(editPopup);
});

// Добавление нового места
newForm.addEventListener('submit', function(evt) {
  evt.preventDefault();

  const name = newForm.elements['place-name'].value;
  const link = newForm.elements.link.value;

  const card = createCard({ name, link }, deleteCard, doLike, showImage);
  placesElement.prepend(card);

  newForm.reset();

  closeModal(newPopup);
});

// Добавим обработчики закрытия 
document.querySelectorAll('.popup').forEach(function(popup) {
  // Клик на оверлее
  popup.addEventListener('click', evt => {
    if (evt.target.classList.contains('popup')) {
      closeModal(popup);
    }
  });

  // Клик на 'X'
  popup.querySelector('.popup__close').addEventListener('click', evt => closeModal(popup));
});

function showImage(evt) {
  image.src = evt.target.src;
  caption.textContent = evt.target.closest('.card').querySelector('.card__title').textContent;

  openModal(imagePopup);
}
