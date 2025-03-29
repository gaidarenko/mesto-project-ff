const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-35',
  headers: {
    authorization: '0053d375-4e4b-47a1-bee5-89b3f16d0ef5',
    'Content-Type': 'application/json'
  }
}

function getResponseData(res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => getResponseData(res));
}

export const getProfileInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(res => getResponseData(res));
}

export const updateProfileInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({name, about})
  })
    .then(res => getResponseData(res));
}

export const addCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({name, link})
  })
    .then(res => getResponseData(res));
}

export const removeCard = (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(res => getResponseData(res));
}

export const addLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then(res => getResponseData(res));
}

export const deleteLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(res => getResponseData(res));
}

export const updateAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({avatar})
  })
    .then(res => getResponseData(res));
}