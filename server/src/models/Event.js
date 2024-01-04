import { Schema } from "mongoose";

export const EventsSchema = new Schema(
    {
        ownerId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
        title: { type: String, required: true, maxLength: 200 },
        // NOTE add whatever enums you would like for the type of event to be
        eventType: { type: String, enum: ['wedding', 'birthday', 'club', 'party'] },
        eventDescription: { type: String, maxLength: 1000 },

    }, { timestamps: true, toJSON: { virtuals: true } })

EventsSchema.virtual('owner', {
    localField: 'ownerId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})
