import '../pages/index.css';
import { createCard, doLike, deleteCard, getImageAltText } from './card';
import { closeModal, openModal } from './modal';
import { clearValidation, enableValidation } from './validation';
import { getInitialCards, getProfileInfo, updateProfileInfo, addCard, updateAvatar } from './api';

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

// Форма смена картинки аватара
const formAvatar = document.forms['edit-avatar'];
const popupAvatar = document.querySelector('.popup_type_avatar');

const VALIDATION_CONFIG = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

Promise.all([getProfileInfo(), getInitialCards()])
  .then(([profile, cards]) => {
    profileTitle.textContent = profile.name;
    profileDescription.textContent = profile.about;
    profileImage.style.backgroundImage = `url(${profile.avatar})`;

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

  clearValidation(popupProfile, VALIDATION_CONFIG);
  openModal(popupProfile);
});

// Обновление аватара
document.querySelector('.profile__image').addEventListener('click', function(evt) {
  formAvatar.reset();
  clearValidation(popupAvatar, VALIDATION_CONFIG);
  openModal(popupAvatar);
});

// Добавление новой карточки
document.querySelector('.profile__add-button').addEventListener('click', function(evt) {
  formAddNewCard.reset();
  clearValidation(popupAddNewCard, VALIDATION_CONFIG);
  openModal(popupAddNewCard);
});

function renderLoading(form, isLoading) {
  form.elements.submit.textContent = isLoading ? 'Сохранение...' : 'Сохранить';
}

// Сохранение нового аватара
formAvatar.addEventListener('submit', function(evt) {
  evt.preventDefault();

  renderLoading(formAvatar, true);

  const link = formAvatar.elements.link.value;

  updateAvatar(link)
    .then(res => {
      profileImage.style.backgroundImage = `url(${res.avatar})`;

      formAvatar.reset();
      closeModal(popupAvatar);
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(formAvatar, false);
    });

});

// Сохранение имени профиля
formProfile.addEventListener('submit', function(evt) {
  evt.preventDefault();

  renderLoading(formProfile, true);

  updateProfileInfo(formProfile.elements.name.value, formProfile.elements.description.value)
    .then(res => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;

      closeModal(popupProfile);
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(formProfile, false);
    });

});

// Добавление нового места
formAddNewCard.addEventListener('submit', function(evt) {
  evt.preventDefault();

  renderLoading(formAddNewCard, true);

  const name = formAddNewCard.elements['place-name'].value;
  const link = formAddNewCard.elements.link.value;

  addCard(name, link)
    .then(res => {
      const card = createCard(res, deleteCard, doLike, showFullImage, res.owner._id);
      placesElement.prepend(card);    

      formAddNewCard.reset();
      closeModal(popupAddNewCard);
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => {
      renderLoading(formAddNewCard, false);
    });
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


enableValidation(VALIDATION_CONFIG);
