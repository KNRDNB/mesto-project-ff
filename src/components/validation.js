function clearValidation(config, formElement){
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
    inputElement.classList.remove(config.inputErrorClass);
    inputElement.value = '';
  });
  toggleButtonState(config, inputList, buttonElement);
}

function showInputError(config, formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(config.inputErrorClass);
  errorElement.classList.add(config.errorClass);
  errorElement.textContent = errorMessage;
};

function hideInputError(config, formElement, inputElement){
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

function checkInputValidity(config, formElement, inputElement){
  const regex = /^[a-zA-zёЁа-яА-я\-\s]{1,}$/;

  if (!regex.test(inputElement.value) && inputElement.type == "text"){
    showInputError(config, formElement, inputElement, inputElement.dataset.errorMessage);
  }
  else if (!inputElement.validity.valid) {
    showInputError(config, formElement, inputElement, inputElement.validationMessage);
  }
  else {
    hideInputError(config, formElement, inputElement);
  }
};

function hasInvalidInput(inputList){
  return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
  });
};

function toggleButtonState(config, inputList, buttonElement){
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};

function setEventListeners(config, formElement){
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(config, inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(config, formElement, inputElement);
      toggleButtonState(config, inputList, buttonElement);
    });
  });
};

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(config, formElement);
  });
};

export { enableValidation, clearValidation };