import axios from 'axios'

export const api = axios.create({
  baseURL:
    'http://fullcalendar-tg-alb-44949208.ap-northeast-1.elb.amazonaws.com:80',
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  withCredentials: true,
})
