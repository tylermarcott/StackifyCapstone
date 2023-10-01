

export class Timeblock{
  constructor(data){
    this.ownerId = data.ownerId
    this.eventId = data.eventId
    this.title = data.title
    this.trackList = data.trackList
    this.duration = data.duration
    this.isCompleted = data.completed
    this.notes = data.notes
    this.isSilent = data.silent
  }
}