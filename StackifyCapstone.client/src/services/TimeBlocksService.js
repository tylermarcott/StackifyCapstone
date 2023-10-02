import { AppState } from "../AppState"
import { Timeblock } from "../models/Timeblock"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TimeBlocksService{
    async getMyTimeBlocks(){
        const eventId = AppState.activeEvent.id
        const res = await api.get(`api/events/${eventId}/timeblocks`)
        logger.log('getting timeblocks')
        AppState.myTimeBlocks = res.data.map(timeBlock => new Timeblock(timeBlock))
    }
}

export const timeBlocksService = new TimeBlocksService()