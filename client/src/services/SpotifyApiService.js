import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api, spotifyApi } from "./AxiosService.js"
import { Track } from "../models/Track.js"
import { ActiveTrack } from "../models/ActiveTrack.js"
import { ActiveTrackDetails } from "../models/ActiveTrackDetails.js"


class SpotifyApiService{
  async getSong() {
    const bearerToken = localStorage.getItem('access_token')
    const res = await spotifyApi.get("https://api.spotify.com/v1/tracks/11dFghVXANMlKmJXsNCbNl", { headers: { Authorization: `Bearer ${bearerToken}` } })
    logger.log('here is our track:', res.data)
  }

// TODO: ok, so we have to find a way to append + between the user's search. 
  async searchSong(searchParam){
    const bearerToken = localStorage.getItem('access_token')
    const res = await spotifyApi.get(`https://api.spotify.com/v1/search?q=${searchParam}&type=track%2Calbum%2Cartist`, { headers: { Authorization: `Bearer ${bearerToken}` } })

    // NOTE: we are only using 'tracks' at the moment, not artists or albums. We will get to artists or albums if we have tine. We just have to save them into the appstate below, instead of just tracks
    logger.log('here are the songs we found from the search query:', res.data.tracks)

    AppState.tracks = res.data.tracks.items.map(track => new Track(track))

    logger.log('here are the following items in our appstate now:', AppState.tracks)
  }

  async getActiveTrack() {
    const bearerToken = localStorage.getItem('access_token')
    const url = 'https://api.spotify.com/v1/me/player/currently-playing'
    const res = await spotifyApi.get(url, { headers: { Authorization: `Bearer ${bearerToken}` } })
    if(res.data) {
      logger.log('Currently Playing Track', res.data.item.name)
      AppState.activeTrack = new ActiveTrack(res.data)
      return AppState.activeTrack.id
    }
  }

async getActiveTrackDetails(id){
  const bearerToken = localStorage.getItem('access_token')
  logger.log('this is the activeTrackId', id)
  const url = (`https://api.spotify.com/v1/audio-features/${id}`)
  const res = await spotifyApi.get(url, { headers: { Authorization: `Bearer ${bearerToken}` } })
  logger.log('Currently Playing Track Details', res.data)
  AppState.activeTrackDetails = new ActiveTrackDetails(res.data)
  logger.log(AppState.activeTrackDetails)
}

async getTimeblockTrackDetails(id, track){
  AppState.timeblockTrack = track
  const bearerToken = localStorage.getItem('access_token')
  const url = (`https://api.spotify.com/v1/audio-features/${id}`)
  const res = await spotifyApi.get(url, { headers: { Authorization: `Bearer ${bearerToken}` } })
  AppState.timeblockTrackDetails = new ActiveTrackDetails(res.data)
}

async getTimeblockTrack(id){
  const bearerToken = localStorage.getItem('access_token')
  const url = (`https://api.spotify.com/v1/tracks/${id}`)
  const res = await spotifyApi.get(url, { headers: { Authorization: `Bearer ${bearerToken}` } })
  AppState.timeblockTrackYear = new Date(res.data.album.release_date).toLocaleDateString()
}



}

export const spotifyApiService = new SpotifyApiService