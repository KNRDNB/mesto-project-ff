function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

function request(url, options) {
  return fetch(url, options).then(checkResponse)
}

function renderLoading(isLoading, button, buttonText='Сохранить', loadingText='Сохранение...') {
  if (isLoading) {
    button.textContent = loadingText
  } else {
    button.textContent = buttonText
  }
}

function handleSubmit(request, event, withFormReset = true, loadingText = "Сохранение...") {
   event.preventDefault();
   const submitButton = event.submitter;
   const initialText = submitButton.textContent;
   renderLoading(true, submitButton, initialText, loadingText);
   request()
     .then(() => {
        withFormReset && event.target.reset();
     })
     .catch((error) => {
        console.error(`Ошибка: ${error}`);
     })
     .finally(() => {
        renderLoading(false, submitButton, initialText);
     });
 }

export { request, handleSubmit };