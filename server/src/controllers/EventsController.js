import { Auth0Provider } from "@bcwdev/auth0provider"
import { timeblocksService } from "../services/TimeblocksService.js"
import BaseController from "../utils/BaseController.js"
import { eventsService } from "../services/EventsService.js"


export class EventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('/:eventId/timeblocks', this.getTimeblocksByEvent)
            .get('/:eventId', this.getEventById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .get('', this.getMyEvents)
            .post('', this.createEvent)
            .put('/:eventId', this.editEvent)
            .post('/:eventId', this.copyEvent)
            .delete('/:eventId', this.deleteEvent)

    }


    async getTimeblocksByEvent(req, res, next) {
        try {
            const timeblocks = await timeblocksService.getTimeblocksByEvent(req.params.eventId)
            res.send(timeblocks)
        } catch (error) {
            next(error)
        }
    }

    // NOTE doesn't need authorization to see this
    async getEventById(req, res, next) {
        try {
            const event = await eventsService.getEventById(req.params.eventId)
            res.send(event)
        } catch (error) {
            next(error)
        }
    }

    // NOTE only gets events where you are the owner
    async getMyEvents(req, res, next) {
        try {
            const ownerId = req.userInfo.id
            const events = await eventsService.getMyEvents(ownerId)
            res.send(events)
        } catch (error) {
            next(error)
        }
    }


    async createEvent(req, res, next) {
        try {
            let eventBody = req.body
            eventBody.ownerId = req.userInfo.id
            const event = await eventsService.createEvent(eventBody)
            res.send(event)
        } catch (error) {
            next(error)
        }
    }

    async editEvent(req, res, next) {
        try {
            let eventBody = req.body
            eventBody.ownerId = req.userInfo.id
            const updatedEvent = await eventsService.editEvent(req.params.eventId, eventBody, eventBody.ownerId)
            res.send(updatedEvent)
        } catch (error) {
            next(error)
        }
    }

    async copyEvent(req, res, next) {
        try {
            const copiedEvent = await eventsService.copyEvent(req.params.eventId, req.userInfo.id)
            res.send(copiedEvent)
        } catch (error) {
            next(error)
        }
    }

    async deleteEvent(req, res, next) {
        try {
            const message = await eventsService.deleteEvent(req.params.eventId, req.userInfo.id)
            res.send(message)
        } catch (error) {
            next(error)
        }
    }
}