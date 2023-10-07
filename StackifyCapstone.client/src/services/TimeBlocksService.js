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
        AppState.myTimeBlocks.sort((t1, t2) => (t1.position - t2.position))
    }

    async createTimeblock(timeBlockData){
        timeBlockData.position = AppState.myTimeBlocks.length
        timeBlockData.duration = timeBlockData.duration*1000
        const res = await api.post('api/timeblocks', timeBlockData)
        logger.log('here is what my timeblocks looks like before create:', AppState.myTimeBlocks)
        AppState.myTimeBlocks.push(new Timeblock(res.data))
        const newTimeblockIndex = AppState.myTimeBlocks.length - 1
        logger.log('length of myTimeblocks', newTimeblockIndex)
        AppState.activeTimeBlock = AppState.myTimeBlocks[newTimeblockIndex]
        logger.log('here is my active timeblock now:', AppState.activeTimeBlock)
      }

      async moveTimeblock(timeblock, upOrDown){
        const ogPosition = timeblock.position
        let ogIndex = AppState.myTimeBlocks.findIndex(block=> block.id == timeblock.id)
        let newIndex = ogIndex
        if(upOrDown == "up") newIndex--
        else newIndex++
        let newTimeblock = AppState.myTimeBlocks[newIndex]
        timeblock.position = newTimeblock.position
        newTimeblock.position = ogPosition
        AppState.myTimeBlocks.splice(ogIndex, 1, newTimeblock)
        AppState.myTimeBlocks.splice(newIndex, 1, timeblock)
        await api.put(`api/timeblocks/${timeblock.id}`, timeblock)
        await api.put(`api/timeblocks/${newTimeblock.id}`, newTimeblock)
      }

      async saveNotes(timeblockId, timeblockData){
        const res = await api.put(`api/timeblocks/${timeblockId}`, timeblockData)
        AppState.activeTimeBlock.notes = res.data.notes
      }

      async editTimer(timeblockId, timeblockData){
        let msduration = timeblockData.duration
        let newTimeblock = {duration: msduration}
        newTimeblock.duration*=1000*60

        const res = await api.put(`api/timeblocks/${timeblockId}`, newTimeblock)
        AppState.activeTimeBlock.duration = res.data.duration
      }

      setActiveTimeblock(timeblockId){
        const activeTimeBlock = AppState.myTimeBlocks.find(timeblock => timeblock.id == timeblockId)
        logger.log('here is the timeblock found in id search:', activeTimeBlock)
        AppState.activeTimeBlock = activeTimeBlock
        logger.log('here is the active timeblock now in the appstate:', AppState.activeTimeBlock)
      }

      prevTimeblock(){
        AppState.activeTimeBlock = AppState.myTimeBlocks[AppState.activeTimeBlock.position-1]
      }

      nextTimeblock(){
        AppState.activeTimeBlock = AppState.myTimeBlocks[AppState.activeTimeBlock.position+1]
      }

      toggleLock(){
        AppState.activeTimeBlock.locked = !AppState.activeTimeBlock.locked
      }

      async deleteTimeblock(timeblockId){

        if(AppState.activeTimeBlock.id == timeblockId){
          AppState.activeTimeBlock = null
        }
        const timeblockToDelete = AppState.myTimeBlocks.findIndex(timeblock => timeblockId == timeblock.id)
        AppState.myTimeBlocks.splice(timeblockToDelete, 1)      
        await api.delete(`api/timeblocks/${timeblockId}`)
      }
}

export const timeBlocksService = new TimeBlocksService()