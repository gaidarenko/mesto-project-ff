import '../pages/index.css';
import { initialCards } from './cards';
import { createCard, doLike, deleteCard, getImageAltText } from './card';
import { closeModal, openModal } from './modal';
import { getInitialCards, getProfileInfo, updateProfileInfo, addCard } from './api';

const placesElement = document.querySelector('.places__list');

// Форма редактирование профиля
const formProfile = document.forms['edit-profile'];
const popupProfile = document.querySelector('.popup_type_edit');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

// Форма добавления нового места
const formAddNewCard = document.forms['new-place'];
const popupAddNewCard = document.querySelector('.popup_type_new-card');

// Попап показа картинки во весь экран
const popupFullImage = document.querySelector('.popup_type_image');
const imagePopupFullImage = document.querySelector('.popup__image');
const captionPopupFullImage = document.querySelector('.popup__caption');


Promise.all([getProfileInfo(), getInitialCards()])
  .then(([profile, cards]) => {
    profileTitle.textContent = profile.name;
    profileDescription.textContent = profile.about;
    profileImage.backgroundImage = profile.avatar;

    cards.forEach(function(card) {
      placesElement.append(createCard(card, deleteCard, doLike, showFullImage, profile._id));
    });
  })
  .catch(err => {
    console.log(err);
  });

// Редактирование имени профиля
document.querySelector('.profile__edit-button').addEventListener('click', function(evt) {
  formProfile.elements.name.value = profileTitle.textContent;
  formProfile.elements.description.value = profileDescription.textContent;

  openModal(popupProfile);
});

// Добавление новой карточки
document.querySelector('.profile__add-button').addEventListener('click', function(evt) {
  openModal(popupAddNewCard);
});

// Сохранение имени профиля
formProfile.addEventListener('submit', function(evt) {
  evt.preventDefault();

  updateProfileInfo(formProfile.elements.name.value, formProfile.elements.description.value)
    .then(res => {
      profileTitle.textContent = formProfile.elements.name.value;
      profileDescription.textContent = formProfile.elements.description.value;
      
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })

  closeModal(popupProfile);
});

// Добавление нового места
formAddNewCard.addEventListener('submit', function(evt) {
  evt.preventDefault();

  const name = formAddNewCard.elements['place-name'].value;
  const link = formAddNewCard.elements.link.value;

  addCard(name, link)
    .then(res => {
      const card = createCard({ name, link }, deleteCard, doLike, showFullImage);
      placesElement.prepend(card);    
    })
    .catch(err => {
      console.log(err)
    });
    

  formAddNewCard.reset();

  closeModal(popupAddNewCard);
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

function showFullImage(name, link) {
  imagePopupFullImage.src = link; 
  imagePopupFullImage.alt = getImageAltText(name);
  captionPopupFullImage.textContent = name;

  openModal(popupFullImage);
}
