import { logger } from "../utils/Logger.js";
import { spotifyClientId, redirectUri } from "../env.js";
import { AppState } from "../AppState.js";
import axios from "axios";

class SpotifyLoginService{
  
    generateRandomString(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  async spotifyConnect() {

    async function generateCodeChallenge(codeVerifier) {
      function base64encode(string) {
        return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=+$/, '');
      }

      const encoder = new TextEncoder();
      const data = encoder.encode(codeVerifier);


      const digest = await window.crypto.subtle.digest('SHA-256', data);

      return base64encode(digest);
    }

    const codeVerifier = this.generateRandomString(128);
    // NOTE don't call this just add scopes
    const codeChallenge = await generateCodeChallenge(codeVerifier)
    let state = this.generateRandomString(16);
    // NOTE NEED TO ADD SCOPES WHEN ADDING FUNCTIONALITY
     let scope = 'user-read-private user-read-email user-modify-playback-state user-read-playback-state user-read-currently-playing streaming app-remote-control playlist-read-private';
    logger.log(codeVerifier)
    localStorage.setItem('code_verifier', codeVerifier);
    localStorage.setItem('connect_code', codeVerifier)
    let args = new URLSearchParams({
      response_type: 'code',
      client_id: spotifyClientId,
      scope: scope,
      redirect_uri: redirectUri,
      state: state,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge
    });
    window.location = 'https://accounts.spotify.com/authorize?' + args;
  }

  async requestAuthCode() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      let code = urlParams.get('code');
      localStorage.setItem('REQUESTED_AUTH', code)
      let codeVerifier = localStorage.getItem('code_verifier');
      localStorage.setItem('authCode_Code', codeVerifier)
      let body = new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        // TODO if we are making a first event page need some logic here
        redirect_uri: redirectUri,
        client_id: spotifyClientId,
        code_verifier: codeVerifier
      });
      const options =
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body
      }
      const res = await fetch('https://accounts.spotify.com/api/token', options)
      const data = await res.json()
      logger.log('Data', data)
      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('refresh_token', data.refresh_token)
      AppState.accessToken = localStorage.getItem('access_token')
      AppState.refreshToken = localStorage.getItem('refresh_token')
      AppState.tokenExpire = Date.now() + data.expires_in * 1000
    } catch (error) {
      logger.error(error)
    }
  }

  // This function sends a simple req to see if our token is malformed
  async checkExpired() {
    const bearerToken = localStorage.getItem('access_token')
    const res = await axios.get("https://api.spotify.com/v1/me/player/devices", { headers: { Authorization: `Bearer ${bearerToken}` } })
    logger.log('Was the token expired?', res.data)
    // if we can't get devices for the account the token is expired: returns true
    if (!res.data.devices) {
      logger.log('token expired')
      return true
    }
    // if we can get devices the token is not expired: returns false
    if (res.data.devices) {
      logger.log('token not expired')
      return false
    }
  }

  // NOTE CALL THIS ONE TO GET A NEW REFRESHED TOKEN
  async refreshAccessToken() {
    const refreshToken = localStorage.getItem('refresh_token');
    logger.log('here is our refresh token:', refreshToken)
    const spotifyTokenUrl = 'https://accounts.spotify.com/api/token'
    const spotifyClientId = 'f60d41d8f71b48e59709254f06a045e8'
    let formData = new FormData();
    formData.append('grant_type', 'refresh_token');
    formData.append('refresh_token', refreshToken);
    formData.append('client_id', spotifyClientId)
    return fetch(spotifyTokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(formData).toString()

    })
      .then(response => response.json()
        .then(data => {
          if (data && data.access_token) {
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);
            AppState.tokenExpire = Date.now() + data.expires_in * 1000
            logger.log('Refresh token set in Local Storage')
          } else {
            throw new Error('No access token found')
          }
        }))
  }
}

export const spotifyLoginService = new SpotifyLoginService