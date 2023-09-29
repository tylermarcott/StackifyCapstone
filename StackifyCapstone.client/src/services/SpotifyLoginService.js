import { logger } from "../utils/Logger.js";
import { clientId, redirectUri } from "../env.js";





const codeVerifier = this.generateRandomString(128);

class SpotifyLoginService{
  
// NOTE: we don;t call this, this is called in another function
    generateRandomString(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }



// NOTE: this is what we use to connect to Spotify. When ran, this will open a new tab and prompt you to connect to Spotify
  spotifyConnect() {
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


  // NOTE don't call this just add scopes
  generateCodeChallenge(codeVerifier).then(codeChallenge => {
    let state = this.generateRandomString(16);
    // NOTE NEED TO ADD SCOPES WHEN ADDING FUNCTIONALITY
    let scope = 'user-read-private user-read-email user-modify-playback-state user-read-playback-state streaming app-remote-control';
    logger.log(codeVerifier)
    localStorage.setItem('code_verifier', codeVerifier);

    let args = new URLSearchParams({
      response_type: 'code',
      client_id: clientId,
      scope: scope,
      redirect_uri: redirectUri,
      state: state,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge
    });

    window.location = 'https://accounts.spotify.com/authorize?' + args;
  });
  this.requestToken()
  }

  







// NOTE this is called on spotify connect don't call it again do the refresh one instead
  async requestToken() {
  const urlParams = new URLSearchParams(window.location.search);
  let code = urlParams.get('code');

  let codeVerifier = localStorage.getItem('code_verifier');

  let body = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: redirectUri,
    client_id: clientId,
    code_verifier: codeVerifier
  });

// NOTE: we took off const res = here for simplifying, but if things fuck up this might be it
  fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: body
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('HTTP status ' + response.status);
      }
      return response.json();
    })
    .then(data => {
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
    })
    .catch(error => {
      logger.error('Error:', error);
    });
  logger.log('we got our access token!:', localStorage.getItem('access_token'))
}






// NOTE CALL THIS ONE TO GET A NEW REFRESHED TOKEN
refreshAccessToken() {
  const refreshToken = localStorage.getItem('refresh_token');
  logger.log('here is our refresh token:', refreshToken)
  const spotifyTokenUrl = 'https://accounts.spotify.com/api/token'
  const clientId = 'f60d41d8f71b48e59709254f06a045e8'

  let formData = new FormData();
  formData.append('grant_type', 'refresh_token');
  formData.append('refresh_token', refreshToken);
  formData.append('client_id', clientId)

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
        } else {
          throw new Error('No access token found')
        }
      }))
}


}

export const spotifyLoginService = new SpotifyLoginService