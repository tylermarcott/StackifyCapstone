import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import {MyTrack} from '../models/MyTrack.js'


class TracksService{
  clearSearchedTracks(){
    AppState.tracks = []
  }

  async addTrackToActiveTimeblock(trackId){
    const foundTrack = AppState.tracks.find(track => trackId == track.id)

    logger.log('found track', foundTrack)

    AppState.activeTimeBlock.trackList.push(new MyTrack(foundTrack))

    logger.log('here is the track that we added to the active timeblock:', AppState.activeTimeBlock.trackList)
  }
}


export const tracksService = new TracksService