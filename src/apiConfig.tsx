export let apiUrl: string

const apiUrls = {
  development: 'http://localhost:4741',
  production: 'https://dotdot-api.herokuapp.com'
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

export default apiUrl
