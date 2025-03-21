const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-35',
  headers: {
    authorization: '0053d375-4e4b-47a1-bee5-89b3f16d0ef5',
    'Content-Type': 'application/json'
  }
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка запроса карточек: ${res.status}`);
    });
}

export const getProfileInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
  
      return Promise.reject(`Ошибка получения профиля: ${res.status}`);
    });
}

export const updateProfileInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({name, about})
  })
    .then(res => {
      if (res.ok) {
        return res.json();  
      }

      return Promise.reject(`Ошибка изменения профиля: ${res.status}`);
    });
}

export const addCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({name, link})
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка добавления карточки: ${res.status}`);
    });
}

export const deleteCard = (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    
      return Promise.reject(`Ошибка удаления карточки: ${res.status}`);
    });
}

export const addLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка добавления лайка: ${res.status}`);
    });
}

export const deleteLike = (id) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: config.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
  
        return Promise.reject(`Ошибка удаления лайка: ${res.status}`);
      });
  }