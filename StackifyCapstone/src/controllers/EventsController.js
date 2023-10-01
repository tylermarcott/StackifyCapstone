import { timeblocksService } from "../services/TimeblocksService.js"
import BaseController from "../utils/BaseController.js"


export class EventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('/:eventId/timeblocks', this.getTimeblocksByEvent)
    }



    async getTimeblocksByEvent(req, res, next) {
        try {
            const timeblocks = await timeblocksService.getTimeblocksByEvent(req.params.eventId)
            res.send(timeblocks)
        } catch (error) {
            next(error)
        }
    }
}