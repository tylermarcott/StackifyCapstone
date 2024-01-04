export class ActiveTrackDetails {
    constructor(data) {
        //this.id = data.id
        this.key = data.key
        this.bpm = data.tempo
        this.duration = data.duration_ms
        this.danceability = data.danceability
        this.valence = data.valence

        
    }
}