import mongoose from 'mongoose'

const reqString = {
  type: String,
  required: true,
}

interface Schema {
  channelId: string,
  guildId: string
}

const welcomeSchema = new mongoose.Schema<Schema, mongoose.Model<Schema>>({
  // Guild ID
  _id: reqString,
  channelId: reqString,
  guildId: reqString,
})

export default mongoose.model('welcome-canvas-tutorial', welcomeSchema)