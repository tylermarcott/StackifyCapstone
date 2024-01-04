export class Playlist{
  constructor(data){
    this.id = data.id
    this.name = data.name
    this.description = data.description
    this.tracksUrl = data.tracks.href
    this.trackCount = data.tracks.total
    this.duration = data.tracks.duration_ms
  }
}