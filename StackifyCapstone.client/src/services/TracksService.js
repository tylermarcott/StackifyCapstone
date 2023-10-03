import { AppState } from "../AppState.js"


class TracksService{
  clearSearchedTracks(){
    AppState.tracks = []
  }
}


export const tracksService = new TracksService