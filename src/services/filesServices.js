import { api_root } from './root'

const createFile = (data) => {
  return fetch(`${api_root}/files`, { method: 'POST', body: data })
}

const updateFile = (data) => {
  return fetch(`${api_root}/files`, { method: 'PUT', body: data })
}

const deleteFile = (id) => {
  return fetch(`${api_root}/files`, { headers: { 'Content-Type': 'application/json;' }, method: 'DELETE', body: JSON.stringify({ id }) })
}

const getFiles = () => {
  return fetch(`${api_root}/files`)
}

export { createFile, getFiles, deleteFile, updateFile }
