export class ActiveTrack{
  constructor(data) {
    this.id = data.item.id
    this.name = data.item.name
    this.artist = data.item.artists[0].name
    this.album = data.item.album.name
    this.progress = data.progress_ms
    this.duration = data.item.duration_ms
    this.picture = data.item.album.images[0].url
    this.year = new Date (data.item.album.release_date).toLocaleDateString()
    this.popularity = data.item.popularity
  }
}