export const clearValidation = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, config);
  });

  // Сделаем кнопку неактивной
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  setButtonState(true, buttonElement, config); 
}

export const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach(formElement => {
    setEventListeners(formElement, config);
  });
}
    
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, config);

      toggleButtonState(inputList, buttonElement, config);
    });
  });  
}

const isValid = (formElement, inputElement, config) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.validationError);
  } else {
    inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

const showInputError = (formElement, inputElement, errorMessage, config) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Остальной код такой же
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};
  
const hideInputError = (formElement, inputElement, config) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Остальной код такой же
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => !inputElement.validity.valid)
}; 
  
const toggleButtonState = (inputList, buttonElement, config) => {
  setButtonState(hasInvalidInput(inputList), buttonElement, config);
}

const setButtonState = (disable, buttonElement, config) => {
  if (disable) {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
}