function openModal(popup) {
  popup.classList.toggle('popup_is-opened');
}

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
}

function closeModalKey(event) {
  if (event.key == 'Escape') {
    const popup = document.querySelector('.popup_is-opened');
    document.removeEventListener('keydown', closeModalKey);
    closeModal(popup)
  }
}
function closeModalOverlay(event){
  if (!event.target.closest('.popup__content')) {
    const popup = document.querySelector('.popup_is-opened');
    closeModal(popup)
  }
}

export {openModal, closeModal, closeModalKey, closeModalOverlay}