import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { CollaboratorSchema } from "../models/Collaborator.js";
import { EventsSchema } from "../models/Event.js";
import { TimeBlocksSchema } from "../models/TimeBlock.js";

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Collaborator = mongoose.model('Collaborator', CollaboratorSchema);
  Event = mongoose.model('Event', EventsSchema);
  Timeblock = mongoose.model('Timeblock', TimeBlocksSchema);
}

export const dbContext = new DbContext()
