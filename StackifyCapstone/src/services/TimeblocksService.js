import { dbContext } from "../db/DbContext.js"

class TimeblocksService {
    async createTimeblock(timeblockBody) {
        const timeblock = await dbContext.Timeblock.create(timeblockBody)
        await timeblock.populate('owner')
        return timeblock
    }
    async getTimeblocksByEvent(eventId) {
        const timeblock = await dbContext.Timeblock.find({ eventId })
        return timeblock
    }

    async editTimeblock(timeblockId, updates, ownerId) {
        const originalTimeblock = await dbContext.Timeblock.findById(timeblockId)
        if (!originalTimeblock) throw new Error(`Unable to find timeblock at ${timeblockId}`)
        if (originalTimeblock.ownerId != ownerId) throw new Error("You don't own this event")
        originalTimeblock.title = updates.title != undefined ? updates.title : originalTimeblock.title
        originalTimeblock.trackList = updates.trackList != undefined ? updates.trackList : originalTimeblock.trackList
        originalTimeblock.duration = updates.duration != undefined ? updates.duration : originalTimeblock.duration
        originalTimeblock.completed = updates.completed != undefined ? updates.completed : originalTimeblock.completed
        originalTimeblock.notes = updates.notes != undefined ? updates.notes : originalTimeblock.notes
        originalTimeblock.silent = updates.silent != undefined ? updates.silent : originalTimeblock.silent
        originalTimeblock.position = updates.position != undefined ? updates.position : originalTimeblock.position

        await originalTimeblock.save()
        return originalTimeblock
    }
}

export const timeblocksService = new TimeblocksService()