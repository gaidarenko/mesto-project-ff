let openedModal = null;

export function openModal(modal) {
  modal.classList.add('popup_is-opened');
  openedModal = modal;
  document.addEventListener('keydown', closeOpenedModal);
}

export function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeOpenedModal);
  openedModal = null;
}

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
  
function closeOpenedModal(evt) {
  if (evt.key === 'Escape') {
    closeModal(openedModal);
  }
}