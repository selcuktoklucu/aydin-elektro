import { apiUrl } from '../apiConfig'
import axios from 'axios'
import { Credentials } from '../shared/types'

export const signUp = (credentials: Credentials) =>
  fetch(`${apiUrl}/sign-up/`, {
    method: 'Post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Accept-Language': 'ru,en;q=0.9'
    },
    body: JSON.stringify({
      credentials: {
        email: `${credentials.email}`,
        phone: `${credentials.phone}`,
        name: `${credentials.name}`,
        fullName: `${credentials.fullName}`,
        dob: `${credentials.dob}`
      }
    })
  })

export const signIn = (credentials: Credentials) =>
  axios({
    url: apiUrl + '/sign-in',
    method: 'POST',
    data: {
      credentials: {
        email: credentials.email,
        phone: `${credentials.phone}`,
        name: `${credentials.name}`,
        fullName: `${credentials.fullName}`,
        dob: `${credentials.dob}`
      }
    }
  })

export const confirm = (credentials: Credentials, confirmation: string) =>
  //will be working on here
  axios({
    url: apiUrl + '/sign-in-confirm',
    method: 'POST',
    data: {
      credentials: {
        phone: `${credentials.phone}`,
        confirmation: `${confirmation}`
      }
    }
  })
export const signOut = user => {
  return axios({
    url: apiUrl + '/sign-out',
    method: 'DELETE',
    headers: {
      Authorization: `Token token=${user.token}`
    }
  })
}
// fetch(`${apiUrl}/sign-in/`, {
//   method: 'Post',
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//     'Accept-Language': 'ru,en;q=0.9'
//   },
//   body: JSON.stringify({
//     credentials: {
//       email: `${credentials.email}`,
//       password: `${credentials.password}`
//     }
//   })
// })
//   return axios({
//     method: 'POST',
//     url: apiUrl + '/sign-up',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//       'Accept-Language': 'ru,en;q=0.9'
//     },
//     data: {
//       credentials: {
//         email: credentials.email,
//         password: credentials.password,
//         password_confirmation: credentials.passwordConfirmation
//       }
//     }
//   })
// }

// export const signIn = credentials => {
//   console.log('logininin', apiUrl + '/sign-in')
//   return axios({
//     url: apiUrl + '/sign-in',
//     method: 'POST',
//     data: {
//       credentials: {
//         email: credentials.email,
//         password: credentials.password
//       }
//     }
//   })
// }

// export const signOut = user => {
//   return axios({
//     url: apiUrl + '/sign-out',
//     method: 'DELETE',
//     headers: {
//       Authorization: `Token token=${user.token}`
//     }
//   })
// }

// export const changePassword = (passwords, user) => {
//   return axios({
//     url: apiUrl + '/change-password',
//     method: 'PATCH',
//     headers: {
//       Authorization: `Token token=${user.token}`
//     },
//     data: {
//       passwords: {
//         old: passwords.oldPassword,
//         new: passwords.newPassword
//       }
//     }
//   })
// }
