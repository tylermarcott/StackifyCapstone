
export class Track {
    constructor(data){
        this.albumImg = data.album.images
        this.album = data.album.name
        this.artist = data.artists
        this.duration = data.duration_ms
        this.id = data.id
        this.name = data.name
        this.popularity = data.popularity
        this.year = data.album.release_date //new Date (data.item.album.release_date).toLocaleDateString()


        // NOTE: these are for 'Get track's audio features', will implement this once we ae able to add songs to our timeblock.
        // this.key = data.key
        // this.valence = data.valence
        // this.danceability = data.danceability
        // this.bpm = data.tempo
        
    }
}