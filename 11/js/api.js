const SERVER_URL = 'https://30.javascript.pages.academy/kekstagram';

const ServerRoute = {
  GET_DATA: '/data',
  SEND_DATA: '/'
};

const HttpMethod = {
  GET: 'GET',
  POST: 'POST'
};


const loadPhotos = (onSuccess, onFail) => fetch(`${SERVER_URL}${ServerRoute.GET_DATA}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Данные не загрузились');
    }

    return response.json();
  })
  .then((photos) => {
    onSuccess(photos);
  })
  .catch(() => {
    onFail();
  });


const sendPhotos = (onSuccess, onFail, body) => fetch(`${SERVER_URL}${ServerRoute.SEND_DATA}`,
  {
    method: HttpMethod.POST,
    body,
  }
)
  .then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onFail();
    }
  })
  .catch(() => onFail());


export { loadPhotos, sendPhotos };
