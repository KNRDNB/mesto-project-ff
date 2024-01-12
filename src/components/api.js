import {
  request
} from '../components/utils/utils.js';

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-4',
  headers: {
    authorization: 'c0edb41f-ba4d-40ed-827b-6ec0b8b823cf',
    'Content-Type': 'application/json',
  },
};

const getUserInfo = () => request(`${config.baseUrl}/users/me`, {headers: config.headers});

const updateUserInfo = (name, about) => request(`${config.baseUrl}/users/me`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({
    name: name,
    about: about
  })
});

const updateUserAvatar = (link) => request(`${config.baseUrl}/users/me/avatar`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({
    avatar: link
  })
});

const getServerCards = () => request(`${config.baseUrl}/cards`, {headers: config.headers});

const addServerCard = (placeName, link) => request(`${config.baseUrl}/cards`, {
  method: 'POST',
  headers: config.headers,
  body: JSON.stringify({
    name: placeName,
    link: link
  })
});

const deleteServerCard = (id) => request(`${config.baseUrl}/cards/${id}`, {
  method: 'DELETE',
  headers: config.headers,
});

const likeServerCard = (id) => request(`${config.baseUrl}/cards/likes/${id}`, {
  method: 'PUT',
  headers: config.headers,
});

const dislikeServerCard = (id) => request(`${config.baseUrl}/cards/likes/${id}`, {
  method: 'DELETE',
  headers: config.headers,
});

export { getUserInfo, updateUserInfo, updateUserAvatar, getServerCards, addServerCard, deleteServerCard, likeServerCard, dislikeServerCard };
