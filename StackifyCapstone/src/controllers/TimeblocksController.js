import { Auth0Provider } from "@bcwdev/auth0provider"
import { timeblocksService } from "../services/TimeblocksService.js"
import BaseController from "../utils/BaseController.js"



export class TimeblocksController extends BaseController {
    constructor() {
        super('api/timeblocks')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTimeblock)
            .put('/:timeblockId', this.editTimeblock)
            .delete('/:timeblockId', this.deleteTimeblock)
    }
    async createTimeblock(req, res, next) {
        try {
            const timeblockBody = req.body
            timeblockBody.ownerId = req.userInfo.id
            const timeblock = await timeblocksService.createTimeblock(timeblockBody)
            res.send(timeblock)
        } catch (error) {
            next(error)

        }
    }

    async editTimeblock(req, res, next) {
        try {
            let updates = req.body
            updates.ownerId = req.userInfo.id
            const editedTimeblock = await timeblocksService.editTimeblock(req.params.timeblockId, updates, updates.ownerId)
            res.send(editedTimeblock)
        } catch (error) {
            next(error)
        }
    }
    async deleteTimeblock(req, res, next) {
        try {
            const message = await timeblocksService.deleteTimeblock(req.params.timeblockId, req.userInfo.id)
            res.send(message)
        } catch (error) {
            next(error)
        }
    }


}