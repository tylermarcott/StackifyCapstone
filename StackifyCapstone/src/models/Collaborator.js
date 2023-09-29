import { Schema } from "mongoose";

export const CollaboratorSchema = new Schema({
    eventId: { type: Schema.Types.ObjectId, required: true, ref: "Event" },
    accountId: { type: Schema.Types.ObjectId, required: true, ref: "Account" }
}, { timestamps: true, toJSON: { virtuals: true } })

CollaboratorSchema.virtual('collaborator', {
    localField: 'accountId',
    foreignField: '_id',
    ref: "Account",
    justOne: true
})

CollaboratorSchema.virtual('event', {
    localField: 'eventId',
    foreignField: '_id',
    ref: 'Event',
    justOne: true,
})