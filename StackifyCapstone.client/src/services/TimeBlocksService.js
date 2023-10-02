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

    async createTimeblock(timeBlockData){
        const res = await api.post('api/timeblocks', timeBlockData)
        const activeTimeblock = AppState.myTimeBlocks.push(new Timeblock(res.data))
        AppState.activeTimeBlock = activeTimeblock
      }
}

export const timeBlocksService = new TimeBlocksService()