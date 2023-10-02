import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { Event } from "../models/Event.js" //NOTE: AGAIN, NEED TO IMPORT EVENT OR IT WILL DEFAULT TO VUE UTIL 'Event'
import { accountService } from "./AccountService.js"




class EventsService {
  async createEvent(eventData){
    const res = await api.post('api/events', eventData)
    AppState.events.push(new Event(res.data))
  }

  async getEventsByAccount(accountId) {
    const res = await api.get(`api/events/?_id=${accountId}`)
    AppState.events = res.data.map(event => new Event(event))
    logger.log('here are our events stored in appstate:', AppState.events)
  }

  setActiveEvent(eventId){
    const activeEvent = AppState.events.find(event => eventId == event.id)
    AppState.activeEvent = activeEvent
  }
}

export const eventsService = new EventsService()