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

    logger.log('found track', foundTrack)

    AppState.activeTimeBlock.trackList.push(new MyTrack(foundTrack))

    logger.log('here is the track that we added to the active timeblock:', AppState.activeTimeBlock.trackList)

    // TODO: need to make a put request that edits the timeblock to add a new track to the tracklist in DB
  }

  async editTimeblockTracklist(body, timeblockId){
    const res = await api.put(`api/timeblocks/${timeblockId}`, body)
    const foundIndex = AppState.myTimeBlocks.findIndex(timeblock => timeblockId == timeblock.id)
    const editedTimeblock = new Timeblock(res.data)
    AppState.myTimeBlocks.splice(foundIndex, 1, editedTimeblock)
    logger.log('now myTimeblocks looks like this:', AppState.myTimeBlocks)
  }

  async deleteTrack(trackId){
    const trackIndex = AppState.activeTimeBlock.trackList.findIndex(track=> track.id == trackId)
    AppState.activeTimeBlock.trackList.splice(trackIndex, 1)
    await this.editTimeblockTracklist(AppState.activeTimeBlock, AppState.activeTimeBlock.id)
  }
}


export const tracksService = new TracksService