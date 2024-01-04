import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"


class EventsService {


    async getEventById(eventId) {
        const event = await dbContext.Event.findById(eventId).populate('owner')
        return event
    }
    async getMyEvents(ownerId) {
        const events = await dbContext.Event.find({ ownerId }).populate('owner')
        return events
    }

    async createEvent(eventBody) {
        const event = await dbContext.Event.create(eventBody)
        await event.populate('owner')
        return event
    }

    async editEvent(eventId, eventBody, ownerId) {
        const foundEvent = await this.getEventById(eventId)
        if (!foundEvent) throw new BadRequest('There is no event at this id ' + eventId)
        if (foundEvent.ownerId != ownerId) throw new Forbidden("You don't own this event")
        foundEvent.title = eventBody.title || foundEvent.title
        foundEvent.eventType = eventBody.eventType || foundEvent.eventType
        foundEvent.eventDescription = eventBody.eventDescription || eventBody.eventDescription
        await foundEvent.save()
        return foundEvent
    }

    async copyEvent(eventId, ownerId) {
        const eventToCopy = await this.getEventById(eventId)
        if (!eventToCopy) throw new BadRequest('there is no event to copy at id of ' + eventId)
        let newEvent = {}
        newEvent.ownerId = ownerId
        newEvent.title = eventToCopy.title
        newEvent.eventType = eventToCopy.eventType
        const copiedEvent = await this.createEvent(newEvent)
        return copiedEvent
    }

    async deleteEvent(eventId, ownerId) {
        const eventToDelete = await this.getEventById(eventId)
        if (eventToDelete.ownerId != ownerId) throw new Forbidden("This is not your Event")
        await eventToDelete.delete()
        return 'deleted the event'
    }
}

export const eventsService = new EventsService()