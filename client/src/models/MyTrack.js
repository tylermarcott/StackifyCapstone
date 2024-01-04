export class MyTrack {
  constructor(data) {
    this.albumImg = data.albumImg[0].url
    this.album = data.album
    this.artist = data.artist[0].name
    this.duration = data.duration
    this.id = data.id
    this.name = data.name
    this.popularity = data.popularity
  }
}