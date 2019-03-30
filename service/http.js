const axios = require('axios');

const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36';
axios.defaults.headers.common['User-Agent'] = USER_AGENT;

const postUrl = 'https://yande.re/post.json';
const popularUrl = 'https://yande.re/post/popular_recent.json';

const getYandePic = (params) => {
  return axios.get(postUrl, {
    params
  })
};

const getYandePopularPic = (params) => {
  return axios.get(popularUrl, {
    params
  })
};



module.exports = {
  getYandePic,
  getYandePopularPic
}