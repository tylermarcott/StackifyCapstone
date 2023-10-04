import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import {MyTrack} from '../models/MyTrack.js'
import { api } from "./AxiosService.js"
import { Timeblock } from "../models/Timeblock.js"


class TracksService{
  clearSearchedTracks(){
    AppState.tracks = []
  }

  async addTrackToActiveTimeblock(trackId){
    const foundTrack = AppState.tracks.find(track => trackId == track.id)
    AppState.activeTimeBlock.trackList.push(new MyTrack(foundTrack))
  }

  async editTimeblockTracklist(body, timeblockId){
    const res = await api.put(`api/timeblocks/${timeblockId}`, body)
    const foundIndex = AppState.myTimeBlocks.findIndex(timeblock => timeblockId == timeblock.id)
    const editedTimeblock = new Timeblock(res.data)
    AppState.myTimeBlocks.splice(foundIndex, 1, editedTimeblock)
    logger.log('now myTimeblocks looks like this:', AppState.myTimeBlocks)
  }

  async moveTrack(trackId, upOrDown){
    let ogIndex = AppState.activeTimeBlock.trackList.findIndex(track => track.id == trackId)
    let newIndex = ogIndex
    if(upOrDown == "up") newIndex--
    else newIndex ++
    let newTrack = AppState.activeTimeBlock.trackList[newIndex]
    let oldTrack = AppState.activeTimeBlock.trackList[ogIndex]
    AppState.activeTimeBlock.trackList.splice(ogIndex, 1, newTrack)
    AppState.activeTimeBlock.trackList.splice(newIndex, 1, oldTrack)
    await this.editTimeblockTracklist(AppState.activeTimeBlock, AppState.activeTimeBlock.id)
  }

  async deleteTrack(trackId){
    const trackIndex = AppState.activeTimeBlock.trackList.findIndex(track=> track.id == trackId)
    AppState.activeTimeBlock.trackList.splice(trackIndex, 1)
    await this.editTimeblockTracklist(AppState.activeTimeBlock, AppState.activeTimeBlock.id)
  }


}


export const tracksService = new TracksService