function openModal(popup) {
  popup.classList.toggle('popup_is-opened');
  document.addEventListener('keydown', closeModalKey);
}

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeModalKey);
}

function closeModalKey(event) {
  if (event.key == 'Escape') {
    const popup = document.querySelector('.popup_is-opened');
    closeModal(popup);
  }
}
function closeModalOverlay(event) {
  if (!event.target.closest('.popup__content')) {
    const popup = document.querySelector('.popup_is-opened');
    closeModal(popup);
  }
}

export { openModal, closeModal, closeModalKey, closeModalOverlay };
