import axios from 'axios'
import { message } from 'antd'

export const API = {}

const ENPOINT = `http://localhost:3000/`

function checkRequest(request) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await request()
      resolve(data)
    } catch (error) {
      message.error(error)
      reject(error)
    }
  })
}

API.getEvents = () => checkRequest(() => axios.get(`${ENPOINT}event`))
API.getEvent = id => checkRequest(() => axios.get(`${ENPOINT}event/${id}`))
API.createEvent = form =>
  checkRequest(() => axios.post(`${ENPOINT}event`, form))
API.getEventInvitations = id =>
  checkRequest(() => axios.get(`${ENPOINT}event/${id}/invitation`))
API.createEventInvitation = form =>
  checkRequest(() => axios.post(`${ENPOINT}event/invitation`, form))
API.updateEventInvitation = (id, form) =>
  checkRequest(() => axios.put(`${ENPOINT}event/${id}/invitation`, form))
API.getGameTypes = () => checkRequest(() => axios.get(`${ENPOINT}gameType`))
API.getSportsVenues = () =>
  checkRequest(() => axios.get(`${ENPOINT}sportsVenue`))
