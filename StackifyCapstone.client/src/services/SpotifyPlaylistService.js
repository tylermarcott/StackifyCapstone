import { AppState } from "../AppState"
import { Playlist } from "../models/Playlist"
import { logger } from "../utils/Logger"
import { spotifyApi } from "./AxiosService"

class SpotifyPlaylistService{
  async getUserPlaylists() {
    const bearerToken = localStorage.getItem('access_token')
    let res = await spotifyApi.get('https://api.spotify.com/v1/me/playlists', { headers: {Authorization: `Bearer ${bearerToken}`}})
    logger.log(res.data)
    AppState.playlists = res.data.items.map(playlist => new Playlist(playlist))
    logger.log('User Playlists', AppState.playlists)
  }
}

export const spotifyPlaylistService = new SpotifyPlaylistService()