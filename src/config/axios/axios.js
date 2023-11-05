import axios from 'axios'

export const axiosServer = axios.create({
  baseURL: 'https://apiseisicite-pg.gelinski.dev',
  timeout: 15000,
})
