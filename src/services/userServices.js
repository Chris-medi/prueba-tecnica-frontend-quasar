import { api_root } from './root'

const logginUser = (data) => {
  return fetch(`${api_root}/session`, { method: 'POST', headers: { 'Content-Type': 'application/json; charset=UTF-8' }, body: JSON.stringify(data) , mode: 'no-cors'})
}

const validateUser = (data) => {
  return fetch(`${api_root}/validate`, { method: 'POST', headers: { 'Content-Type': 'application/json; charset=UTF-8' }, body: JSON.stringify(data) })
}

export { logginUser, validateUser }
