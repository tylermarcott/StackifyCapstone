import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { Event } from "../models/Event.js" //NOTE: AGAIN, NEED TO IMPORT EVENT OR IT WILL DEFAULT TO VUE UTIL 'Event'




class EventsService {
  async createEvent(eventData){
    const res = await api.post('api/events', eventData)
    const newEvent = new Event(res.data)
    AppState.events.push(newEvent)
    AppState.activeEvent = newEvent
    AppState.activeTimeBlock = null
  }

  async getMyEvents() {
    const res = await api.get('api/events')
    AppState.events = res.data.map(event => new Event(event))
    logger.log('here are our events stored in appstate:', AppState.events)
  }

  setActiveEvent(eventId){
    const activeEvent = AppState.events.find(event => eventId == event.id)
    AppState.activeEvent = activeEvent
  }

  async deleteEvent(eventId){
    const res = await api.delete(`api/events/${eventId}`)
    const eventToDelete = AppState.events.findIndex(event => eventId == event.id)
    AppState.events.splice(eventToDelete, 1)

    return res.data
  }

  async editEvent(body, eventId){
    const res = await api.put(`api/events/${eventId}`, body)
    const foundIndex = AppState.events.findIndex(event => eventId == event.id)

    const editedEvent = new Event(res.data)

    AppState.events.splice(foundIndex, 1, editedEvent)
  }
}

export const eventsService = new EventsService()