


export class Event{
  constructor(data){
    this.ownerId = data.ownerId
    this.title = data.title
    this.eventType = data.eventType
    this.eventDescription = data.eventDescription
    this.id = data.id
  }
}