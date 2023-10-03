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
    logger.log('edited the following timeblock to this:', res.data)

    const foundIndex = AppState.myTimeBlocks.findIndex(timeblock => timeblockId == timeblockId)

    const editedTimeblock = new Timeblock(res.data)

    AppState.myTimeBlocks.splice(foundIndex, 1, editedTimeblock)
  }
}


export const tracksService = new TracksService