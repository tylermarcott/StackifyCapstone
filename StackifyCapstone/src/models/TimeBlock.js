import { Schema } from "mongoose";

export const TimeBlocksSchema = new Schema({
    ownerId: { type: Schema.Types.ObjectId, ref: "Account", required: true },
    eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    title: { type: String, required: true, maxLength: 250 },
    // NOTE this may be wrong
    trackList: { type: [{}] },
    duration: { type: Number, max: 99999999999, default: 0 },
    completed: { type: Boolean, default: false },
    notes: { type: String, maxLength: 9999 },
    silent: { type: Boolean, default: false },
    position: { type: Number, max: 99999 },

}, { timestamps: true, toJSON: { virtuals: true } })

TimeBlocksSchema.virtual("owner", {
    localField: "ownerId",
    foreignField: "_id",
    ref: "Account",
    justOne: true
})