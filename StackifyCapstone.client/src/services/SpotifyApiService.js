import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api, spotifyApi } from "./AxiosService.js"
import { Track } from "../models/Track.js"



class SpotifyApiService{
  async getSong() {
    const bearerToken = localStorage.getItem('access_token')
    const res = await spotifyApi.get("https://api.spotify.com/v1/tracks/11dFghVXANMlKmJXsNCbNl", { headers: { Authorization: `Bearer ${bearerToken}` } })
    logger.log('here is our track:', res.data)
    // this.playSong()
    // this.getDevice()
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



}

export const spotifyApiService = new SpotifyApiService