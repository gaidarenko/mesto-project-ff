let openedModal = null;

export function openModal(modal) {
  modal.classList.add('popup_is-opened');
  openedModal = modal;
  document.addEventListener('keydown', closeButtonEsc);
}

export function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeButtonEsc);
  openedModal = null;
}
  
function closeButtonEsc(evt) {
  if (evt.key === 'Escape') {
    closeModal(openedModal);
  }
}