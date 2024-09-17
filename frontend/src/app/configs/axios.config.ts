import axios from 'axios'
const api = process.env.NEXT_PUBLIC_API || 'http:localhost:5001/api/'

const token: string = localStorage.getItem('posToken') || ''
axios.defaults.headers.post['Content-Type'] = 'application/json'

const publicAxios = axios.create({
  baseURL: api,
})

const userAxios = axios.create({
  baseURL: api,
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

const userAxioswithoutRedirect = axios.create({
  baseURL: api,
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

const updateAxiosToken = (token: string | undefined): void => {
  if (token ?? '') {
    userAxios.defaults.headers.Authorization = `Bearer ${token}`
    userAxioswithoutRedirect.defaults.headers.Authorization = `Bearer ${token}`
  }
}

const userAxiosWithRedirect = axios.create({
  baseURL: api,
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

// userAxiosWithRedirect.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response.status === 401 && router?.pathname !== '/') {
//       // Cookies.remove('nToken', {
//       //   expires: 2,
//       // });
//       window.location.href = `${process.env.NEXT_PUBLIC_APP}/auth/login`
//     }
//     return Promise.reject(error)
//   },
// )

export {
  publicAxios,
  userAxios,
  userAxioswithoutRedirect,
  updateAxiosToken,
  userAxiosWithRedirect,
}
