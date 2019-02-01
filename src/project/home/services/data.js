import http from '@/common/http';

const SUCCESS = 200;

const fetchWelcomeWord = params => {
  return new Promise((resolve, reject) => {
    http.get('welcome/getWord', {
      params
    }).then(response => {
      if (response.code === SUCCESS) {
        resolve(response);
      } else {
        reject(response);
      }
    }).catch(response => {
      reject(response);
    });
  });
};

export {
  fetchWelcomeWord
};
