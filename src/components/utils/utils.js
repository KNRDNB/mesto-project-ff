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

async function handleSubmit(request, event, loadingText = "Сохранение...") {
   event.preventDefault();
   const submitButton = event.submitter;
   const initialText = submitButton.textContent;
   renderLoading(true, submitButton, initialText, loadingText);
   let state;
   await request()
     .then(() => {
       event.target.reset();
       state = true;
     })
     .catch((error) => {
       console.error(`Ошибка: ${error}`);
       state = false;
     })
     .finally(() => {
       renderLoading(false, submitButton, initialText);

     });
    return state;
 }

export { request, handleSubmit };