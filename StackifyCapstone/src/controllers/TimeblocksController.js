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
    }
    async createTimeblock(req, res, next) {
        try {
            const timeblockBody = req.body
            const timeblock = await timeblocksService.createTimeblock(timeblockBody)
            res.send(timeblock)
        } catch (error) {
            next(error)

        }
    }

    async editTimeblock(req, res, next) {
        try {
            const updates = req.body
            const timeblockId = req.params.timeblockId
            const editedTimeblock = await timeblocksService.editTimeblock(timeblockId, updates, req.ownerInfo.id)
            res.send(editedTimeblock)
        } catch (error) {
            next(error)
        }
    }


}