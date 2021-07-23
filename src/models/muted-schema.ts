import mongoose from 'mongoose'

const reqString = {
  type: String,
  required: true,
}

interface Schema {
  userId: string
  guildId: string
  reason: string
  staffId: string
  staffTag: string
  expires: Date
  current: boolean
}

const muteSchema = new mongoose.Schema<Schema, mongoose.Model<Schema>>({
  userId: reqString,
  guildId: reqString,
  reason: reqString,
  staffId: reqString,
  staffTag: reqString,
  expires: {
    type: Date,
    required: true,
  },
  current: {
    type: Boolean,
    required: true,
  },
},
  {
    timestamps: true,
  })

export default mongoose.model('mutes-testing', muteSchema)