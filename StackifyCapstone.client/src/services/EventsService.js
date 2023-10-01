import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { Event } from "../models/Event.js" //NOTE: AGAIN, NEED TO IMPORT EVENT OR IT WILL DEFAULT TO VUE UTIL 'Event'




class EventsService {
  async createEvent(eventData){
    const res = await api.post('api/events', eventData)
    AppState.events.push(new Event(res.data))
  }
}

export const eventsService = new EventsService()