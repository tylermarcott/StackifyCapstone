


export class Event{
  constructor(data){
    this.ownerId = data.ownerId
    this.title = data.title
    this.type = data.eventType
    this.description = data.eventDescription
  }
}