import axios from 'axios'

export const axiosServer = axios.create({
  baseURL: 'http://www.apiseisicite-pg.gelinski.dev',
  timeout: 15000,
})
