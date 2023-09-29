
export class Track {
    constructor(data){
        this.id = data.id
        this.albumImg = data.album.images.url
        this.album = data.name
        this.artist = data.artists.name

        this.track = data.name

        this.key = data.key
        this.duration = data.duration_ms
        this.valence = data.valence
        this.danceability = data.danceability
        this.bpm = data.tempo
        this.popularity = data.
    }
}